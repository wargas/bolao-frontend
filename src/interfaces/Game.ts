import { Guess } from "./Guess"

export type Game = {
    id: number
    home: string
    away: string
    time: string
    score: any
    poll_id: number
    created_at: string
    updated_at: string
    guesses: Guess[]
  }
  