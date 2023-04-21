import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
   const { search, setSearch, error } = useSearch()
   const { movies, getMovies } = useMovies({ search })

   const handleSubmit = e => {
      e.preventDefault()
      getMovies()
   }

   const handleChange = e => {
      setSearch(e.target.value)
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
                  className='bg-black/30 rounded-lg px-3 py-1 w-3/6 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/60'
                  placeholder='Avengers, Fats & Furious 9, Godzilla...'
                  autoFocus
               />
               <button className='py-1 px-3 bg-black/30 ring-2 hover:ring-yellow-400/60 rounded-lg'>
                  Search
               </button>
            </form>
            {error && (
               <p className='px-3 py-1 ring-1 ring-red-600 bg-red-600/50 rounded-md w-2/6 mx-auto mb-5'>
                  {error}
               </p>
            )}

            <section className='flex justify-center w-full container mx-auto pb-20'>
               <Movies movies={movies} />
            </section>
         </main>
      </div>
   )
}

export default App
