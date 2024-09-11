import Input from "./components/input"
import InputsOneProduct from "./components/InputsOneProduct"
import { useState } from "react"
import Data from "./utils/classPdf"

function App() {
  const [productsCount, setProductsCount] = useState([0])
  function handleClick(){
    const lastItem = productsCount[productsCount.length - 1]
    const newProductsCount = [...productsCount]
    newProductsCount.push(lastItem + 1)
    setProductsCount(newProductsCount)
  }
  function handleSubmit(e){
    e.preventDefault()
    const a = Array.from(e.target)
    const inputs = a.filter((element)=>{if(element.type != 'button' && element.type != 'submit'){return element.value}})
    const values = inputs.map((element)=>{
      if (element.type === 'select-one'){
        return element[0].text
      }
      return element.value

    })
    const products = [...values]
    products.splice(products.length - 1)
    products.splice(0, 4)
    
    let arrayWithProducts = []
    let arrayUnit = []
    for( let i = 0; i < products.length; i++ ) {
      arrayUnit.push(products[i])
      if( (i + 1) % 6 === 0){
        arrayWithProducts.push(arrayUnit)
        arrayUnit = []
      }
    } 
    let finalArray = arrayWithProducts.map((array)=>{
      return { 
        nameProduct: array[0], 
        model: array[1], 
        amount: parseInt(array[3]),
        price: array[4], 
        description: array[5]
      }
    })
    const objToSend = new Data( {company: values[1], nameClient: values[0], place: values[3], tel: values[2]}, finalArray, values[values.length - 1 ], ['Algo generico', 'Algo generico', 'Algo generico'], 'Elias Moreno')
    const aa = JSON.stringify(objToSend) 
    console.log(aa)
    fetch('http://localhost:3000/generatePdf', {
      method: 'post', 
      body: aa, 
      headers: {
        'Content-Type': 'application/json'
    },
    })
  }
  return (
    <>
      <form action="#" onSubmit={handleSubmit}>
        <Input labelText={'Nombre'}/>
        <Input labelText={'Empresa'}/>
        <Input labelText={'Telefono'} />
        <Input labelText={'Obra'} />
        { productsCount.map((element)=>{return <InputsOneProduct key={element}/>}) }
        <input onClick={handleClick} style={{display: 'block'}} type="button" value="Añadir producto"/>
        <input required style={{display: 'block'}} type="text" placeholder="Tiempo de entrega"/>
        <input type="submit" value='Send'/>
      </form>

    </>
  )
}

export default App
