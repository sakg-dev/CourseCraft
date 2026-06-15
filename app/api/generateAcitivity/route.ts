import { NextRequest, NextResponse } from "next/server";
import type { Activity } from "@/lib/types"

const availableActivities: Activity[] = [
    {
        id: "flashcard",
        description: "Run flashcard learning",
        parameters: [{ id: "question", description: "Short question" }, { id: "answer", description: "Short answer(Max 8 words)" }]
    },
    {
        id: "codingBlock",
        description: "Coding block with tests",
        parameters: [{ id: "coding_challenge", description: "Coding question/challenges with some examples. Supports Markdown" }, { id: "test_code", description: "Tests that calls functions in user's code and matches result." }, { id: "code", description: "Pre written code that defines structure like function name, its call etc" }]
    }
]

const chapterTypes = {
    theorotical_study: "Concepts, definations, theory",
    visualizing_study: "Concepts best understood visually(diagrams, animations, mental models)",
    theorotical_computer_science: "Algorithms, DSA, etc",
    coding: "Hands on programming: implement a feature, solve a coding challenge"
}

export async function POST(req: NextRequest) {
    try {
        const { chapterSubtitles, chapters, currentChapter } = await req.json()

        const systemPrompt = [
            "You convert YouTube chapter transcripts into interactive learning activities.",
            "Tasks: classify the chapter into one type, then generate varied activities from the transcript only.",
            "If the chapter has no learnable content (intro, outro, sponsor, filler), return failure with reason 'no question needed'.",
            "",
            "Chapter types:",
            Object.entries(chapterTypes).map(([k, v]) => `${k}: ${v}`).join("\n"),
            "",
            "Available activities:",
            JSON.stringify(availableActivities),
            "",
            "Output strict JSON only, no markdown or explanation",
            'Success: { "success": true, "chapterType": "<type>", "activities": [{ "id": "<activity_id>", "parameters": { "<param_id>": "<value>" } }] }',
            'Failure: { "success": false, "reason": "<explanation>" }',
        ].join("\n")

        const userPrompt = [
            "Chapters:", JSON.stringify(chapters),
            "Current chapter:", JSON.stringify(currentChapter),
            "Transcript:", chapterSubtitles.join(" "),
        ].join("\n")

        const reqAi = await fetch("https://ai.hackclub.com/proxy/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HACKCLUB_AI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3-32b",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
            })
        });

        const res = await reqAi.json()
        const jsonRes = JSON.parse(res.choices[0].message.content)

        return NextResponse.json({ success: true, message: jsonRes })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" })
    }
}
