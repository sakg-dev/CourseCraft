export interface Activity {
    id: string,
    /**Not included in ai response*/
    description?: string,
    parameters: {
        id: string,
        description: string
    }[]
}

export interface Chapter {
    start: number,
    topic: string
}

export interface Transcript {
    text: string,
    start: number,
    duration: number
}

export type PlayerRef = HTMLVideoElement & {
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

export interface Action {
    name: string,
    type: "generateActivity" | "showActivity"
}

export interface CurrentChapterDataType {
    activities?: Activity[],
    chapterType?: string,
    reason?: string,
    bubbleExpanded?: boolean,
    success: boolean
}