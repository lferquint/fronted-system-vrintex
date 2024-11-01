import { useState } from "react"
import { useEffect } from "react"
import '../assets/styles/SecundaryData.css'
import ModalSuccessMessage from "./ModalSuccessMessage"
import PrincipalTitle from '../components/common/PrincipalTitle'
import FormBasic from '../components/layout/FormBasic'
import InputLabelLeft from "./common/InputLabelLeft"
import InputSubmit from "./common/InputSubmit"
import TitleBasic from "../components/common/TitleBasic"
import SelectLabelLeft from "./common/SelectLabelLeft"

function SecundaryDataSection(){

  const [typeProducts, setTypeProducts] = useState([])
  const [listColors, setListColors] = useState([])
  const [listModels, setListModels] = useState([])
  const [listProviders, setListProviders] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:3000/api/getTypeProduct')
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{ setTypeProducts(data) })
    fetch('http://localhost:3000/api/getAllColors').then((data)=>data.json()).then((data)=>{setListColors(data)})
    fetch('http://localhost:3000/api/getAllModels').then((data)=>data.json()).then((data)=>{setListModels(data)})
    fetch('http://localhost:3000/api/getAllProviders').then((data)=>data.json()).then((data)=>{setListProviders(data)})
  }, [refresh])  

  function handleTimeSuccessMessage(){
    setTimeout(()=>{ setSuccess(false) }, 4000)
  }

  function handleSubmitTypeProduct(e){
    e.preventDefault()
    const array = Array.from(e.target).filter((element)=>element.type != 'submit')
    const values = array.map((element)=>element.value)
    const typeProduct = values[0] 
    const dataJson = JSON.stringify({typeProduct: typeProduct})
    fetch('http://localhost:3000/protected/addTypeProduct', {
      method: 'POST',
      credentials: 'include',
      body: dataJson,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
    
  }

  function handleSubmitModel(e){
    e.preventDefault()
    const inputs = Array.from(e.target).filter((element)=>{return element.type != 'submit'}) 
    const values = inputs.map((input)=>{return input.value})

    // model, description, idTypeProduct, units
    const objNewModl = {
      idTypeProduct: values[0],
      model: values[1],
      description: values[2], 
      units: values[3]
    }
    const objJson = JSON.stringify(objNewModl)
    fetch('http://localhost:3000/protected/addModel', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: objJson
    }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
  }

  function handleSubmitProvider(e){
    e.preventDefault()
    const array = Array.from(e.target).filter((element)=>element.type != 'submit')
    const values = array.map((element)=>element.value)

    const objData = {
      website: values[0], 
      tel: values[1], 
      email: values[2], 
      companyName: values[3]
    }
    const objJson = JSON.stringify(objData)
    fetch('http://localhost:3000/protected/addProvider', {
      method:'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: objJson,
    }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
    
    
  }

  function handleSubmitColors(e){
    e.preventDefault()
    const colorJson = JSON.stringify({colorName: e.target[0].value})

    fetch('http://localhost:3000/protected/addColor', {
      method: 'POST', 
      credentials: 'include',
      body: colorJson,
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
  }

  function handleSubmitProduct(e){
    e.preventDefault()
    const inputs = Array.from(e.target).filter((element)=>element.type != 'submit') 
    const values = inputs.map((element)=>element.value)
    const objToSend = {
      idModel: values[0],
      idColor: values[1], 
      stock: values[2], 
      price: values[3], 
      isStock: values[4], 
      idProvider: values[5]
    }
    console.log(objToSend)
    const objJson = JSON.stringify(objToSend)
    fetch('http://localhost:3000/protected/addProduct', {
      method: 'POST', 
      credentials: 'include', 
      body: objJson, 
      headers: {
        'Content-Type': 'application/json'
      } 
    }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
    
  }
  

  return (
    <div>
      <PrincipalTitle text='Añadir informacion sobre productos'/>

      {
        success ? <ModalSuccessMessage/> : ''
      }
      
      <TitleBasic text="Agregar tipo de producto"/>
      <FormBasic handleSubmit={handleSubmitTypeProduct}>
        <InputLabelLeft labelText="Nuevo tipo de producto"/>
        <InputSubmit text='Añadir'/>
      </FormBasic>

      <TitleBasic text="Agregar modelo"/>
      <FormBasic handleSubmit={handleSubmitModel}>
        <SelectLabelLeft 
          labelText="Tipo de producto" 
          options={typeProducts} 
          objContentKey="type_product_name" 
          objIdKey="id_type_product"
        />
        <InputLabelLeft labelText="Nombre del modelo"/>
        <InputLabelLeft labelText="Descripcion"/>
        <InputLabelLeft labelText="Unidades"/>
        <InputSubmit text='Añadir'/>
      </FormBasic>

      <TitleBasic text="Agregar provedor"/>
      <FormBasic handleSubmit={handleSubmitProvider}>
        <InputLabelLeft labelText="Sitio web"/>
        <InputLabelLeft labelText="Email"/>
        <InputLabelLeft labelText="Telefono"/>
        <InputLabelLeft labelText="Nombre de la compañia"/>
        <InputSubmit text='Añadir'/>
      </FormBasic>

      <TitleBasic text="Agregar color"/>
      <FormBasic handleSubmit={handleSubmitColors}>
        <InputLabelLeft labelText="Nuevo color"/>
        <InputSubmit text='Añadir'/>
      </FormBasic>

      <TitleBasic text='Agregar Producto' />
      <FormBasic handleSubmit={handleSubmitProduct}>
        <SelectLabelLeft 
          labelText="Modelo" 
          options={listModels} 
          objContentKey="name_model" 
          objIdKey="id_model"
          optionValueIsId={true}
        />
        <SelectLabelLeft 
          labelText="Color" 
          options={listColors} 
          objContentKey="color_name" 
          objIdKey="id_color"
          optionValueIsId={true}
        />
        <InputLabelLeft labelText="Cantidad en stock" />
        <InputLabelLeft labelText="Precio" />
        <SelectLabelLeft 
          labelText="Material de Stock" 
          options={[{content: 'true', id: '0'}, {content: 'false', id: '1'}]} 
        />
        <SelectLabelLeft 
          labelText="Provedor" 
          options={listProviders} 
          objContentKey="company_name"
          objIdKey="id_provider"
          optionValueIsId={true}
        />
        <InputSubmit text='Añadir producto'/>
      </FormBasic>
      
    </div>
    
  )
}

export default SecundaryDataSection