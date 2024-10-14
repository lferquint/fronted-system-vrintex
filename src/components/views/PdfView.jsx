import Input from "../InputGeneral"
import InputsOneProduct from "../InputsOneProduct"
import { useState, useEffect } from "react"
import Data from "../../utils/classPdf"
import InputCondition from "../InputCondition"
import createDescription from "../../utils/createDescription"

function PdfView() {
  /* -- States -- */
  const [productsCount, setProductsCount] = useState([0])
  const [conditions, setConditions] = useState([])
  // const [conditionsCount, setConditionsCount] = useState([0])

  /* -- Handlers -- */

  // Handle click in 'add new product'
  function handleClick(){
    const lastItem = productsCount[productsCount.length - 1]
    const newProductsCount = [...productsCount]
    newProductsCount.push(lastItem + 1)
    setProductsCount(newProductsCount)
  }

  //Handle submit form
  async function handleSubmit(e){
    e.preventDefault()

    // list nodes to array
    const a = Array.from(e.target)

    // filter only important inputs
    const inputs = a.filter((element)=>{if(element.type != 'button' && element.type != 'submit' && element.className != 'condition'){return element.value}})

    // get input values
    let idModel
    inputs.forEach((element)=>{
      if (element.type === 'select-one'){
        if(element.name == 'modelProduct'){
          idModel = element.value
        }
      }
      return element.value
    })
    const special = await fetch(`http://localhost:3000/api/getColorsInStock/${idModel}`)
    const decode = await special.json()
    const arrayWithColors = decode.map((obj)=>obj.color_name)
    console.log(arrayWithColors)
    const values = inputs.map((element)=>{
      if (element.type === 'select-one'){
        if(element[element.selectedIndex].text === 'A elegir'){
          return arrayWithColors
        }
        return element[element.selectedIndex].text
      }
      return element.value
    })

    // get values of condition inputs
    const inputsConditions = a.filter((element)=>{return element.className == 'additional_info_input condition'})
    let conditions = inputsConditions.map((obj)=>{return obj.value})
    conditions = conditions.filter((element)=>{return element != ''})

    // filter only data about products
    const products = [...values]
    // products.splice(products.length)  
    products.splice(0, 4)
    products.splice(products.length - 1)

    // Split array in smallers arrays with info about ONE product
    let arrayWithProducts = []
    let arrayUnit = []
    for( let i = 0; i < products.length; i++ ) {
      arrayUnit.push(products[i])
      if( (i + 1) % 7 === 0){
        arrayWithProducts.push(arrayUnit)
        arrayUnit = []
      }
    } 


    //Array with the same structure to class Data
    let finalArray = arrayWithProducts.map((array)=>{
      createDescription(array[5], [array[2], 'blue', 'green'])
      return { 
        nameProduct: array[0], 
        model: array[1], 
        amount: parseInt(array[3]),
        price: array[4], 
        // description: array[5],
        description: createDescription(array[5], array[2]),
        units: array[6],
      }
    })

    // Create obj to send to the API pdf 
    const objToSend = new Data( {company: values[1], nameClient: values[0], place: values[3], tel: values[2]}, finalArray, values[values.length - 4], conditions , 'Elias Moreno')
    // Send data
    console.log(objToSend)

    fetch('http://localhost:3000/generatePdf', {
      method: 'post', 
      body: JSON.stringify(objToSend), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /* -- Effects -- */
  useEffect(()=>{
    fetch('http://localhost:3000/api/getSaleConditions').then((data)=> data.json()).then((data2)=>{setConditions(data2)})
  }, [])

  return (
    <div className="principal_container">
      <h1 style={{textAlign:'center', textDecoration: 'underline', marginTop: '45px', width: '100%', background: '#ff1858', padding: '10px', fontWeight: 900}}>Cotizador Vrintex</h1>
      <form action="#" onSubmit={handleSubmit}>
        <div><h2>Datos del cliente:</h2></div>
        <Input labelText={'Nombre'}/>
        <Input labelText={'Empresa'}/>
        <Input labelText={'Telefono'} />
        <Input labelText={'Obra'} />
        <div><h2>Productos:</h2></div>
        { productsCount.map((element)=>{return <InputsOneProduct key={element}/>}) }
        <input className="add_product" onClick={handleClick} type="button" value="Añadir producto +"/>
          <h2>Información adicional:</h2>            
          <h3 style={{display: 'block'}}>Tiempo de entrega:</h3>
          <input  style={{display: 'block'}} className="additional_info_input" type="text" placeholder="Tiempo de entrega"/>
          <h3>Condiciones:</h3>
          {
            conditions.map((element)=>{
              return <InputCondition key={element.id_conditions} defaultValue={element.condition}/>
            })
          }
        <input style={{display: 'block'}} type="submit" className="send_button" value='Generar cotización'/>
      </form>

    </div>
  )
}

export default PdfView
