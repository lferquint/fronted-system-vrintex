import { useState } from "react"
import '../assets/styles/inputConditions.css'

function InputConditions ({ defaultValue }){

    const [inputValue, setInputValue] = useState(defaultValue)
    const [disabled, setDisabled] = useState(false)

    function handleChange(e){
        setInputValue(e.target.value)
    }
    function handleClick(){
        setDisabled(!disabled)
    }

    return (
        <>
            <div className="condition">
                <input placeholder={inputValue} className="additional_info_input" disabled={disabled} onChange={handleChange} value={disabled ? '' : inputValue } type="text"></input>
                <input className="disabled_button" style={{background: disabled ? 'green' : '#ff1858', color: 'white'}} type="button" value={disabled ? 'activar' : 'desactivar'} onClick={handleClick}></input>
            </div>
        </>
    
    )
}
export default InputConditions