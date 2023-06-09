function ListOfMovies({ movies }) {
   return (
      <ul className='grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8'>
         {movies.map(movie => (
            <li key={movie.id} className='flex flex-col gap-2 bg-black/30 py-5 px-10 rounded-xl shadow-blue-800/50 shadow-lg'>
               <h3 className='font-bold text-xl'>🔹{movie.title}</h3>
               <p className='font-light text-white/70'>{movie.year}</p>
               <img src={movie.poster} alt={movie.title}/>
            </li>
         ))}
      </ul>
   )
}

function NoMovies({ movies }) {
   const hasError = movies?.length !== 0
   return (
      hasError ? (
         <p className="text-sm sm:text-base">{movies.Error}</p>
      ) : (
         <p className="text-sm sm:text-base">Find the movies you are looking for</p>
      )
   )
}

export function Movies({ movies }) {
   const hasMovies = movies?.length > 0
   return (
      hasMovies
         ? <ListOfMovies movies={movies}/>
         : <NoMovies movies={movies}/>
   )
}