import { useEffect } from "react"
import { useState } from "react"
import SecundaryDataSection from "./SecundaryDataSection"

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
  function handleUpdate(){
    setDisabled(!disabled)
  }
  function handleDelete(){
    fetch(`http://localhost:3000/protected/deleteProduct/${objConfig.id_product}`, {
      method: 'POST',
      credentials: 'include'
    })
    setRefresh(!refresh)
  }
  return (
    <>
    <div style={{display: 'flex', marginTop: '40px'}}>
      {<BasicInput disabled value={objConfig.type_product_name} label="Tipo de producto" />}
      {<BasicInput disabled value={objConfig.name_model} label="Model" />}
      {<BasicInput disabled= {disabled} value={objConfig.price} label="Precio"/>}
      {<BasicInput disabled= {disabled} value={objConfig.stock} label="Stock"/>}
      <input type="hidden" value={objConfig.id_product}/>
      <input onClick={handleUpdate} style={{alignSelf: 'flex-end', background:'blue'}} type="button" value="Actualizar" />
      <input onClick={handleDelete} style={{alignSelf: 'flex-end', background: 'red'}} type="button" value="Borrar" />
    </div>
    <div>
      {
        !disabled && <input type="button" value="Guardar"/>
      }  
    </div>    
    </>
  )
}

function SectionModifyProducts(){
  const [listProducts, setListProducts] = useState([])
  const [refresh, setIsRefresh] = useState('')
  useEffect(()=>{
    fetch('http://localhost:3000/api/getAllProducts')
    .then((data)=>data.json())
    .then((data)=>{setListProducts(data)})
  }, [refresh])
  return(
    <div>
      {
        listProducts.map((productObj)=>{
          return <InputsModifyOnlyOneProduct refresh={refresh} setRefresh={setIsRefresh} key={productObj.id_product} objConfig={productObj} />
        })
      }
      {/* <input type="button" value="Add product"/> */}
    <SecundaryDataSection/>
    </div>
  )
}
export default SectionModifyProducts