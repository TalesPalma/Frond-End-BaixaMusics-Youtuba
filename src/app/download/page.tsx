'use client'
import CardList from "@/components/cardList/CardList";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DownloadPage() {

  const searchParams = useSearchParams()
  const link = searchParams.get('link')



  if (!validingLink(link)) {
    return (
      <div className='text-secondary text-center flex  items-center justify-center flex-col '>
        <h1 className="text-xl text-red-500 bg-red-200 rounded p-50 w-4/5 font-bold">Nenhum donwload</h1>
        <Link href={'/'} className="text-sky-400 font-bold text-xl underline">Voltar</Link>
      </div >
    )
  }

  return (
    <div className='text-secondary text-center flex flex-col items-center justify-center '>
      <h1>{link}</h1>
      <CardList />
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


