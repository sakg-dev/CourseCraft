import React, { Dispatch, SetStateAction } from 'react'
import type { CurrentChapterDataType } from "@/lib/types"
import { MessageCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Bubble = ({ currentChapterData, setCurrentChapterData }: { currentChapterData: CurrentChapterDataType, setCurrentChapterData: Dispatch<SetStateAction<CurrentChapterDataType | undefined>> }) => {
    return (
        <>
            {
                currentChapterData?.bubbleExpanded
                    ?
                    <div>
                        <Dialog open onOpenChange={(e) => setCurrentChapterData({ ...currentChapterData, bubbleExpanded: false })}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
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
