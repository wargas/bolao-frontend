import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { Game } from '../interfaces/Game'
import ReactLoading from 'react-loading'
import Api from '../libs/api'
import { DateTime } from 'luxon'
import { toast } from 'react-toastify'

type Props = {
  game: Game
}
export default function GameComponent({ game }: Props) {
  const { values, getFieldProps, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      gols: {
        home: '',
        away: '',
      },
    },
    onSubmit: () => {
      mutation.mutate()
    },
  })

  useEffect(() => {
    if (game.guesses?.length === 1) {
      const [h, a] = game.guesses[0].guess.split('x')

      setFieldValue('gols.home', h)
      setFieldValue('gols.away', a)
    }
  }, [game])

  const mutation = useMutation(async () => {
    try {
      await Api.post(`guesses`, {
        guess: scoreString,
        game_id: game.id,
      })
      toast.success('Aposta salva')
    } catch (error) {
        toast.error('Erro ao salvar a aposta, tente novamente!')
    }
  })

  const scoreString = useMemo(() => `${values.gols.home}x${values.gols.away}`, [
    values,
  ])

  return (
    <form onSubmit={handleSubmit} className="w-full relative text-center p-4">
      <div className="text-sm text-left font-light">
        {DateTime.fromISO(game.time).toFormat('dd/MM hh:mm')}
      </div>
      <div className="flex">
        <div className="flex-1 text-right font-bold">{game.home}</div>
        <div className="w-10 text-center font-bold text-gray-400">x</div>
        <div className="flex-1 text-left font-bold">{game.away}</div>
      </div>
      <div className="flex justify-center">
        <div className="flex-1 text-right">
          <input
            {...getFieldProps('gols.home')}
            type="text"
            className="text-center border w-10 h-10 rounded"
          />
        </div>
        <div className="w-10"></div>
        <div className="flex-1 text-left">
          <input
            {...getFieldProps('gols.away')}
            type="text"
            className="text-center border w-10 h-10 rounded"
          />
        </div>
      </div>

      <div className="absolute right-10 top-10">
        {mutation.isLoading && (
          <ReactLoading width={20} type="spin" color="gray" />
        )}
        {!mutation.isLoading && <button>Salvar</button>}
      </div>
    </form>
  )
}
