import { useEffect, useRef, useState } from "react";

export function useSearch (){
   const [search, setSearch] = useState('')
   const [error, setError] = useState(null)
   const isFirstInput = useRef(true)

   useEffect(() => {
      if (isFirstInput.current) {
         isFirstInput.current = search === ''
         return
      }
      if (search === '') {
         setError('El campo no puede estar vacio')
         return
      }
      if (search.length < 3) {
         setError('No puedes buscar una pelicula menor a 3 caracteres')
         return
      }

      return setError(null)
   },[search])

   return ({search, setSearch, error})
}