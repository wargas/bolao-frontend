import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminPage from './pages/admin'
import AuthPage from './pages/auth'
import DefaultPage from './pages/default'
import GamesPage from './pages/games'
import LoginPage from './pages/login'
import PollPage from './pages/poll'
import PollsPage from './pages/polls'
import PollsListPage from './pages/polls-list'
import RankingPage from './pages/ranking'
import RootPage from './pages/root'

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="auth" element={<AuthPage />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="" element={<AdminPage />}>
            <Route path="" element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<DefaultPage title="Dashboard" />} />
            <Route path="polls" element={<PollsPage />}>
              <Route path="" element={<PollsListPage />} />
              <Route path=":id" element={<PollPage />}>
                <Route path="games" element={<GamesPage />} />
                <Route path="ranking" element={<RankingPage />} />
              </Route>
            </Route>
            <Route path="profile" element={<DefaultPage />} />
          </Route>
        </Route>
        <Route path="*" element={<DefaultPage title="404" />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
