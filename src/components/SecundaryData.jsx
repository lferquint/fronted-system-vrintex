import Input from "./InputGeneral"
import { useState } from "react"
import { useEffect } from "react"

function SecundaryDataSection(){

  const [typeProducts, setTypeProducts] = useState([])
  const [listColors, setListColors] = useState([])
  const [listModels, setListModels] = useState([])
  const [listProviders, setListProviders] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/api/getTypeProduct')
    .then((data)=>{
      return data.json()
    })
    .then((data)=>setTypeProducts(data))
    fetch('http://localhost:3000/api/getAllColors').then((data)=>data.json()).then((data)=>{setListColors(data)})
    fetch('http://localhost:3000/api/getAllModels').then((data)=>data.json()).then((data)=>{setListModels(data)})
    fetch('http://localhost:3000/api/getAllProviders').then((data)=>data.json()).then((data)=>{setListProviders(data)})
  }, [])  

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
    })
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
    })
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
    })
    
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
    })
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
    })
  }
  

  return (
    <div className="secundaryData">
      <h2>Add type Product</h2>
      <form onSubmit={handleSubmit} style={{}} >
        <Input labelText="Nuevo tipo de producto" typeInput="text"/>
        <input type="submit" value="Agregar"/>
      </form>
      <h2>Add model</h2>
      <form onSubmit={handleSubmitModel} style={{}}>
        <label>
          Tipo de producto
          <select>
            {
              typeProducts.map((typeProduct)=>{return <option value={typeProduct.id_type_product} key={typeProduct.id_type_product}>{typeProduct.type_product_name}</option>})
            }
          </select>
        </label>
        <Input labelText='Nombre del modelo' typeInput="text" />
        <Input labelText='Descripción' typeInput="text" />
        <Input labelText="Unidades" typeInput="text" ></Input>
        <input type="submit" value="Agregar"/>

      </form>
      <h2>Add provider</h2>
      <form onSubmit={handleSubmitProvider} style={{}}>
            <Input labelText="Sitio web" typeInput="text"/>
            <Input labelText="Telefono" typeInput="text"/>
            <Input labelText="Email" typeInput="text"/>
            <Input labelText="Nombre de la compañia" typeInput="text"/>
            <input type="submit" value="Enviar"/>
      </form>

      <h2>Add color</h2>
      <form onSubmit={handleSubmitColors}>
        <Input labelText="Nuevo color" typeInput="text"/>
        <input type="submit" value="Añadir color"/>
      </form>

      <h2>Add product</h2>
      <form style={{background:'rgba(0,0,0,0.5)'}} onSubmit={handleSubmitProduct} >
        <p>Model</p>
        <select>
          {
            listModels.map((obj)=>{
              return <option key={obj.id_model} value={obj.id_model}> {obj.name_model} </option>
            })
          }
        </select>

        <p>Color</p>
        <select>
            {
              listColors.map((obj)=>{
                return <option key={obj.id_color} value={obj.id_color}> {obj.color_name} </option> 
              })
            }

        </select>

        <Input labelText='Stock' />
        <Input labelText='Price' />

        <p>Is Stock</p>
        <select>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>

        <p>Provider</p>
        <select>
          {
            listProviders.map((obj)=>{
              return <option key={obj.id_provider} value={obj.id_provider}> {obj.company_name} </option>
            })
          }
        </select>

        <input type="submit" value="Agregar producto"/>

      </form>
    </div>
  )
}
export default SecundaryDataSection