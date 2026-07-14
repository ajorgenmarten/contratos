import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import AuthProvider from "./contexts/auth/auth.provider"

import { lazy, Suspense } from "react"
import Fallback from "./components/custom/fallback"

const IsAuth = lazy(() => import("./components/logic/is-auth"))
const NotAuth = lazy(() => import("./components/logic/not-auth"))
const Home = lazy(() => import("./pages/home/home"))
const Login = lazy(() => import("./pages/login/login"))
const ContractAdd = lazy(() => import("./pages/contracts/add"))
const ContractsList = lazy(() => import("./pages/contracts/list"))
const NotFound = lazy(() => import("./pages/not-found/not-found"))
const UsersAdd = lazy(() => import("./pages/users/add"))
const UserList = lazy(() => import("./pages/users/list"))
const UserDetails = lazy(() => import("./pages/users/details"))
const Profile = lazy(() => import("./pages/profile/profile"))
const Sessions = lazy(() => import("./pages/profile/sessions"))
const ContractDetail = lazy(() => import("./pages/contracts/details"))

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
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
              path="/contracts/:id"
              element={
                <IsAuth>
                  <ContractDetail />
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
            <Route
              path="/users/:id"
              element={
                <IsAuth>
                  <UserDetails />
                </IsAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <IsAuth>
                  <Profile />
                </IsAuth>
              }
            />
            <Route
              path="/profile/sessions"
              element={
                <IsAuth>
                  <Sessions />
                </IsAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
