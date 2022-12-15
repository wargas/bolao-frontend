import { useQuery } from '@tanstack/react-query'
import { useOutletContext } from 'react-router-dom'
import { Poll } from '../interfaces/Poll'
import { Ranking } from '../interfaces/Rankink'
import Api from '../libs/api'

export default function RankingPage() {
  const { poll } = useOutletContext<{ poll: Poll }>()
  const { data } = useQuery(
    [`ranking`, poll?.id],
    async ({ queryKey }) => {
      const [, pollId] = queryKey

      const { data } = await Api.get<Ranking[]>(`/polls/${pollId}/ranking`)

      return data
    },
    { enabled: !!poll },
  )

  return (
    <div>
      <table className='w-full mt-4 drop-shadow divide-y'>
        <thead>
            <tr className='h-12'>
                <th className='bg-white rounded-tl-lg'></th>
                <th className='bg-white'></th>
                <th className='bg-white px-4 text-right'>CR</th>
                <th className='bg-white px-4 text-right rounded-tr-lg'>PTs</th>
            </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr className='h-12 group'>
              <th className='bg-white group-even:bg-gray-50 text-lg group-last:rounded-bl-lg'>{item.position}º</th>
              <td className='bg-white group-even:bg-gray-50'>{item.participante.name}</td>
              <td className='px-4 bg-white group-even:bg-gray-50 text-right'>{item.corrects || 0}</td>
              <td className='px-4 bg-white group-even:bg-gray-50 text-right group-last:rounded-br-lg'>{item.points || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
