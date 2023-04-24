import { useEffect, useRef, useState } from "react";

export function useSearch (){
   const [search, setSearch] = useState('')
   const [error, setError] = useState(null)
   const [alertSearchError, setAlertSearchError] = useState(false)
   const isFirstInput = useRef(true)

   useEffect(() => {
      if (isFirstInput.current) {
         isFirstInput.current = search === ''
         return
      }
      if (search === '') {
         setError('The field cannot be empty')
         setAlertSearchError(true)
         return
      }
      if (search.length < 3) {
         setError("You can't search for a movie with less than 3 characters")
         setAlertSearchError(true)
         return
      }

      setAlertSearchError(false)
      return setError(null)
   },[search])

   return ({search, setSearch, error, alertSearchError, setAlertSearchError})
}