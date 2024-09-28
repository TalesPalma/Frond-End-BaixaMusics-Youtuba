'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

type InputUrlProps = {
  children: React.ReactNode
}

async function postLink(link: string) {
  const url = "http://localhost:8080/download"
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ playlist_url: link })
    }
    )
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }

}


const InputUrl: React.FC<InputUrlProps> = ({ children }: InputUrlProps) => {
  const router = useRouter()
  const [link, setLink] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value.toString())
  }

  const handleDonwload = async () => {
    console.log("Download")
    console.log(link)
    await postLink(link)
    router.replace("/download?link=" + link)
  }

  return (
    <div className="m-4">

      <input
        type="url"
        placeholder={children?.toString()}
        className="p-3.5 rounded w-full text-black mt-20 shadow-lg shadow-black"
        onChange={onChange} />

      <button
        className="p-3.5 bg-secondary rounded w-6/12 mt-5 shadow-lg shadow-black"
        onClick={handleDonwload}
      > Baixar</button>

    </div >
  )
}


export default InputUrl
