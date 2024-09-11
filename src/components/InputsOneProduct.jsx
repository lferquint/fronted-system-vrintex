import { useEffect, useState } from "react"

function InputsOneProduct(){
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState('')
    const [brands, setBrands] = useState()
    const [brandSelected, setBrandSelected] = useState('')
    const [colors, setColors] = useState()
    const [colorSelected, setColorSelected] = useState('')
    const [missingInformation, setMissingInformation] = useState()
    function handleSelectTypeProduct(e){
        setProductSelected(e.target.value)
    }
    function handleSelectBrandProduct(e){
        setBrandSelected(e.target.value)
    }
    useEffect(()=>{  
        fetch('http://localhost:3000/api/getTypeProduct').then((data)=>{return data.json()}).then((data2)=>{ setProducts(data2); setProductSelected(data2[0].id_type_product)})
    }, [])
    useEffect(()=>{  
        if(productSelected){
            fetch(`http://localhost:3000/api/getModels/${productSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setBrands(data2); setBrandSelected(data2[0].id_model) })
        }
    }, [productSelected])
    useEffect(()=>{  
        if(brandSelected){
            fetch(`http://localhost:3000/api/getColorsProduct/${brandSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setColors(data2); setColorSelected(data2[0].color_name) })
        }
    }, [brandSelected])
    useEffect(()=>{
        if(colorSelected && brandSelected){
            fetch(`http://localhost:3000/api/infoAboutProduct/${brandSelected}/${colorSelected}`).then(data => data.json()).then(data2 =>{ console.log(colorSelected, brandSelected); if(data2[0].price){setMissingInformation(data2)} })
        }
    }, [colorSelected, brandSelected])

    return (
        <div>
            <select name="typeProduct" onChange={handleSelectTypeProduct}>
                { products.map((element)=>{return <option key={element.id_type_product} value={element.id_type_product}> {element.type_product_name} </option>}) }
            </select>
            <select name="modelProduct" onChange={handleSelectBrandProduct}>
                {
                    brands && brands.map((objModel)=>{return <option key={objModel.id_model} value={objModel.id_model}> {objModel.name_model} </option>})
                }
            </select>            
            <select name="ColorProduct">
                {
                    colors && colors.map((objColor)=>{ return <option key={objColor.id_color} value={objColor.id_color}> {objColor.color_name} </option>})
                }
            </select>
            <input required type="text" placeholder="cantidad" />
            <input name="price" type="hidden" value={missingInformation && missingInformation[0].price} />
            <input name="description" type="hidden" value={missingInformation && missingInformation[0].description} />
            <input type="button" value="Borrar producto"/>
        </div>
    )
}
export default InputsOneProduct