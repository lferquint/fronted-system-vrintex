import InputLabelLeft from "../common/InputLabelLeft"
import InputsOneProduct from "../common/InputsOneProduct"
import { useState, useEffect, useRef } from "react"
import Data from "../../utils/classPdf"
import createDescription from "../../utils/createDescription"
import TitleBasic from "../common/TitleBasic"
import FormBasic from '../common/FormBasic'
import InputSubmit from "../common/InputSubmit"
import OptionalInput from "../common/OptionalInput"
import PricipalTitle from "../common/PrincipalTitle"
import ButtonBasic from "../common/ButtonBasic"
import SubtitleBasic from "../common/SubtitleBasic"
import InputWithoutLabel from "../common/InputWithoutLabel"

function PdfView() {
  
  // States
  const [productsCount, setProductsCount] = useState([0])
  const [conditions, setConditions] = useState([])
  const buttonRef = useRef(null)
  const [url, setUrl] = useState('')

  // Handlers
  function handleAddNewProduct(){
    const lastItem = productsCount[productsCount.length - 1]
    const newProductsCount = [...productsCount]
    newProductsCount.push(lastItem + 1)
    setProductsCount(newProductsCount)
  }
  async function handleSubmit(e){
    e.preventDefault()

    // list nodes to array
    const a = Array.from(e.target)

    console.log(a)

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

    fetch('http://localhost:3000/generatePdf', {
      method: 'post', 
      body: JSON.stringify(objToSend), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>res.blob())
    .then((data)=>{setUrl(URL.createObjectURL(data))})
    // .then((data)=>{setUrl(URL.createObjectURL(data))})
    .then(()=>{ setTimeout(()=>{ buttonRef.current.click() }, 100) })
  }

  // Effects
  useEffect(()=>{
    fetch('http://localhost:3000/api/getSaleConditions').then((data)=> data.json()).then((data2)=>{setConditions(data2)})
  }, [])

  return (
    <div>
      <PricipalTitle text='Cotizador Vrintex'/>
      <FormBasic handleSubmit={handleSubmit}>
        <>
          <div className="SectionGeneric">
            <TitleBasic text='Datos del cliente:'/>
            <InputLabelLeft  labelText={'Nombre'}/>
            <InputLabelLeft  labelText={'Empresa'}/>
            <InputLabelLeft  labelText={'Telefono'} />
            <InputLabelLeft  labelText={'Obra'} />
          </div>


          <div className="SectionGeneric">
            <TitleBasic text='Productos'/>
            { 
              productsCount.map((element)=>{
                return <InputsOneProduct key={element} id={element} setProductsCount={setProductsCount} productsCount={productsCount}/>
              })
            }

            <ButtonBasic text='Añadir producto +' onClick={handleAddNewProduct}/>
          </div>

          <div className="SectionGeneric">
            <TitleBasic text='Información adicional'/>
            <SubtitleBasic text='Tiempo de entrega:' />
            <InputWithoutLabel id={1} placeholder='Tiempo de entrega'/>
            <SubtitleBasic text='Condiciones:' />


            {
              conditions.map((element)=>{
                return <OptionalInput key={element.id_conditions} defaultValue={element.condition}/>
              })
            }
          </div>


          <InputSubmit text='Generar cotizacion' />
        </>
      </FormBasic>
      <a href={url} download='Cotizacion' ref={buttonRef}></a>
    </div>
  )
}

export default PdfView
