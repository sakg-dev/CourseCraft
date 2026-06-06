import { NextRequest, NextResponse } from "next/server"
import { getJson } from "serpapi"
import { cnvrtStrToSecond } from "@/lib/ytTools"

export async function POST(req: NextRequest) {
    const { vidId }: { vidId: string } = await req.json()

    const { description } = await getJson({
        engine: "youtube_video",
        v: vidId,
        api_key: process.env.SERPAPI_API_KEY
    })

    let chapters = description.content.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])).*/g)
    chapters = chapters.map((v: string) => {
        const start = v.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9]))/)?.[0]
        if (start) {
            const startsInSeconds = cnvrtStrToSecond(start)
            return {
                start: startsInSeconds,
                topic: v.split(start)[1].trim()
            }
        } else {
            return v
        }
    })

    return NextResponse.json({
        success: true,
        chapters
    })
}