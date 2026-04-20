import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getBookById, deleteBook } from '../services/api'

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    getBookById(id)
      .then(data => setBook(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this book?')) return

    try {
      await deleteBook(id)
      navigate('/books')
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    }
  }

  const handleUpdate = () => {
    navigate(`/books/edit/${id}`)
  }

  if (loading) return <p>Loading...</p>
  if (error)   return (
    <div>
      <p style={{ color: 'red' }}>Error: {error}</p>
      <Link to="/books">← Back to list</Link>
    </div>
  )

  return (
    <div className="book-detail">
      <Link to="/books">← Back to list</Link>

      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Description:</strong> {book.description}</p>

      <button
        onClick={handleUpdate}
        style={{
          color: 'white',
          background: '#3182ce',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          marginTop: '10px',
          marginRight: '10px'
        }}
      >
        Update Book
      </button>

      <button
        onClick={handleDelete}
        style={{
          color: 'white',
          background: '#e53e3e',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          marginTop: '16px'
        }}
      >
        Delete Book
      </button>
    </div>
  )
}

export default BookDetail