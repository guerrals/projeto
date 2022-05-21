import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashboardPage/Dashboard";
import TablePage from "./pages/TablePage/Table";
export default function App() {
    return (
        <BrowserRouter>
            <Topbar />
            <Sidebar />
            <Routes>
                <Route index element={<Dashboard />} />
                <Route path="table" element={<TablePage />} />
            </Routes>
        </BrowserRouter>
    );
}
