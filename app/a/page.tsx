import React from 'react'

const SelectedComp = ({ question, answer }: { question: string, answer: string }) => {
    return <>{question}: {answer}</>
}

const Comp = ({ name, ...props }: { name: string }) => {
    return <SelectedComp {...props} />
}

const page = () => {
    const parameters = {
        "question": "Who is the prime minister of india",
        "answer": "Narendra Modi"
    }
    return (
        <div>
            <Comp name="text" {...parameters} />
        </div>
    )
}

export default page
