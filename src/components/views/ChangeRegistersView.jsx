import { useEffect } from "react"
import { useState } from "react"
import SectionAddDataProduct from "../layout/SectionAddDataProduct"
import SectionModifyDataProducts from "../layout/SectionModifyDataProduct"
import SectionDeleteRegisters from "../layout/SectionDeleteRegisters"
import NavBar from "../layout/NavBar"
import TitleBasic from "../common/TitleBasic"

function ChangeRegistersView(){
  const [isLogged, setIsLogged] = useState(false)
  const [pageFocus, setPageFocus] = useState('')
  function handleClick(newPage){
    setPageFocus(newPage)
  }
  const pages = {
    Agregar_informacion: <SectionAddDataProduct/>,
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
      <TitleBasic text="Lista de funciones:"/>
      <NavBar elements={keys} onClick={handleClick}/>
      <div style={{marginTop: '30px'}}>
        { pages[pageFocus] }
      </div> 
    </>
  )
}
export default ChangeRegistersView