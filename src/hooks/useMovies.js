import { useState } from 'react'
import withResults from '../examples/find-results.json'
import withNotResults from '../examples/not-results.json'

export function useMovies({ search }) {
   const [responseMovies, setResponseMovies] = useState([])
   const movies = responseMovies.Search

   const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
   }))

   const getMovies = () => {
      if (search) {
         setResponseMovies(withResults)
      } else {
         setResponseMovies(withNotResults)
      }
   }

   return { movies: mappedMovies, getMovies }
}
