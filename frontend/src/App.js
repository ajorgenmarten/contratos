import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/home";
import ContractAdd from "./pages/contracts/add";
import NotFound from "./pages/not-found/not-found";
import ContractsList from "./pages/contracts/list";
import UsersAdd from "./pages/users/add";
import UserList from "./pages/users/list";
import Login from "./pages/login/login";
import AuthProvider from "./contexts/auth/auth.provider";
import IsAuth from "./components/logic/is-auth";
import NotAuth from "./components/logic/not-auth";
export function App() {
    return (_jsx(AuthProvider, { children: _jsxs(BrowserRouter, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(IsAuth, { children: _jsx(Home, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(NotAuth, { children: _jsx(Login, {}) }) }), _jsx(Route, { path: "/contracts", element: _jsx(IsAuth, { children: _jsx(ContractsList, {}) }) }), _jsx(Route, { path: "/contracts/add", element: _jsx(IsAuth, { children: _jsx(ContractAdd, {}) }) }), _jsx(Route, { path: "/users", element: _jsx(IsAuth, { children: _jsx(UserList, {}) }) }), _jsx(Route, { path: "/users/add", element: _jsx(IsAuth, { children: _jsx(UsersAdd, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }), _jsx(ToastContainer, {})] }) }));
}
export default App;
