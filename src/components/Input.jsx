function Input({ labelText, typeInput='text'}){
    return(
        <div>
            <label style={{minWidth: '100px', display: 'inline-block'}} htmlFor={labelText}>{labelText}</label>
            <input required type={typeInput} name={labelText} id={labelText} placeholder={labelText}/>
        </div>
    )

}
export default Input