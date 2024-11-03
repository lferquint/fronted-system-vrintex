import '../../assets/styles/common/InputLabelLeft.css'
import { useState } from 'react'

function InputLabelLeft({ labelText='input', typeInput='text', disabled=false, content}){
    const [value, setValue] = useState(content)
    function handleChange(e){
        setValue(e.target.value)
    }
    return(
        //container input
        <div className='container_input_label_left'>
            
            <label htmlFor={labelText}>{labelText}</label>

            {/* input */}
            <input 
                onChange={handleChange}
                style={ disabled ? {color: 'gray'}: {color: 'white'}} 
                value={value} 
                disabled={disabled} 
                className='input_label_left' 
                required 
                type={typeInput} 
                name={labelText} 
                id={labelText} 
                placeholder={labelText}/>
        </div>
    )

}
export default InputLabelLeft