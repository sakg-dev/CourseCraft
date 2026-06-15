import React, { useMemo } from 'react'
import type { Activity as ActivityType } from '@/lib/types'

const Activity = ({ activity }: { activity: ActivityType }) => {
    const activitiesArr = useMemo(() => {

    }, [])
    return (
        <div>
            {activity.id}
        </div>
    )
}

export default Activity
