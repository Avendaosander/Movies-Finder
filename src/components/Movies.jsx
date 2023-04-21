function ListOfMovies({ movies }) {
   return (
      <ul className='text-start flex flex-col justify-center items-center gap-10'>
         {movies.map(movie => (
            <li key={movie.id} className='flex flex-col gap-2 bg-black/30 py-5 px-10 rounded-xl shadow-blue-800/50 shadow-lg'>
               <h3 className='w-[300px] font-bold text-xl -mx-7'>🔹{movie.title}</h3>
               <p className='font-light text-white/70'>{movie.year}</p>
               <img src={movie.poster} alt={movie.title}/>
            </li>
         ))}
      </ul>
   )
}

function NoMovies() {
   return (
      <p>No se encontraron resultados para esta busqueda</p>
   )
}

export function Movies({ movies }) {
   const hasMovies = movies?.length > 0
   return (
      hasMovies
         ? <ListOfMovies movies={movies}/>
         : <NoMovies/>
   )
}