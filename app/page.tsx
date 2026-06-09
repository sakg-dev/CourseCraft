"use client"

import { useRef, useState } from "react";
import { ytUrlParse } from "@/lib/ytTools"
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Chapter {
  start: number,
  topic: string
}
type PlayerRef = HTMLVideoElement & {
  _playedRanges: Array<{
    start: number,
    end: number
  }>,
  _currentPlayedRange: Array<{
    start: number,
    end: number
  }>
  _seeking: boolean,
  isLoaded: boolean,
  api: {
    seekTo: (time: number) => void
  }
}

export default function Home() {
  const [vidUrl, setVidUrl] = useState("https://www.youtube.com/watch?v=rjjES5IsPdg") // during dev
  const [chapters, setChapters] = useState<Chapter[]>([])
  const playerRef = useRef<PlayerRef>(null)

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
    // console.log(playerRef.current?.api)
    playerRef.current?.api.seekTo(time)
  }

  return (
    <div className="min-h-screen min-w-screen flex justify-center p-4">
      {chapters.length > 0 ?
        <div className="flex gap-4 h-[80vh] w-full">
          <div className="w-[70%] h-full bg-black">
            <ReactPlayer
              ref={playerRef}
              src={vidUrl}
              controls={false}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
          <div className="h-full overflow-y-auto flex flex-col truncate text-sm rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-br-lg [&::-webkit-scrollbar-thumb]:rounded-tr-lg [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 border">
            {chapters.map((v, i) => {
              return <div className="px-2 py-4 border-b-2 cursor-pointer transition-colors hover:bg-gray-200 duration-500" key={i} onClick={() => changeVidTime(v.start)} >{v.topic}</div>
            })}
          </div>
        </div>
        :
        <div className="flex flex-col min-w-[50vw] gap-4 my-auto">
          <Input className="h-12" placeholder="Enter YT URL" value={vidUrl} onChange={(e) => setVidUrl(e.target.value)} />
          <Button size={"lg"} onClick={handleBtnClick}>Submit</Button>
        </div>
      }
    </div>
  );
}
