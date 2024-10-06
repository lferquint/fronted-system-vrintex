import { useEffect, useState, useRef} from "react"
import '../assets/styles/InputsOneProduct.css'

function InputsOneProduct(){

/* -- States -- */

    // list products and product selected
    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState('')

    // list brands and brand selected
    const [brands, setBrands] = useState()
    const [brandSelected, setBrandSelected] = useState('')

    // list colors and color selected
    const [colors, setColors] = useState()
    const [colorSelected, setColorSelected] = useState('')

    //Price
    const [price, setPrice] = useState()

    // Aditional information about each product (price, description, etc)
    const [missingInformation, setMissingInformation] = useState()

    // Verify if first useEffect was completed
    const [firstRender, setFirstRender] = useState(false)

    // Prev states values
    const prevBrand = useRef()
    const prevColor = useRef()


/* -- Handlers -- */

    // On change type product selected
    function handleSelectTypeProduct(e){
        setProductSelected(e.target.value)
    }

    // On change brand selected
    function handleSelectBrandProduct(e){
        setBrandSelected(e.target.value)
    }

    // On change value of input price
    function handleChangePrice(e){
        setPrice(e.target.value)
    }

/* -- Effects -- */

    // Load initial info
    useEffect(()=>{

        // fetch information for first time
        if(!missingInformation){
            if(!productSelected){
                fetch('http://localhost:3000/api/getTypeProduct').then((data)=>{return data.json()}).then((data2)=>{ setProducts(data2); setProductSelected(data2[0].id_type_product)})
            }
            if(productSelected && !brandSelected){
                productSelected && fetch(`http://localhost:3000/api/getModels/${productSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setBrands(data2); setBrandSelected(data2[0].id_model); prevBrand.current = data2[0].id_model })
            }
            if( brandSelected && !colorSelected){
                brandSelected && fetch(`http://localhost:3000/api/getColorsProduct/${brandSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setColors(data2); setColorSelected(data2[0].color_name); prevColor.current = data2[0].color_name })
            }
            if( brandSelected && colorSelected){
                fetch(`http://localhost:3000/api/infoAboutProduct/${brandSelected}/${colorSelected}`)
                .then(data => data.json())
                .then(data2 =>{ 
                    if(data2[0].price){setMissingInformation(data2); setPrice(parseFloat(data2[0].price)) }
                })
                setFirstRender(true) 
            }
        }

    }, [productSelected, brandSelected, colorSelected, missingInformation])

    // handle change on inputs, fetch new data 
    useEffect(()=>{
        if(firstRender){
            fetch(`http://localhost:3000/api/getModels/${productSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setBrands(data2); setBrandSelected(data2[0].id_model); })
        }
    }, [productSelected, firstRender])
    useEffect(()=>{
        if(firstRender){

            fetch(`http://localhost:3000/api/getColorsProduct/${brandSelected}`).then((data)=>{return data.json()}).then((data2)=>{ setColors(data2); setColorSelected(data2[0].color_name); })
            
        }
    }, [brandSelected, firstRender])

    useEffect(()=>{
        if(firstRender){
            if(brandSelected != prevBrand.current && colorSelected != prevColor.current){
                fetch(`http://localhost:3000/api/infoAboutProduct/${brandSelected}/${colorSelected}`).then(data => data.json()).then(data2 =>{ 
                    if(data2[0].price){
                        setMissingInformation(data2)
                        setPrice(data2[0].price)
                    } 
                })
                prevBrand.current = brandSelected
                prevColor.current = colorSelected
            }
        }
    }, [brandSelected, colorSelected, firstRender])

    return (
        <div className="inputsOneProduct">
            <div className="inputContainer">
                Producto:
                <select name="typeProduct" onChange={handleSelectTypeProduct}>
                    { 
                        products.map((element)=>{return <option key={element.id_type_product} value={element.id_type_product}> {element.type_product_name} </option>}) 
                    }
                </select>
            </div>

            <div className="inputContainer">
                Modelo:
                <select name="modelProduct" onChange={handleSelectBrandProduct}>
                    {
                        brands && brands.map((objModel)=>{return <option key={objModel.id_model} value={objModel.id_model}> {objModel.name_model} </option>})
                    }
                </select>  
            </div>

            <div className="inputContainer">
                Color:
                <select name="ColorProduct">
                    {
                        colors && colors.map((objColor)=>{ return <option key={objColor.id_color} value={objColor.id_color}> {objColor.color_name} </option>})
                    }
                </select>
            </div>

            <div className="inputContainer">
                Cantidad:
                <input required type="text" placeholder="cantidad" />
            </div>
            <div className="inputContainer">
                Precio:
                <input name="price" onChange={handleChangePrice} value={price} />
            </div>

            <input name="description" type="hidden" value={missingInformation && missingInformation[0].description} />

            <input type="hidden" name="units" value={missingInformation && missingInformation[0].units}/>
            <div className="inputContainer">
                <input className="delete_product" type="button" value="Borrar producto"/>
            </div>

        </div>
    )
}
export default InputsOneProduct