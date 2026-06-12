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
    seekTo: (time: number) => void,
    getCurrentTime: () => number,
    /**outputs 1 on normal, 2 when video is paused and 3 when video is seeking*/
    getPlayerState: () => number
  }
}

export default function Home() {
  const [vidUrl, setVidUrl] = useState("https://www.youtube.com/watch?v=rjjES5IsPdg") // during dev
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const playerRef = useRef<PlayerRef>(null)
  const actions = useRef<string[]>([])

  const handleBtnClick = async () => {
    const vidId = ytUrlParse(vidUrl)

    const req = await fetch("/api/get_yt", {
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

    const chaptersTime = chapters.map((chapter) => chapter.start)
    const chaptersName = chapters.map((chapter) => chapter.topic)

    setInterval(() => {
      if (playerRef.current?.api && playerRef.current?.api?.getPlayerState() !== 1) return // if vid is pause or seeking
      const currentTime = playerRef.current?.api?.getCurrentTime() as number
      // const currentChapterTime = chaptersTime.find((chapterTime, idx) => {
      //   if (idx == (chaptersTime.length - 1) && chapterTime < currentTime) return true // as its last chapter and current time is more than it..
      //   else if (chapterTime < currentTime && chaptersTime[idx + 1] > currentTime) return true // if chapterTime < currentTime < nextChapterTime
      // })
      console.log(currentChapterTime)
      // const currentChapterTimeIdx = chaptersTime.indexOf(currentChapterTime)
      // const currentChapterName = chaptersName[currentChapterTimeIdx]
      // const nearestBigNo = chaptersTime.filter((v) => v > currentTime)[0]

      // if (nearestBigNo - currentTime < minSecB4Exec) {
      //   if (actions.current.find((a) => chaptersName.includes(a))) return // not first time so no action required
      //   // console.log("first time")
      //   actions.current.push(currentChapterName)
      //   // takes: current chapter's subtitle, all chaptername and current chaptername
      //   const currentChapterTranscripts = transcripts.filter(({ start }) => {
      //     if (currentChapterTimeIdx == (chaptersTime.length - 1) && start < currentTime) return true // its last
      //     else if (start > currentChapterTime && start < chaptersTime[currentChapterTimeIdx + 1]) {
      //       return true
      //     }
      //   })
      //   const req = fetch("/api/generate_activity", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       chapterSubtitles: currentChapterTranscripts,
      //       chapters: chaptersName,
      //       currentChapter: currentChapterName
      //     })
      //   })
      // }
    }, 1000)
  }, [chapters])

  const changeVidTime = (time: number) => {
    // console.log(playerRef.current?.api.pauseVideo())
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
