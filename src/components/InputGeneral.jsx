import '../assets/styles/InputGeneral.css'
function Input({ labelText, typeInput='text'}){
    return(
        <div className='container_input_general'>
            <label style={{minWidth: '100px', display: 'inline-block'}} htmlFor={labelText}>{labelText}</label>
            <input className='input_general' required type={typeInput} name={labelText} id={labelText} placeholder={labelText}/>
        </div>
    )

}
export default Input