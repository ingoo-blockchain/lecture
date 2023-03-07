import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './layout/header'
import { Main } from './pages'
import { BoardList, BoardWrite, BoardModify } from './pages/board'
import { Login } from './pages/user'
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Header />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/board/*">
                        <Route path="list" element={<BoardList />} />
                        <Route path="write" element={<BoardWrite />} />
                        <Route path="modify/:id" element={<BoardModify />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
