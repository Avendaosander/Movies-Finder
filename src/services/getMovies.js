const API_KEY = '17ed7bd8'

export const searchMovies = async ({ search }) => {
   if (search === '') return null

   try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      const json = await response.json()
      const listOfMovies = json.Search

      const movies = listOfMovies?.map(movie => ({
         id: movie.imdbID,
         title: movie.Title,
         year: movie.Year,
         poster: movie.Poster
      }))

      if (movies !== undefined){
         return movies
      } else{
         return json
      }
   
   } catch (error) {
      throw new Error('Error searching movie')
   }
}