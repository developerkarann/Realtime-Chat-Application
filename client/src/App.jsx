import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectRoute from "./components/auth/ProtectRoute"
import { LayoutLoader } from "./components/layouts/Loaders"
// import Home from "./pages/home/Home"
const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/authentication/Login'))
const Chat = lazy(() => import('./pages/chat/Chat'))
const Groups = lazy(() => import('./pages/groups/Groups'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))

const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'))
const UserManagement = lazy(() => import('./pages/Admin/UserManagement'))
const ChatManagement = lazy(() => import('./pages/Admin/ChatManagement'))
const Mesasges = lazy(() => import('./pages/Admin/Mesasges'))

function App() {

  let user = true;
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader/>}>
          <Routes>
            <Route element={<ProtectRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Groups />} />
            </Route>
            <Route path="/login" element={<ProtectRoute user={!user} redirect="/" > <Login /> </ProtectRoute>} />
            <Route path='/admin' element={<AdminLogin/>} />
            <Route path='/admin/dashboard' element={<Dashboard/>} />
            <Route path='/admin/users' element={<UserManagement/>} />
            <Route path='/admin/chats' element={<ChatManagement/>} />
            <Route path='/admin/messages' element={<Mesasges/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
