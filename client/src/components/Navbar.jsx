import { NavLink } from 'react-router-dom'
import { useLogin } from '../context/Login'

function Navbar() {  
  const { isLoggedIn, toggleLogin } = useLogin()

  return (
    <nav className="navbar">
      <span className="nav-brand">📚 Book Library</span>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/books/add">Add Book</NavLink>
        <NavLink to="/admin">Admin</NavLink>

        <button className='btn' onClick={toggleLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar