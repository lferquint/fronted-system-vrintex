import '../../assets/styles/common/ButtonBasic.css'

function ButtonBasic({text, onClick}){
  return <input onClick={onClick} type="button" className="buttonBasic" value={text}/>
}
export default ButtonBasic