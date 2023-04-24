import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
   const [sort, setSort] = useState(false)
   const { search, setSearch, error, alertSearchError, setAlertSearchError } = useSearch()
   const { movies, getMovies, loading } = useMovies({ search, sort })

   const debouncedMovies = useCallback(
      debounce(search => {
         getMovies({ search })
      }, 300),
     [getMovies],
   )
   

   const handleSubmit = e => {
      e.preventDefault()
      getMovies({ search })
   }

   const handleChange = e => {
      const newSearch = e.target.value
      if (!newSearch.startsWith(' ')) {
         setSearch(newSearch.trim())
         if (!error) {
            debouncedMovies(newSearch)
         }
      }
   }

   const handleSort = () => {
      setSort(!sort)
   }

   const closeSearchError = () => {
      setAlertSearchError(false)
   }

   return (
      <div className='bg-blue-950 w-full min-h-screen text-center'>
         <header className='flex items-center justify-center h-20 w-full bg-black/10 shadow-blue-800/50 shadow-lg'>
            <h1 className='text-2xl sm:text-4xl'>Movie Finder</h1>
         </header>

         <main className='mx-5 sm:mx-10'>
            <form
               className='flex flex-col sm:flex-row justify-center items-center gap-5 w-full my-10'
               onSubmit={handleSubmit}
            >
               <label
                  htmlFor='query'
                  className='hidden'
               >
                  Movie:{' '}
               </label>
               <input
                  type='text'
                  name='query'
                  value={search}
                  onChange={handleChange}
                  id='query'
                  className={`bg-black/30 rounded-lg text-sm sm:text-base px-3 py-1 w-3/6 ring-2 ${error ? 'ring-red-600 focus:ring-red-600/80' : 'focus:ring-yellow-400/60'} focus:outline-none`}
                  placeholder='Avengers, Fast & Furious 9, Godzilla...'
                  autoFocus
               />
               <div className='flex gap-3'>
                  <label htmlFor="title" className='text-xs sm:text-base'>Sort by title</label>
                  <input
                     type='checkbox'
                     name='title'
                     id='title'
                     onChange={handleSort}
                     checked={sort}
                  />
               </div>
               <button className='py-1 px-3 bg-black/30 text-sm sm:text-base ring-2 hover:ring-yellow-400/60 rounded-lg'>
                  Search
               </button>
            </form>
            {alertSearchError && (
               <p className='relative text-sm sm:text-base w-full px-5 py-1 ring-1 ring-red-600 bg-red-600/50 rounded-md min-[400px]:w-4/6 md:w-3/6 mx-auto mb-5'>
                  {error}
                  <button className='font-bold absolute right-3' onClick={closeSearchError}>X</button>
               </p>
            )}

            <section className='flex justify-center w-full container mx-auto pb-20'>
               {loading ? (
                  <div className='text-yellow-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent'></div>
               ) : (
                  <Movies movies={movies} />
               )}
            </section>
         </main>
      </div>
   )
}

export default App
