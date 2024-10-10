import { useEffect } from "react"
import { useState } from "react"
import SectionModifyProducts from "../sectionModifyProducts"
function ChangeRegistersView(){
  const [isLogged, setIsLogged] = useState(false)
  useEffect(()=>{
    fetch('http://localhost:3000/protected/isLogged', {
      method: 'POST',
      credentials: 'include'
    }).then((res)=> res.json()).then((response)=>{
      if(response.message=== 'isLogged'){
        setIsLogged(true)
      }
    })
  })
  return (
    <>
      {isLogged && <SectionModifyProducts/>}
      {!isLogged && <p>No tienes autorizacion para entrar a esta pagina </p>}
    </>
  )
}
export default ChangeRegistersView