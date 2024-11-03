import { useState } from "react"
import { useEffect } from "react"
import FormModifyOneProduct from "./componentsModifyDataProducts/FormModifyOneProduct"
import ModalSuccessMessage from "../common/ModalSuccessMessage"
import PricipalTitle from "../common/PrincipalTitle"

function SectionModifyDataProducts(){
  const [listProducts, setListProducts] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:3000/api/getAllProducts')
    .then((res)=>res.json())
    .then((data)=>{ setListProducts(data) })
  }, [refresh])
  return (
    <>
    <PricipalTitle text='Lista de productos a modificar'/>
      {
        success ? <ModalSuccessMessage/> : ''
      }
      {
        listProducts.map((product)=>{
          return (
            <FormModifyOneProduct 
              key={product.id_product} 
              nameModel={product.name_model} 
              price={product.price} 
              stock={product.stock}
              description={product.description}
              color={product.color_name}
              idProduct={product.id_product}
              setRefresh={setRefresh}
              refresh={refresh}
              setSuccess={setSuccess}
              typeProduct={product.type_product_name}
            />
          )
        })
      }
    </>
  )
}
export default SectionModifyDataProducts