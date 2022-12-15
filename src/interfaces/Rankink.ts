export type Ranking = {
    user_id: number
    poll_id: number
    points?: string
    corrects?: string
    position: number
    participante: {
      id: number
      name: string
      email: string
    }
  }
  