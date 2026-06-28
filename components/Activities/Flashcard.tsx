import React from 'react'

const Flashcard = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className='min-h-full w-full bg-gray-700'>
      <p className='text-xl font-semibold'>{question}</p>
      <p>{answer}</p>
    </div>
  )
}

export default Flashcard
