import type { Activity as ActivityType } from '@/lib/types'
import Flashcard from './Activities/Flashcard'
import CodingBlock from './Activities/CodingBlock'

const activities = {
    flashcard: Flashcard,
    codingBlock: CodingBlock
}
const Comp = ({ activityId, ...props }: { activityId: string }) => {
    const activityIdWithType = activityId as keyof typeof activities
    const MyComp = activities[activityIdWithType]
    return <MyComp {...props} />
}

const Activity = ({ activity }: { activity: ActivityType }) => {
    return (
        <div className='bg-red-400 w-full h-full'>
            <Comp activityId={activity.id} {...activity.parameters} />
        </div>
    )
}

export default Activity
