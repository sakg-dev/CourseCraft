"use client"

import { useEffect, useRef, useState } from "react";
import { ytUrlParse } from "@/lib/ytTools"
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Chapter {
  start: number,
  topic: string
}

interface Transcript {
  text: string,
  start: number,
  duration: number
}
type PlayerRef = HTMLVideoElement & {
  api: {
    seekTo: (time: number) => void,
    playerInfo: {
      currentTime: number,
      /**outputs 1 on normal, 2 when video is paused and 3 when video is seeking*/
      playerState: number,
      duration: number
    }
  }
}

interface Action {
  name: string,
  type: "generateActivity" | "showActivity"
}

export default function Home() {
  const [vidUrl, setVidUrl] = useState("https://www.youtube.com/watch?v=ltLUadnCyi0") // during dev
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const playerRef = useRef<PlayerRef>(null)
  const actions = useRef<Action[]>([])

  const handleBtnClick = async () => {
    const vidId = ytUrlParse(vidUrl)

    const req = await fetch("/api/getYt", {
      method: "POST",
      body: JSON.stringify({ vidId })
    })
    const { success, chapters, transcripts } = await req.json()
    if (!success) return
    setChapters(chapters)
    setTranscripts(transcripts)
  }

  useEffect(() => {
    if (chapters.length == 0 || transcripts.length == 0) return

    const minSecB4Exec = 10
    const chaptersName = chapters.map((chapter) => chapter.topic)

    setInterval(() => {
      const playerInfo = playerRef.current?.api?.playerInfo
      const playerState = playerInfo?.playerState
      if (playerState !== 1) return // if vid is pause or seeking

      const currentTime = playerInfo?.currentTime as number
      const currentChapter = chapters.find((chapter, idx) => {
        if (idx == (chapters.length - 1) && chapter.start < currentTime) return true // as its last chapter and current time is more than it..
        else if (chapter.start < currentTime && chapters[idx + 1].start > currentTime) return true // if chapterTime < currentTime < nextChapterTime
      })

      if (!currentChapter) return

      const currentChapterIdx = chapters.indexOf(currentChapter)
      const nextChapter = chapters[currentChapterIdx + 1]
      const videoDuration = playerInfo?.duration as number

      if (nextChapter && nextChapter.start - currentTime < minSecB4Exec) {
        // if an element has generateActivity type but not currentChapter, rmv it.
        actions.current = actions.current.filter((a) => !(a.type == "generateActivity" && a.name != currentChapter?.topic))
        
        if (actions.current.find((a) => chaptersName.includes(a.name) && a.type == "generateActivity")) return // not first time so no action required

        actions.current.push({
          name: currentChapter?.topic,
          type: "generateActivity"
        })

        // chapterStart < start < chapterEnd
        const currentChapterTranscripts = transcripts.filter(({ start }) => start > currentChapter.start && start < nextChapter.start)
        const currentChapterTranscriptsStr = currentChapterTranscripts.map((transcript) => transcript.text)

        const req = fetch("/api/generateAcitivity", {
          method: "POST",
          body: JSON.stringify({
            chapterSubtitles: currentChapterTranscriptsStr,
            chapters: chaptersName,
            currentChapter: currentChapter?.topic
          })
        }).then((v) => v.json()).then((v) => console.log(v))
      } else if (currentChapterIdx == (chapters.length - 1) && (videoDuration - currentTime) < minSecB4Exec) {
        console.log("Video ending..")
      }
    }, 1000)
  }, [chapters])

  const changeVidTime = (time: number) => {
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
              controls={true}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
          <div className="h-full overflow-y-auto min-w-[25vw] flex flex-col truncate text-sm rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-br-lg [&::-webkit-scrollbar-thumb]:rounded-tr-lg [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 border">
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
