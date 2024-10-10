import { useEffect } from "react"
import { useState } from "react"

function BasicInput({value, label}){
  const [inputValue, setInputValue] = useState(value)
  function handleChange(e){
    setInputValue(e.target.value)
  }
  return (
    <div>
      <label htmlFor={label} style={{display:'block'}}>{label}</label>
      <input disabled type="text" onChange={handleChange} value={inputValue} id={label}></input>
    </div>
  )
}

function InputsModifyOnlyOneProduct({objConfig}){
  return (
    <>
    <div style={{display: 'flex', marginTop: '40px'}}>
      {<BasicInput value={objConfig.type_product_name} label="Tipo de producto" />}
      {<BasicInput value={objConfig.description} label="Descripcion"/>}
      {<BasicInput value={objConfig.price} label="Precio"/>}
      <input style={{alignSelf: 'flex-end'}} type="button" value="Actualizar" />
      <input style={{alignSelf: 'flex-end'}} type="button" value="Borrar" />
    </div>
    <input type="button" value="Guardar"/>
    </>
  )
}

function SectionModifyProducts(){
  const [listProducts, setListProducts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/api/getAllProducts')
    .then((data)=>data.json())
    .then((data)=>{setListProducts(data); console.log(data)})
  }, [])
  return(
    <div>
      {
        listProducts.map((productObj)=>{
          return <InputsModifyOnlyOneProduct key={productObj.id_product} objConfig={productObj} />
        })
      }
    </div>
  )
}
export default SectionModifyProducts