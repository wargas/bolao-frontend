import { Outlet, useLocation } from 'react-router-dom'

export default function DefaultPage({title = 'Default Page'}: any) {

    const location = useLocation()

  return (
    <div>
      <h1>{title}</h1>
      <code>{location.pathname}</code>
      <Outlet />
    </div>
  )
}
