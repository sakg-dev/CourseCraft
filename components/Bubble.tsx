import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import type { Activity as ActivityType, CurrentChapterDataType } from "@/lib/types"
import { MessageCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Activity from './Activity'
import { Button } from './ui/button'

const Bubble = ({ currentChapterData, setCurrentChapterData }: { currentChapterData: CurrentChapterDataType, setCurrentChapterData: Dispatch<SetStateAction<CurrentChapterDataType | undefined>> }) => {
    const [currentActivityIdx, setCurrentActivityIdx] = useState(0)
    useEffect(() => {
        console.log(currentActivityIdx)
    }, [currentActivityIdx])

    return (
        <>
            {
                currentChapterData?.bubbleExpanded
                    ?
                    <div>
                        <Dialog open onOpenChange={() => setCurrentChapterData({ ...currentChapterData, bubbleExpanded: false })}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription asChild>
                                        <div className='min-h-[50vh] w-[60vw]'>
                                            <p>Perform following activities:</p>
                                            <Activity activity={currentChapterData?.activities?.[currentActivityIdx] as ActivityType} />
                                            <div className='flex'>
                                                <Button onClick={() => {
                                                    if (currentActivityIdx !== 0) { // if its not 1st
                                                        setCurrentActivityIdx(currentActivityIdx - 1)
                                                    }
                                                }}>Prev</Button>
                                                <Button onClick={() => {
                                                    if (currentChapterData?.activities && (currentChapterData.activities?.length - 1) > currentActivityIdx) { // if its not last
                                                        setCurrentActivityIdx(currentActivityIdx + 1)
                                                    }
                                                }}>Next</Button>
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                    :
                    <div onClick={() => setCurrentChapterData({ ...currentChapterData, bubbleExpanded: true })} className='cursor-pointer absolute bottom-10 right-10 border p-4 rounded-full transition-all hover:scale-110 duration-300'>
                        <MessageCircle size={28} />
                    </div>
            }
        </>
    )
}

export default Bubble
