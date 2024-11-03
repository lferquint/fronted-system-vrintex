import { useState } from 'react'
import InputLabelLeft from '../../common/InputLabelLeft'
import InputSumbit from '../../common/InputSubmit'
import SectionGeneric from '../SectionGeneric'
import '../../../assets/styles/common/DeleteButton.css'
import TitleBasic from '../../common/TitleBasic'

function DeleteButton({onClick}){
    return <button className='DeleteButton' onClick={onClick}> Borrar producto </button>
}

function FormModifyOneProduct({typeProduct, nameModel, price, stock, description, color, idProduct, setRefresh, refresh, setSuccess}){
    const [id] = useState(idProduct)

    function handleTimeSuccessMessage(){
        setTimeout(()=>{ setSuccess(false) }, 4000)
    }
    function handleDelete(e){
        e.preventDefault()
        fetch(`http://localhost:3000/protected/deleteProduct/${id}`, {
            credentials: 'include',
            method: 'POST'
        }).then(()=>{setRefresh(!refresh); setSuccess(true); handleTimeSuccessMessage()})
    }
    function handleSubmit(e){
        e.preventDefault()
        const array = Array.from(e.target)
        const importantInputs = array.filter((value)=>{
            return value.id === 'Price' || value.id === 'Stock'
        })
        const values = importantInputs.map((input)=> input.value)
        const objToSend = { newPrice: values[0], newStock: values[1], idProduct: idProduct }
        const objJson = JSON.stringify(objToSend)

        fetch('http://localhost:3000/protected/modifyProduct', {
            method: 'POST',
            credentials: 'include',
            body: objJson,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(()=>{setSuccess(true); handleTimeSuccessMessage()})
    }

    return (
        <SectionGeneric>
            <TitleBasic text={typeProduct + ': ' + nameModel + ', ' + color}/>
            <form onSubmit={handleSubmit} style={{width: 'fit-content'}}>
                {/* <InputLabelLeft labelText='Modelo' disabled={true} content={nameModel}/> */}
                <InputLabelLeft labelText='Descripcion' disabled={true} content={description}/>
                <InputLabelLeft labelText='Precio' disabled={false} content={price}/>
                <InputLabelLeft labelText='Cantidad de Stock' disabled={false} content={stock}/>
                <InputSumbit text='Modificar'/>
                <DeleteButton onClick={handleDelete}/>
            </form>
        </SectionGeneric>

    )
}
export default FormModifyOneProduct