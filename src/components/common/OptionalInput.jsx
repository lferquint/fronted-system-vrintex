import { useState } from "react"
import '../../assets/styles/common/OptionalInput.css'

function OptionalInput({defaultValue}){
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
        <div className="optionalInput">
            <input placeholder={inputValue} className="additional_info_input condition" disabled={disabled} onChange={handleChange} value={disabled ? '' : inputValue } type="text"></input>
            <input className="disabled_button" style={{background: disabled ? 'green' : 'var(--principal-color)', color: 'var(--font-color-theme-dark)'}} type="button" value={disabled ? 'activar' : 'desactivar'} onClick={handleClick}></input>
        </div>
      </>
  
  )
}
export default OptionalInput