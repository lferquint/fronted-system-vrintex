import '../assets/styles/ModalSuccessMessage.css'
import { useState } from 'react'
function ModalSuccessMessage(){
  const [opacity, setOpacity] = useState(0)
  setTimeout(()=>{setOpacity(1)}, 100)
  return(
    <div style={{opacity: opacity}} className='container_modal'>
      <div className='modal_success_message'>
        ✔ Operacion realizada correctamente
      </div>
    </div>
  )
}
export default ModalSuccessMessage