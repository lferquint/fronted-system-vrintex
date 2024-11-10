import '../../assets/styles/common/InputWithoutLabel.css'
function InputWithoutLabel({placeholder, id}){
  return <input className='inputWithoutLabel' type="text" placeholder={placeholder} id={id} /> 
}
export default InputWithoutLabel