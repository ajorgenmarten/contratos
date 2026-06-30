import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home/home"
import ContractAdd from "./pages/contracts/add"
import NotFound from "./pages/not-found/not-found"
import ContractsList from "./pages/contracts/list"
import UsersAdd from "./pages/users/add"
import UserList from "./pages/users/list"
import Login from "./pages/login/login"
import AuthProvider from "./contexts/auth/auth.provider"
import IsAuth from "./components/logic/is-auth"
import NotAuth from "./components/logic/not-auth"

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <IsAuth>
                <Home />
              </IsAuth>
            }
          />
          <Route
            path="/login"
            element={
              <NotAuth>
                <Login />
              </NotAuth>
            }
          />
          <Route
            path="/contracts"
            element={
              <IsAuth>
                <ContractsList />
              </IsAuth>
            }
          />
          <Route
            path="/contracts/add"
            element={
              <IsAuth>
                <ContractAdd />
              </IsAuth>
            }
          />
          <Route
            path="/users"
            element={
              <IsAuth>
                <UserList />
              </IsAuth>
            }
          />
          <Route
            path="/users/add"
            element={
              <IsAuth>
                <UsersAdd />
              </IsAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
