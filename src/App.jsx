// import LoginView from "./components/LoginView"
import { useState } from "react"
import Header from "./components/header"
import LoginView from "./components/views/LoginView"
import PdfView from "./components/views/PdfView"
import HomeView from "./components/views/HomeView"
import ChangeRegistersView from "./components/views/ChangeRegistersView"

function App() {
  const [pageFocus, setPageFocus] = useState('Home')
  const pages = {
    Home: <HomeView/>,
    Login: <LoginView/>,
    Cotizador: <PdfView/>,
    Modificar_registros: <ChangeRegistersView/>
  }

  const keys = Object.keys(pages)
  // let keysPages ={}
  // keys.forEach((element)=>{ keysPages[element] = element})
  // console.log('keys pages:', keysPages)

  return (
  <>
      <Header keysPages={keys} setPageFocus={setPageFocus} />
      {
        pages[pageFocus]
      }
  </>
)
}

export default App
