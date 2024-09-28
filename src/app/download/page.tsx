'use client'
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


export default function DownloadPage() {
  const searchParams = useSearchParams()
  const link = searchParams.get('link')



  const [initMusics, setInitMusics] = useState<Music[]>([])
  const fetchMusics = async () => {
    const musics: Music[] = await getAllMusics()
    setInitMusics(musics)
  }




  useEffect(() => {
    fetchMusics() // Carregar as musica inicialemnte caso tenha
    const socket = new WebSocket("ws://localhost:8080/ws")
    socket.onmessage = (event) => {
      const updateMusics = JSON.parse(event.data)
      console.log(updateMusics)
      setInitMusics((prev) => [...prev, ...updateMusics])
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
      <CardList listMusics={initMusics} />
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


