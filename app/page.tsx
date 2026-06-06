"use client"

import { useState } from "react";
import { ytUrlParse } from "@/lib/ytTools"
import ReactPlayer from 'react-player'

interface Chapter {
  start: number,
  topic: string
}

export default function Home() {
  const [vidUrl, setVidUrl] = useState("")
  const [chapters, setChapters] = useState<Chapter[]>([])

  const handleBtnClick = async () => {
    const vidId = ytUrlParse(vidUrl)

    const req = await fetch("/api/get_yt", {
      method: "POST",
      body: JSON.stringify({ vidId })
    })
    const res = await req.json()
    if (!res.success) return
    console.log(res)
    setChapters(res.chapters)
  }

  const changeVidTime = (time: number) => {
    const vidId = ytUrlParse(vidUrl)
    setVidUrl(`https://www.youtube.com/watch?v=${vidId}&t=${time}`)
  }

  return (
    <div className="flex flex-col h-screen gap-4 justify-center text-lg items-center">
      {chapters.length > 0 ?
        <>
          <ReactPlayer
            src={vidUrl}
            controls={false}
            width="50%"
            height="50%"
            playing={true}
          />
          <div className="h-[20vh] overflow-y-auto flex flex-col gap-4">
            {chapters.map((v, i) => {
              return <button key={i} onClick={() => changeVidTime(v.start)} >{v.topic}</button>
            })}
          </div>
        </>
        :
        <>
          <input className="border border-gray-400 h-16 w-[20vw] p-4 rounded-xl" placeholder="Enter YT URL" value={vidUrl} onChange={(e) => setVidUrl(e.target.value)} />
          <button className="h-16 cursor-pointer w-32 rounded-4xl bg-red-500" onClick={handleBtnClick}>Submit</button>
        </>
      }
    </div>
  );
}
