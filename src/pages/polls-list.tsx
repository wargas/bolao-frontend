import { useQuery } from '@tanstack/react-query'
import { Poll } from '../interfaces/Poll'
import Api from '../libs/api'


import { useNavigate } from 'react-router-dom'
import PollItem from '../components/poll-item'

export default function PollsListPage() {
  const navigate = useNavigate()

  const { data } = useQuery(['polls'], async () => {
    const { data } = await Api.get<Poll[]>(`polls`)

    return data
  })

  return (
    <div>
      <h1 className="text-2xl mb-4">Meus Bolões</h1>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((poll) => (
          <div
            onClick={() => navigate(`/polls/${poll.id}/ranking`)}
            key={poll.id}
          >
            <PollItem poll={poll} />
          </div>
        ))}
      </div>
    </div>
  )
}
