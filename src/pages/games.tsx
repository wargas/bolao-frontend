import { useQuery } from '@tanstack/react-query'
import { useOutletContext } from 'react-router-dom'
import GameComponent from '../components/game'
import { Game } from '../interfaces/Game'
import { Poll } from '../interfaces/Poll'
import Api from '../libs/api'

export default function GamesPage() {
  const { poll } = useOutletContext<{ poll: Poll }>()

  const { data } = useQuery([`games`, poll?.id], async () => {
    const { data } = await Api.get<Game[]>(`polls/${poll?.id}/games`)

    return data
  }, {enabled: !!poll?.id})

  return (
    <div className="flex flex-col bg-white rounded shadow justify-center items-center divide-y">
      {data?.map((game) => (
        <GameComponent key={game.id} game={game} />
      ))}
    </div>
  )
}
