'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

type InputUrlProps = {
  children: React.ReactNode
}



const InputUrl: React.FC<InputUrlProps> = ({ children }: InputUrlProps) => {
  const router = useRouter()
  const [link, setLink] = useState<String>('')


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value.toString())
  }

  const handleDonwload = () => {
    console.log("Download")
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
