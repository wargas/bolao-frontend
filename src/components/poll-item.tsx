import { DotsThreeVertical, SoccerBall, Users  } from 'phosphor-react'
import { Poll } from '../interfaces/Poll'

type Props = {
  poll: Poll
}

export default function PollItem({ poll }: Props) {
  return (
    <div
      className="relative bg-white hover:shadow-sm shadow rounded text-gray-700 cursor-pointer"
      key={poll.id}
    >
      
      <div className="p-4">
        <div>{poll.name}</div>
      </div>

      <div className="flex p-4 gap-4 border-t items-center text-xs">
        <span className="font-light gap-2 flex items-center"><SoccerBall /> {poll.meta.games_count}</span>
        <span className="font-light gap-2 flex items-center"><Users />{poll.meta.participants_count}</span>

        <button className="w-8 h-8 ml-auto rounded-full hover:bg-primary-50 flex items-center justify-center">
        <DotsThreeVertical />
      </button>
      </div>
    </div>
  )
}
