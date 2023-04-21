import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
   const {movies} = useMovies()

   return (
      <div className='bg-blue-950 w-full text-center'>
         <header className="flex items-center justify-center h-20 w-full bg-black/10 shadow-blue-800/50 shadow-lg">
            <h1 className="text-4xl">Movie Finder</h1>
         </header>

         <main>
            <form className="flex justify-center items-center gap-5 my-10">
               <label htmlFor="search" className="hidden">Movie: </label>
               <input 
                  type="text"
                  id="search"
                  className="bg-black/30 rounded-lg px-3 py-1 w-3/6 ring-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                  placeholder="Avengers, Fats & Furious 9, Godzilla..."
                  autoFocus />
               <button className="py-1 px-3 bg-black/30 ring-2 hover:ring-yellow-400/60 rounded-lg">Search</button>
            </form>

            <section className='pb-20'>
               <Movies movies={movies}/>
            </section>
         </main>
      </div>
   )
}

export default App
