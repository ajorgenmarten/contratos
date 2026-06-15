import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home/home"
import ContractAdd from "./pages/contracts/add"
import NotFound from "./pages/not-found/not-found"
import ContractsList from "./pages/contracts/list"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contracts" element={<ContractsList />} />
        <Route path="/contracts/add" element={<ContractAdd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
