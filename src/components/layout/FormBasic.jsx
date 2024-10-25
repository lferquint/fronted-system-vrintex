function FormBasic({children, handleSubmit}){
  return (
    <form onSubmit={handleSubmit} action="#">
      {children}
    </form>
  )
}
export default FormBasic