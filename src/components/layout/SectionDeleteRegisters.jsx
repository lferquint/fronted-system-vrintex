import { useEffect } from "react"
import { useState } from "react"
import SectionGeneric from "./SectionGeneric"
import FormBasic from "../common/FormBasic"
import InputSubmit from "../common/InputSubmit"
import TitleBasic from "../common/TitleBasic"
import SelectLabelLeft from "../common/SelectLabelLeft"
import ModalSuccessMessage from "../common/ModalSuccessMessage"
import PrincipalTitle from "../common/PrincipalTitle"

function SectionDeleteRegisters(){
  const [listColors, setListColors] = useState([])
  const [success, setSuccess] = useState(false)
  const [listTypeProduct, setListTypeProduct] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [listModels, setListModels] = useState([])
  const [listProviders, setListProviders] = useState([])
  const [listConditions, setListConditions] = useState([])

  function handleTimeSuccessMessage(){
    setTimeout(()=>{ setSuccess(false) }, 4000)
  }
  function handleDeleteColor(e){
    e.preventDefault()
    let array = Array.from(e.target)
    array.pop()
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteColor/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage(); setRefresh(!refresh) })
  }
  function handleDeleteTypeProduct(e){
    e.preventDefault()
    const array = Array.from(e.target)
    array.pop()
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteTypeProduct/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage(); setRefresh(!refresh) })
  }
  function handleDeleteModel(e){
    e.preventDefault()
    const array = Array.from(e.target)
    array.pop()
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteModel/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage(); setRefresh(!refresh) })
  }
  function handleDeleteProvider(e){
    e.preventDefault()
    const array = Array.from(e.target)
    array.pop()
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteProvider/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage(); setRefresh(!refresh) })
  }
  function handleDeleteCondition(e){
    e.preventDefault()
    const array = Array.from(e.target)
    array.pop()
    console.log(array)
    const values = array.map((input)=> input.value)
    fetch(`http://localhost:3000/protected/deleteCondition/${values[0]}`, {
      method: 'POST',
      credentials: 'include'
    }).then(()=>{ setSuccess(true); handleTimeSuccessMessage(); setRefresh(!refresh) })
  }

  useEffect(()=>{

    fetch('http://localhost:3000/api/getAllColors')
    .then((res)=>res.json())
    .then((data)=>{ setListColors(data) })

    fetch('http://localhost:3000/api/getTypeProduct')
    .then((res)=>res.json()).then((data)=>{ setListTypeProduct(data) })

    fetch('http://localhost:3000/api/getAllModels')
    .then((res)=>res.json())
    .then((data)=>{setListModels(data)})

    fetch('http://localhost:3000/api/getAllProviders')
    .then((res)=> res.json())
    .then((data)=>{ setListProviders(data)})

    fetch('http://localhost:3000/api/getSaleConditions')
    .then((res)=>res.json())
    .then((data)=>{setListConditions(data)})

  }, [refresh])

  return (
    <>
      {
        success ? <ModalSuccessMessage/> : ''
      }
      <PrincipalTitle text="Borrar registros"/>
      <SectionGeneric>
        <TitleBasic text="Borrar color"/>
        <FormBasic handleSubmit={handleDeleteColor}>
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
      <SectionGeneric>
        <TitleBasic text="Borrar tipo de producto"/>
        <FormBasic handleSubmit={handleDeleteTypeProduct}>
          <SelectLabelLeft 
            labelText='Seleccionar tipo de producto' 
            options={ listTypeProduct }
            optionValueIsId={true}  
            objContentKey="type_product_name"
            objIdKey="id_type_product"
          />
          <InputSubmit text="Borrar"/>
        </FormBasic>
      </SectionGeneric>
      <SectionGeneric>
        <TitleBasic text="Borrar Modelo"/>
        <FormBasic handleSubmit={handleDeleteModel}>
          <SelectLabelLeft 
            labelText='Seleccionar modelo' 
            options={ listModels }
            optionValueIsId={true}
            objContentKey="name_model"
            objIdKey="id_model"
          />
          <InputSubmit text="Borrar"/>
        </FormBasic>
      </SectionGeneric>    
      <SectionGeneric>
        <TitleBasic text="Borrar proveedor"/>
        <FormBasic handleSubmit={handleDeleteProvider}>
          <SelectLabelLeft 
            labelText='Seleccionar proveedor' 
            options={ listProviders }
            optionValueIsId={true}
            objContentKey="company_name"
            objIdKey="id_provider"
          />
          <InputSubmit text="Borrar"/>
        </FormBasic>
      </SectionGeneric>
      <SectionGeneric>
        <TitleBasic text="Borrar condicion"/>
        <FormBasic handleSubmit={handleDeleteCondition}>
          <SelectLabelLeft 
            labelText='Seleccionar condicion' 
            options={ listConditions }
            optionValueIsId={true}
            objContentKey="condition"
            objIdKey="id_conditions"
          />
          <InputSubmit text="Borrar"/>
        </FormBasic>
      </SectionGeneric>    
    </>

  )
}
export default SectionDeleteRegisters