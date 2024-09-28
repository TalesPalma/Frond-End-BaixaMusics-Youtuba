'use client'
import CardList from "@/components/cardList/CardList";
import { Music } from "@/models/music";
import { useSearchParams } from "next/navigation";




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


export default async function DownloadPage() {
  const searchParams = useSearchParams()
  const musics: Music[] = await getAllMusics()
  const link = searchParams.get('link')

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


