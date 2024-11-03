import '../../assets/styles/layout/FormBasic.css'
function FormBasic({children, handleSubmit}){
  return (
    <form className="FormBasic" onSubmit={handleSubmit} action="#">
      {children}
    </form>
  )
}
export default FormBasic