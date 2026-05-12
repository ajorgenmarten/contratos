import { BrowserRouter, Route, Routes } from 'react-router'
import ListUsers from './pages/list-users/list-users'
import Login from './pages/login/login'
import Home from './pages/home/home'
import AddUser from './pages/add-user/add-user'
import AddContract from './pages/add-contract/add-contract'

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/users/add' element={<AddUser />} />
      <Route path='/users' element={<ListUsers />} />
      <Route path='/contracts/add' element={<AddContract />} />
    </Routes>
  </BrowserRouter>
}

export default App
