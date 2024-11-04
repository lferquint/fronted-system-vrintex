import { useEffect } from "react"
import { useState } from "react"
import SectionGeneric from "./SectionGeneric"
import FormBasic from "../common/FormBasic"
import InputSubmit from "../common/InputSubmit"
import TitleBasic from "../common/TitleBasic"
import SelectLabelLeft from "../common/SelectLabelLeft"
import ModalSuccessMessage from "../common/ModalSuccessMessage"

function SectionDeleteRegisters(){
  const [listColors, setListColors] = useState([])
  const [success, setSuccess] = useState(false)

  function handleTimeSuccessMessage(){
    setTimeout(()=>{ setSuccess(false) }, 4000)
  }
  function handleDelete(e){
    e.preventDefault()
    let array = Array.from(e.target)
    array.pop()
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteColor/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage() })
  }

  useEffect(()=>{
    fetch('http://localhost:3000/api/getAllColors')
    .then((res)=>res.json())
    .then((data)=>{ setListColors(data) })
  }, [])
  
  return (
    <>
      {
        success ? <ModalSuccessMessage/> : ''
      }
      <SectionGeneric>
        <TitleBasic text="Borrar color"/>
        <FormBasic handleSubmit={handleDelete}>
          <SelectLabelLeft 
            labelText='Seleccionar color' 
            options={ listColors }
            optionValueIsId={true}
            objContentKey="color_name"
            objIdKey="id_color"
          />
          <InputSubmit text="Borrar"/>
        </FormBasic>
      </SectionGeneric>    
    </>

  )
}
export default SectionDeleteRegisters