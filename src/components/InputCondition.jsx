import { useState } from "react"
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
        <div>
            <input placeholder={inputValue} className="condition additional_info_input" disabled={disabled} onChange={handleChange} value={disabled ? '' : inputValue } type="text"></input>
            <input style={{background: disabled ? 'green' : 'red', color: 'white'}} type="button" value={disabled ? 'activar' : 'desactivar'} onClick={handleClick}></input>
        </div>
    )
}
export default InputConditions