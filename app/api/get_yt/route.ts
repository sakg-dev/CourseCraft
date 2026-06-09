import { NextRequest, NextResponse } from "next/server"
import { getJson } from "serpapi"
import { cnvrtStrToSecond } from "@/lib/ytTools"

export async function POST(req: NextRequest) {
    const { vidId }: { vidId: string } = await req.json()

    // during dev
    // const subReq = await fetch(`https://transcriptapi.com/api/v2/youtube/transcript?video_url=${vidId}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${process.env.TRANSCRIPT_API_KEY}`
    //     }
    // })
    // const { transcript: transcripts } = await subReq.json()

    // const { description } = await getJson({
    //     engine: "youtube_video",
    //     v: vidId,
    //     api_key: process.env.SERPAPI_API_KEY
    // })
    // let chapters = description.content.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])).*/g)
    // if (!chapters) return NextResponse.json({ success: false, error: "Chapters not found" })
    // chapters = chapters.map((v: string) => {
    //     const start = v.match(/.*?((?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9]))/)?.[0]
    //     if (start) {
    //         const startsInSeconds = cnvrtStrToSecond(start)
    //         return {
    //             start: startsInSeconds,
    //             topic: v.split(start)[1].trim()
    //         }
    //     } else {
    //         return v
    //     }
    // })

    return NextResponse.json({
        success: true,
        chapters: [
            {
                "start": 0,
                "topic": "Introduction to Containerization & Docker"
            },
            {
                "start": 101,
                "topic": "Who is this course for?"
            },
            {
                "start": 125,
                "topic": "Course Curriculum Overview"
            },
            {
                "start": 215,
                "topic": "Instructor Introduction & Experience"
            },
            {
                "start": 302,
                "topic": "Support & VIP Course Package"
            },
            {
                "start": 421,
                "topic": "Detailed Topic Breakdown"
            },
            {
                "start": 621,
                "topic": "Why Learn Docker? (Market Demand)"
            },
            {
                "start": 731,
                "topic": "Top 4 Benefits: Reproducibility, Dependencies, Portability, Version Control"
            },
            {
                "start": 930,
                "topic": "From Physical Servers to Virtualization"
            },
            {
                "start": 976,
                "topic": "Computing Device Components"
            },
            {
                "start": 1158,
                "topic": "What is a Server?"
            },
            {
                "start": 1437,
                "topic": "The Move from Virtual Machines to Containers"
            },
            {
                "start": 2044,
                "topic": "What is a Software Process?"
            },
            {
                "start": 2274,
                "topic": "Container Features vs. Virtual Machines"
            },
            {
                "start": 2527,
                "topic": "Docker Architecture Explained"
            },
            {
                "start": 3187,
                "topic": "Setting Up Docker on AWS (Free Tier)"
            },
            {
                "start": 3852,
                "topic": "Alternatives: Docker Desktop & VirtualBox"
            },
            {
                "start": 4636,
                "topic": "Connecting to EC2 Instance (Session Manager & SSH)"
            },
            {
                "start": 5463,
                "topic": "Installing Docker on Ubuntu"
            },
            {
                "start": 6144,
                "topic": "Basic Docker Commands (Pull, Run, Stop, Inspect)"
            },
            {
                "start": 7718,
                "topic": "Docker Networking Overview"
            },
            {
                "start": 8280,
                "topic": "Docker Networking Modes/Drivers"
            },
            {
                "start": 9040,
                "topic": "Docker Networking Labs (Bridge Mode)"
            },
            {
                "start": 9480,
                "topic": "Data Persistence: Volumes & Bind Mounts"
            },
            {
                "start": 11047,
                "topic": "Docker Compose Introduction"
            },
            {
                "start": 11868,
                "topic": "Docker Compose Workflow"
            },
            {
                "start": 12160,
                "topic": "VS Code Setup & Docker Extension"
            },
            {
                "start": 13200,
                "topic": "Creating Custom Docker Files"
            },
            {
                "start": 14100,
                "topic": "Understanding Image Layers"
            },
            {
                "start": 14680,
                "topic": "CMD vs. RUN Instructions"
            },
            {
                "start": 15040,
                "topic": "Expose and Copy Instructions"
            },
            {
                "start": 16616,
                "topic": "Docker Compose Configuration Lab"
            },
            {
                "start": 17640,
                "topic": "Docker Image Lifecycle & Registry (Push/Pull/Tag)"
            },
            {
                "start": 18720,
                "topic": "Docker Project: Containerizing a Website"
            },
            {
                "start": 19076,
                "topic": "Project Build & Deployment on AWS"
            },
            {
                "start": 19620,
                "topic": "Docker Project: Containerizing a Website"
            },
            {
                "start": 20408,
                "topic": "Git Cloning & Preparing the Project"
            },
            {
                "start": 20640,
                "topic": "Writing the Dockerfile for the Web Application"
            },
            {
                "start": 21240,
                "topic": "Building and Testing the Web Image"
            },
            {
                "start": 21900,
                "topic": "Tagging and Pushing Images to Docker Hub"
            },
            {
                "start": 22800,
                "topic": "Verifying Image Deployment & Final Course Wrap-up"
            }
        ],
        transcripts: [
            {
                "text": "Ever wondered how tech giants like",
                "start": 0.08,
                "duration": 4
            },
            {
                "text": "Spotify and Netflix scale their software",
                "start": 1.76,
                "duration": 5.92
            },
            {
                "text": "so fast? The secret is containerization",
                "start": 4.08,
                "duration": 6.32
            },
            {
                "text": "with Docker as the essential tool at its",
                "start": 7.68,
                "duration": 5.52
            },
            {
                "text": "core. This structured hands-on Docker",
                "start": 10.4,
                "duration": 4.88
            },
            {
                "text": "course will take you from absolute",
                "start": 13.2,
                "duration": 4.88
            },
            {
                "text": "beginner to job ready, providing the",
                "start": 15.28,
                "duration": 5.68
            },
            {
                "text": "practical skills needed to build, test,",
                "start": 18.08,
                "duration": 5.92
            },
            {
                "text": "and deploy containerized applications",
                "start": 20.96,
                "duration": 6
            },
            {
                "text": "reliably. Isa from Dolphin Ed created",
                "start": 24,
                "duration": 6.279
            },
            {
                "text": "this course.",
                "start": 26.96,
                "duration": 3.319
            },
            {
                "text": "Have you ever wondered how tech giants",
                "start": 30.4,
                "duration": 5.04
            },
            {
                "text": "like Spotify, Amazon and Netflix, they",
                "start": 32.88,
                "duration": 5.12
            },
            {
                "text": "ship software faster and they scale",
                "start": 35.44,
                "duration": 4.32
            },
            {
                "text": "instantly?",
                "start": 38,
                "duration": 4.16
            },
            {
                "text": "The secret is containerization and",
                "start": 39.76,
                "duration": 4.88
            },
            {
                "text": "Docker at the heart of it. In today's IT",
                "start": 42.16,
                "duration": 4.879
            },
            {
                "text": "world, Docker is everywhere from",
                "start": 44.64,
                "duration": 5.36
            },
            {
                "text": "startups to tech giants and Inc. 500",
                "start": 47.039,
                "duration": 5.68
            },
            {
                "text": "companies and it is the core tool or the",
                "start": 50,
                "duration": 5.6
            },
            {
                "text": "containerization is the core tool behind",
                "start": 52.719,
                "duration": 6.32
            },
            {
                "text": "cloud devops software development modern",
                "start": 55.6,
                "duration": 5.279
            },
            {
                "text": "security roles and modern application",
                "start": 59.039,
                "duration": 4
            },
            {
                "text": "architectures. Docker has become the",
                "start": 60.879,
                "duration": 4.881
            },
            {
                "text": "gold standard when it comes to shipping",
                "start": 63.039,
                "duration": 5.12
            }
        ]
    })
}