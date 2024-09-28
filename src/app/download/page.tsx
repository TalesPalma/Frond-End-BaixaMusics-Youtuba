'use client'
import CardList from "@/components/cardList/CardList";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";




async function getAllMusics(link: string): Promise<string[]> {
  try {
    const response = await fetch(link, {
      method: 'GET',
    })
    const list = await response.json()

    if (!list) {
      return []
    }
    return list
  } catch (error) {
    console.log(error)
    return []
  }
}


export default async function DownloadPage() {
  const searchParams = useSearchParams()
  const link = searchParams.get('link')
  const [musics, setMusics] = useState<string[]>([]);





  if (!validingLink(link) || link == null) {
    return (
      <div className='text-secondary text-center flex  items-center justify-center flex-col '>
        <h1 className="text-xl text-red-500 bg-red-200 rounded p-50 w-4/5 font-bold">Nenhum donwload</h1>
        <Link href={'/'} className="text-sky-400 font-bold text-xl underline">Voltar</Link>
      </div >
    )
  }

  useEffect(() => {
    const fetchMusics = async () => {
      const newMusics = await getAllMusics(link);
      setMusics(newMusics);
    }

    if (validingLink(link) && link != null) {
      fetchMusics(); // Chama a função para buscar músicas
    }

  }, [link])



  return (
    <div className='text-secondary text-center flex flex-col items-center justify-center '>
      <h1>{link}</h1>
      <CardList listMusics={musics} />
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


