import Input from "./InputGeneral"
import { useState } from "react"
import { useEffect } from "react"
import '../assets/styles/SecundaryData.css'
import ModalSuccessMessage from "./ModalSuccessMessage"

function SubmitInput({text='Enviar'}){
  return <input style={{cursor: 'pointer'}} type="submit" value={text} className="sDSendButton"/>
}

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

  function handleSubmit(e){
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
    console.log('Esto se está ejecutando????')
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
    <div className="principal_container">
    <h1 style={{textAlign:'center', textDecoration: 'underline', marginTop: '45px', width: '100%', background: '#ff1858', padding: '10px', fontWeight: 900}}>Añadir información sobre productos</h1>

      {
        success ? <ModalSuccessMessage/> : ''
      }
      
      {refresh}
      <div className="secundaryData">
        <div className="sDcontainerForm">
          <h2>Agregar tipo de producto</h2>
          <form onSubmit={handleSubmit} style={{}} >
            <Input labelText="Nuevo tipo de producto" typeInput="text"/>
            <SubmitInput/>
          </form>
        </div>

        <div className="sDcontainerForm">
          <h2>Agregar modelo</h2>
          <form onSubmit={handleSubmitModel} style={{}}>
            <label htmlFor="typeProduc_input">
              Tipo de producto
            </label>
            <select id="typeProduc_input">
              {
                typeProducts.map((typeProduct)=>{return <option value={typeProduct.id_type_product} key={typeProduct.id_type_product}>{typeProduct.type_product_name}</option>})
              }
            </select>
            <Input labelText='Nombre del modelo' typeInput="text" />
            <Input labelText='Descripción' typeInput="text" />
            <Input labelText="Unidades" typeInput="text" ></Input>
            <SubmitInput/>
          </form>
        </div>

        <div className="sDcontainerForm">
          <h2>Agregar provedor</h2>
          <form onSubmit={handleSubmitProvider} style={{}}>
                <Input labelText="Sitio web" typeInput="text"/>
                <Input labelText="Telefono" typeInput="text"/>
                <Input labelText="Email" typeInput="text"/>
                <Input labelText="Nombre de la compañia" typeInput="text"/>
                <SubmitInput/>

          </form>
        </div>

        <div className="sDcontainerForm">
          <h2>Agregar color</h2>
          <form onSubmit={handleSubmitColors}>
            <Input labelText="Nuevo color" typeInput="text"/>
            <SubmitInput/>

          </form>
        </div>

        <div className="sDcontainerForm">
        <h2>Agregar producto</h2>
          <form onSubmit={handleSubmitProduct} >

            <div>
              <label htmlFor="model_input">
                Modelo
              </label>
              <select id="model_input">
                {
                  listModels.map((obj)=>{
                    return <option key={obj.id_model} value={obj.id_model}> {obj.name_model} </option>
                  })
                }
              </select>
            </div>


            
            <div>
              <label htmlFor="color_input">
                Color
              </label>
              <select id="color_input">
                  {
                    listColors.map((obj)=>{
                      return <option key={obj.id_color} value={obj.id_color}> {obj.color_name} </option> 
                    })
                  }
              </select>
            </div>



            <Input labelText='Cantidad en stock' />
            <Input labelText='Precio' />


            <div>
              <label htmlFor="isStock_input">
                Material de stock
              </label>
              <select id="isStock_input">
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="provider_input">
                Provedor
              </label>
              <select id="provider_input">
                {
                  listProviders.map((obj)=>{
                    return <option key={obj.id_provider} value={obj.id_provider}> {obj.company_name} </option>
                  })
                }
              </select>
            </div>

            <SubmitInput/>


          </form>
        </div>
      </div>
    </div>
    
  )
}

export default SecundaryDataSection