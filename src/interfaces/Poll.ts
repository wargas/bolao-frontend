export type Poll = {
    id: number
    name: string
    status: string
    created_at: string
    updated_at: string
    meta: {
      games_count: number
      participants_count: number
    }
  }
  