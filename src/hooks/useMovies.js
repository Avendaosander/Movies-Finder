import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/getMovies'

export function useMovies({ search, sort }) {
   const [movies, setMovies] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const previousSearch = useRef(search)

   const getMovies = useCallback( async ({ search }) => {
      if (search === previousSearch.current) return
      try {
         setLoading(true)
         setError(null)
         const newMovies = await searchMovies({ search })
         previousSearch.current = search
         setMovies(newMovies === null ? [] : newMovies)
      } catch (error) {
         setError(error.message)
      } finally {
         setLoading(false)
      }
   }, [])

   const sortedMovies = useMemo(() => {
      return sort && movies?.length > 0
         ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
         : movies
   }, [sort, movies])

   return { movies: sortedMovies, getMovies, loading, error }
}
