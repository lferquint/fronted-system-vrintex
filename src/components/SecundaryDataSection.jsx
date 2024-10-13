import Input from "./InputGeneral"
import { useState } from "react"
import { useEffect } from "react"

function SecundaryDataSection(){

  const [typeProducts, setTypeProducts] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/api/getTypeProduct')
    .then((data)=>{
      return data.json()
    })
    .then((data)=>setTypeProducts(data))
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

  return (
    <>
      <form onSubmit={handleSubmit} style={{background: 'rgba(255,255,255,0.5)'}} >
        <Input labelText="Nuevo tipo de producto" typeInput="text"/>
        <input type="submit" value="Agregar"/>
      </form>
      <form onSubmit={handleSubmitModel} style={{background: 'rgba(255,255,255,0.3)'}}>
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
      <form onSubmit={handleSubmitProvider} style={{background: 'rgba(255,255,255,0.1)'}}>
            <Input labelText="Sitio web" typeInput="text"/>
            <Input labelText="Telefono" typeInput="text"/>
            <Input labelText="Email" typeInput="text"/>
            <Input labelText="Nombre de la compañia" typeInput="text"/>
            <input type="submit" value="Enviar"/>
      </form>
    </>
  )
}
export default SecundaryDataSection