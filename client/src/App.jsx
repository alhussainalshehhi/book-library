import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useLogin } from './context/Login'
import Home from './pages/Home'
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import BookDetail from './pages/BookDetail'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'
import './App.css'

function ProtectedAdmin() {
  const { isLoggedIn } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { state: { redirected: true } })
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return <Admin />
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App