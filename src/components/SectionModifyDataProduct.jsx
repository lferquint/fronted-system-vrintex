import { useState } from "react"
import { useEffect } from "react"
import ModalSuccessMessage from "./ModalSuccessMessage"

function BasicInput({value, label, disabled}){
  const [inputValue, setInputValue] = useState(value)
  function handleChange(e){
    setInputValue(e.target.value)
  }
  return (
    <div>
      <label htmlFor={label} style={{display:'block'}}>{label}</label>
      <input disabled={disabled} type="text" onChange={handleChange} value={inputValue} id={label}></input>
    </div>
  )
}

function InputsModifyOnlyOneProduct({objConfig, refresh, setRefresh}){
  const [disabled, setDisabled] = useState(true)
  const [success, setSuccess] = useState(false)
  const [buttonUpdateClicked, setButtonUpdateClicked] = useState(false)
  function handleTimeSuccessMessage(){
    setTimeout(()=>{ setSuccess(false) }, 4000)
  }
  function handleUpdate(){
    setDisabled(!disabled)
    setButtonUpdateClicked(!buttonUpdateClicked)
  }
  function handleDelete(){
    fetch(`http://localhost:3000/protected/deleteProduct/${objConfig.id_product}`, {
      method: 'POST',
      credentials: 'include'
    })
    setRefresh(!refresh)
  }
  function handleSubmit(e){
    e.preventDefault()
    const inputs = Array.from(e.target)
    const importantInputs = [inputs[2], inputs[3], inputs[4]]
    const values = importantInputs.map((input)=> input.value )
    const objToSend = { newPrice: values[0], newStock: values[1], idProduct: values[2] }
    const objJson = JSON.stringify(objToSend)
    fetch('http://localhost:3000/protected/modifyProduct', {
      credentials: 'include', 
      method: 'POST', 
      body: objJson, 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(()=>{setSuccess(true); handleTimeSuccessMessage()})
    setDisabled(!disabled)    
    setButtonUpdateClicked(!buttonUpdateClicked)
  }
  return (
    
    <div className="principal_container">
      {
        success ? <ModalSuccessMessage/> : ''
      }
      <form style={{marginTop: '40px'}} onSubmit={handleSubmit}>
        {<BasicInput disabled value={objConfig.type_product_name} label="Tipo de producto" />}
        {<BasicInput disabled value={objConfig.name_model} label="Model" />}
        {<BasicInput disabled= {disabled} value={objConfig.price} label="Precio"/>}
        {<BasicInput disabled= {disabled} value={objConfig.stock} label="Stock"/>}
        <input type="hidden" value={objConfig.id_product}/>
        <input onClick={handleUpdate} style={{alignSelf: 'flex-end', background:'#a8d4ff'}} type="button" value={ buttonUpdateClicked ? 'Cancelar actualizacion' : 'Actualizar' } />
        <input onClick={handleDelete} style={{alignSelf: 'flex-end', background: 'red', color: 'white'}} type="button" value="Borrar producto" />
        {
          !disabled && <input style={{display: 'block', background: 'green', color: 'white'}} type="submit" value="Guardar"/>
        }
      </form>  
    </div>

    
  )
}

function SectionModifyDataProducts(){
  const [refresh, setIsRefresh] = useState(false)
  const [listProducts, setListProducts] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/api/getAllProducts')
    .then((data)=>data.json())
    .then((data)=>{setListProducts(data)})
  }, [refresh])
  return (

    <>
    <div>
      {
        listProducts[0] &&
        listProducts.map((productObj)=>{
          return <InputsModifyOnlyOneProduct refresh={refresh} setRefresh={setIsRefresh} key={productObj.id_product} objConfig={productObj} />
        })
      }
      {
        !listProducts[0] && <p>Aun no hay informacion, agrega registros en el apartado `Agregar_informacion_productos` </p>
      }
    </div>
    </>

  )
}
export default SectionModifyDataProducts