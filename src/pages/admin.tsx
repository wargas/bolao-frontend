import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useReadLocalStorage, useLocalStorage } from 'usehooks-ts'
import Sidebar from '../components/sidebar'
import Api from '../libs/api'
import { useAppSore } from '../stores/app-store'

export default function AdminPage() {
  const token = useReadLocalStorage<string>('auth_token')
  const [loading, setLoading] = React.useState(true)
  const [, setToken] = useLocalStorage('auth_token', '')
  const navigate = useNavigate()

  const setUser = useAppSore((s) => s.setUser)

  React.useEffect(() => {
    setLoading(true)
    if (!token) {
      navigate('/auth/login')
    } else {
      Api.interceptors.request.use(
        (config) => {
          config.headers = {
            Authorization: `Bearer ${token}`,
          }

          return config
        },
        (error) => {
          return Error(error)
        },
      )

      Api.get('/me')
        .then(({ data }) => {
          if ('id' in data) {
            setUser(data)
          } else {
            navigate('/login')
          }
        })
        .finally(() => setLoading(false))
    }
  }, [token])

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      <Sidebar />

      <div className='absolute bg-gray-50 overflow-y-scroll left-sidebar top-0 bottom-0 right-0'>
        <div className='w-full md:max-w-screen-md lg:max-w-screen-xl mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
