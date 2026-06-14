import { NextRequest, NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
    apiKey: process.env.HACKCLUB_AI_API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});

const availableActivities = [
    {
        id: "flashcard",
        description: "Run flashcard learning"
    }
]

const chapterTypes = ["theorotical_study", "visualizing_study", "theorotical_computer_science", "coding"]

export async function POST(req: NextRequest) {
    // const { chapterSubtitles, chapters, currentChapter } = await req.json()
    const { chapterSubtitles, chapters, currentChapter } = await req.json()

    const prompt = [
        "YOU ARE AN ASSISTANT, THAT MAKES LONG YOUTUBE VIDEO INTO INTERACTIVE AND ENGAGING COURSE.",
        "Your Job is to:",
        `- Find type of current chapter type based on its subtitles. Chapter types can be one of these: [${chapterTypes}]`,
        "- Generate activities based on activities we support, current chapter type and every chapters there is in the video",
        "",
        "Inputs you will be given: chapterSubtitles, chapters, currentChapter, availableActivities",
        "If you think current chapter type is none on our list, or any other confusion, send: {\"success\":false,\"reason\":string}",
        "Or else if everything is good, write in this format: {\"success\":true, \"video_type\":string, \"activites\":array}",
        "Answer in strict plain JSON, no formatting or markdown",
        "",
        "Inputs:",
        `chapterSubtitles: ${chapterSubtitles}`,
        `chapters: ${chapters}`,
        `currentChapter: ${currentChapter}`,
        `availableActivities: ${availableActivities}`,
    ].join("\n")

    console.log(prompt)

    // const response = await client.chat.send({
    //     model: "qwen/qwen3-32b",
    //     messages: [
    //         { role: "user", content: prompt },
    //     ],
    //     stream: false,
    // });
    // console.log(response.choices[0].message.content);

    return NextResponse.json({ success: true })
}