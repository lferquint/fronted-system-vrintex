import '../../assets/styles/common/InputLabelLeft.css'

function InputLabelLeft({ labelText='input', typeInput='text'}){
    return(
        //container input
        <div className='container_input_label_left'>
            
            <label htmlFor={labelText}>{labelText}</label>

            {/* input */}
            <input className='input_label_left' required type={typeInput} name={labelText} id={labelText} placeholder={labelText}/>
        </div>
    )

}
export default InputLabelLeft