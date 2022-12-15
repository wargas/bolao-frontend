import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSore } from '../stores/app-store'
import { PresentationChart, Rows, UserCircle } from 'phosphor-react'
import { CaretUp, SignOut, Password, IdentificationCard } from 'phosphor-react'
import { Menu } from '@headlessui/react'

export default function Sidebar() {
  const user = useAppSore((s) => s.user)
  const navigate = useNavigate()


  return (
    <div className="absolute flex flex-col h-screen left-0 top-0 bottom-0 border-r bg-primary-600 w-sidebar">
      <div className="flex items-center h-14 bg-primary-700 justify-center">
        <NavLink
          className="uppercase text-white font-logo text-3xl font-bold"
          to="/dashboarde"
        >
          Bolão
        </NavLink>
      </div>
      <div className="flex-1">
        <ul className="flex flex-col p-2">
          <MenuItem
            title="Dashboard"
            url="/dashboard"
            icon={PresentationChart}
          />
          <MenuItem title="Bolões" url="/polls" icon={Rows} />
          <MenuItem title="Perfil" url="/profile" icon={UserCircle} />
        </ul>
      </div>

      <Menu>
        <Menu.Button as={'div'}>
          <div className="text-white cursor-pointer text-sm bg-primary-700 flex px-4 py-2 items-center">
            <div className="flex-col flex flex-1">
              <span className="text-base font-bold">{user.name}</span>
              <span className="font-light">{user.email}</span>
            </div>
            <div>
              <CaretUp />
            </div>
          </div>
        </Menu.Button>
        <Menu.Items className='absolute text-sm bg-white overflow-hidden rounded divide-y mx-2 flex flex-col shadow-lg bottom-16 right-0 left-0'>
          <Menu.Item>
            <button onClick={() => navigate('/auth/login')} className='text-left flex items-center gap-4 text-gray-700 hover:bg-gray-50 px-4 py-2'>
              <SignOut /> <span>Sair</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className='text-left flex items-center gap-4 text-gray-700 hover:bg-gray-50 px-4 py-2'>
                <Password /><span>Alterar Senha</span>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button className='text-left flex items-center gap-4 text-gray-700 hover:bg-gray-50 px-4 py-2'>
              <IdentificationCard /><span>Alterar Dados</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}

function MenuItem({ title, icon: Icon, url }: any) {
  return (
    <li className="flex  transition-all  items-center text-white hover:text-gray-100  ">
      <NavLink
        className="flex-1 menu-item text-sm h-12 rounded flex hover:bg-primary-700 items-center gap-4 font-bold uppercase px-4 "
        to={url}
      >
        <Icon size={22} /> <span> {title}</span>
      </NavLink>
    </li>
  )
}
