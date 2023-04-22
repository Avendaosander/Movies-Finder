import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
   const [sort, setSort] = useState(false)
   const { search, setSearch, error } = useSearch()
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
      const newSearch = e.target.value.trim()
      setSearch(newSearch)
      debouncedMovies(newSearch)
   }

   const handleSort = () => {
      setSort(!sort)
   }

   return (
      <div className='bg-blue-950 w-full min-h-screen text-center'>
         <header className='flex items-center justify-center h-20 w-full bg-black/10 shadow-blue-800/50 shadow-lg'>
            <h1 className='text-4xl'>Movie Finder</h1>
         </header>

         <main>
            <form
               className='flex justify-center items-center gap-5 w-full my-10'
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
                  className={`bg-black/30 rounded-lg px-3 py-1 w-3/6 ring-2 ${error ? 'ring-red-600 focus:ring-red-600/80' : 'focus:ring-yellow-400/60'} focus:outline-none`}
                  placeholder='Avengers, Fats & Furious 9, Godzilla...'
                  autoFocus
               />
               <label htmlFor="title">Sort by title</label>
               <input
                  type='checkbox'
                  name='title'
                  id='title'
                  onChange={handleSort}
                  checked={sort}
               />
               <button className='py-1 px-3 bg-black/30 ring-2 hover:ring-yellow-400/60 rounded-lg'>
                  Search
               </button>
            </form>
            {error && (
               <p className='relative px-3 py-1 ring-1 ring-red-600 bg-red-600/50 rounded-md w-2/6 mx-auto mb-5'>
                  {error}
                  <button className='font-bold absolute right-3'>X</button>
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
