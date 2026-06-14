import { NextRequest, NextResponse } from "next/server";

const availableActivities = [
    {
        id: "flashcard",
        description: "Run flashcard learning"
    }
]

const chapterTypes = ["theorotical_study", "visualizing_study", "theorotical_computer_science", "coding"]

export async function POST(req: NextRequest) {
    try {
        const { chapterSubtitles, chapters, currentChapter } = await req.json()

        const prompt = [
            "You are an AI that transforms long YouTube videos into interactive, engaging courses.",
            "",
            "Your task:",
            "Given a specific chapter from a video, you must:",
            "1. Classify the chapter into one of the supported chapter types",
            "2. Generate appropriate learning activities for that chapter",
            "",
            "Supported chapter types:",
            chapterTypes.join(", "),
            "",
            "Supported activities:",
            JSON.stringify(availableActivities, null, 2),
            "",
            "Inputs:",
            "",
            "Chapter subtitles (current chapter transcript):",
            chapterSubtitles.join(" "),
            "",
            "All chapters (full video structure):",
            JSON.stringify(chapters, null, 2),
            "",
            "Current chapter:",
            JSON.stringify(currentChapter, null, 2),
            "",
            "Output format:",
            "Respond with strict JSON only, no markdown, no explanation.",
            "",
            'On success: { "success": true, "chapter_type": "<one of the supported chapter types>", "activities": [] }',
            'On failure: { "success": false, "reason": "<short explanation of what went wrong>" }',
        ].join("\n");

        const reqAi = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HACKCLUB_AI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3-32b",
                messages: [
                    { role: "user", content: prompt },
                ],
            })
        });

        const res = await reqAi.json()
        const jsonRes = JSON.parse(res.choices[0].message.content)

        return NextResponse.json({ success: true, message: jsonRes })
    } catch (error) {
        return NextResponse.json({ success: false, error })
    }
}