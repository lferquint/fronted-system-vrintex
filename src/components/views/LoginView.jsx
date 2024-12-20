import { useState } from "react"
import PricipalTitle from "../common/PrincipalTitle"
import FormBasic from "../common/FormBasic"
import InputLabelLeft from "../common/InputLabelLeft"
import InputSubmit from "../common/InputSubmit"

function LoginView(){
  const [responseStatus, setResponseStatus] = useState(undefined)
  function handleSubmit(e){
    e.preventDefault()
    const allInputs = Array.from(e.target)
    const userPass = allInputs.filter((element)=>{
      return element.type != 'submit'
    }).map((element)=>{ return element.value })
    const objCredentials = {
      username: userPass[0],
      password: userPass[1]
    }
    const objToSendJson = JSON.stringify(objCredentials)
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: objToSendJson,
      credentials: 'include'
    })
    .then((data)=>{setResponseStatus(data.status); handleTimeOut()})
    // .then((data2)=>{console.log(data2)})
    .catch((e)=> console.error(e))

  }
  function handleTimeOut(){
    setTimeout(()=>{ setResponseStatus(undefined) }, 3000)
  }
  return (
    <div className="loginViewContainer">
      <PricipalTitle text='Login root' />
      <FormBasic handleSubmit={handleSubmit}>
        <InputLabelLeft labelText="Username"/>
        <InputLabelLeft labelText="Password" typeInput="password"/>
        <InputSubmit text='Iniciar sesion'/>
      </FormBasic>
      <div>
        {
          responseStatus===200 && <p>Iniciaste sesion correctamente</p>
        }
        {
          (responseStatus !=200 && responseStatus!= undefined) && <p>Error al iniciar sesion</p>
        }
      </div>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="username"/>
        <label htmlFor="password">Password </label>
        <input type="password" name="password" id="password" placeholder="password"/>
        <input type="submit" />

      </form> */}
    </div>
  )
}
export default LoginView 
