'use client'
import "./style.css"
import CardList from "@/components/cardList/CardList";
import { Music } from "@/models/music";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";





async function getAllMusics(): Promise<Music[]> {
  const link = "http://localhost:8080/musics"
  try {
    const response = await fetch(link, {
      method: 'GET',
      cache: 'no-store',
    })
    const list: Music[] = await response.json()
    if (!list) {
      return []
    }
    return list
  } catch (error) {
    console.log(error)
    return []
  }
}

async function downloadAllMusics(listMusics: Music[]) {
  const link = "http://localhost:8080/download/"

  for (const item of listMusics) {
    await fetch(link + encodeURIComponent(item.title))
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url;
        a.download = item.title;
        document.body.appendChild(a)
        a.click()
        a.remove()
      }).catch(error => console.error(error));
  }
}

function clearList() {
  const socket = new WebSocket("ws://localhost:8080/ws")
  socket.onopen = () => {
    socket.send("clear")

  }

  socket.onclose = (event) => {
    console.log(event)
  }

  socket.onerror = (event) => {
    console.log(event)
  }


}


export default function DownloadPage() {
  const searchParams = useSearchParams()
  const link = searchParams.get('link')



  const [musics, setMusics] = useState<Music[]>([])
  const fetchMusics = async () => {
    const musics: Music[] = await getAllMusics()
    setMusics(musics)
  }




  useEffect(() => {
    fetchMusics() // Carregar as musica inicialemnte caso tenha
    const socket = new WebSocket("ws://localhost:8080/ws")
    socket.onmessage = (event) => {
      const updateMusics = JSON.parse(event.data)
      console.log(updateMusics)
      setMusics((prev) => [...prev, ...updateMusics])
    }

    socket.onerror = (event) => {
      console.log(event)
    }


    socket.onclose = (event) => {
      console.log(event)
    }

    return () => socket.close()
  }, [])


  return (
    <div className='text-secondary text-center flex flex-col items-center justify-center '>
      <h1>{link}</h1>
      <CardList listMusics={musics} />
      <div className="btn-groups">
        <button onClick={() => downloadAllMusics(musics)}>Baixar Todas</button>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div >
  )
}

function validingLink(link: string | null | undefined): boolean {
  const regexUrl = /^((https?:\/\/)?(www\.)?youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  if (link == null || link == "undefined" || regexUrl.test(link) == false) {
    return false
  }
  return true
}


