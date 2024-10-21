import { useEffect } from "react"
import { useState } from "react"
import SectionAddDataProduct from "../SectionAddDataProduct"
import SectionModifyDataProducts from "../SectionModifyDataProduct"
import SectionDeleteRegisters from "../SectionDeleteRegisters"

function ChangeRegistersView(){
  const [isLogged, setIsLogged] = useState(false)
  const [pageFocus, setPageFocus] = useState('')
  function handleClick(newPage){
    setPageFocus(newPage)
  }
  const pages = {
    Agregar_informacion_productos: <SectionAddDataProduct/>,
    Modificar_informacion_productos: <SectionModifyDataProducts/>,
    Borrar_registros: <SectionDeleteRegisters/>
  }
  const keys = Object.keys(pages)

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
  if(!isLogged){
    return <p>No tienes autorizacion para entrar a esta pagina </p>
  }
  return (
    <>
      <div>
        <ul>
          {keys.map((key)=>{ return <li key={key}> <a  style={{color: 'white'}} href="#" onClick={()=>{ handleClick(key) }}> {key} </a></li> })}
        </ul>
      </div>
      <div>
        { pages[pageFocus] }
      </div> 
    </>
  )
}
export default ChangeRegistersView