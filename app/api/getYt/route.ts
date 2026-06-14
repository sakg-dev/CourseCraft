import { NextRequest, NextResponse } from "next/server"
import { getJson } from "serpapi"
import { cnvrtStrToSecond } from "@/lib/ytTools"

export async function POST(req: NextRequest) {
    const { vidId }: { vidId: string } = await req.json()

    const subReq = await fetch(`https://transcriptapi.com/api/v2/youtube/transcript?video_url=${vidId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.TRANSCRIPT_API_KEY}`
        }
    })
    const { transcript: transcripts } = await subReq.json()

    const { description } = await getJson({
        engine: "youtube_video",
        v: vidId,
        api_key: process.env.SERPAPI_API_KEY
    })
    let chapters = description.content.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])).*/g)
    if (!chapters) return NextResponse.json({ success: false, error: "Chapters not found" })
    chapters = chapters.map((v: string) => {
        const start = v.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9]))/)?.[0]
        if (start) {
            const startsInSeconds = cnvrtStrToSecond(start)
            if (!startsInSeconds && startsInSeconds !== 0) return null

            let topic = v.split(start)[1].trim()
            if (topic.startsWith("-")) topic = topic.substring(1).trim()
            return {
                start: startsInSeconds,
                topic: topic
            }
        } else return null
    }).filter((v: { start: number, topic: string } | null) => v != null)

    return NextResponse.json({
        success: true,
        chapters: chapters,
        transcripts: transcripts
    })
}