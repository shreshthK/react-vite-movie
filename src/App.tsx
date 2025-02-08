import Search from './components/search'
import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTitle, setSearchTitle] = useState('')
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setError('')
    try {
      const endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json()

      if (data.results.length === 0) {
        setError('No movies found')
        setMovies([])
        return
      }

      setError('')
      setMovies(data.results || [])

    } catch (error) {
      console.error('Error fetching movies:', error)
      setError('Error fetching movies')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies()
  }, [searchTitle])

  return (
    <div>
      <div className='pattern'></div>
      <div className='wrapper'>
        <header>
          <img
            src="./background.jpg"
            alt="hero banner"
            className="inset-0 w-full h-full object-cover"
          />
          <h1>Find your favorite <span className='text-gradient'>movie</span></h1>
        </header>
        <Search searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
        <h1 className='text-white'> {searchTitle} </h1>
        <section>
          <h2>All movies</h2>
          {isLoading ? (<p className='text-white'>Loading...</p>) : error ? (<p className='text-white'>{error}</p>) :
            (<ul>
              {movies.map((movie: { id: number, original_title: string, overview: string }) => (
                <li key={movie.id} className='text-white'>{movie.original_title}</li>
              ))}
            </ul>)}

        </section>
      </div>
    </div>
  )
}

export default App