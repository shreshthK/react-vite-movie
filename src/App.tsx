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

  const fetchMovies = async () => {
    try {
      const endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setError('Error fetching movies')
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
          {error && <p>{error}</p>}
        </section>
      </div>
    </div>
  )
}

export default App