import { useState } from "react"
import Header from "./components/layout/Header"
import LoginView from "./components/views/LoginView"
import PdfView from "./components/views/PdfView"
import HomeView from "./components/views/HomeView"
import ChangeRegistersView from "./components/views/ChangeRegistersView"
import PrincipalContainer from './components/layout/PricipalContainer'

function App() {

  // States
  const [pageFocus, setPageFocus] = useState('Home')

  // Obj with all views/pages
  const pages = {
    Home: <HomeView/>,
    Login: <LoginView/>,
    Cotizador: <PdfView/>,
    Modificar_registros: <ChangeRegistersView/>
  }

  // Object Keys, needed to show the text of the header buttons
  const keys = Object.keys(pages)

  return (
    <>
      <Header keysPages={keys} setPageFocus={setPageFocus} />
      <PrincipalContainer>
        {
          // Showing page focus
          pages[pageFocus]
        }
      </PrincipalContainer>
    </>
  )
}

export default App
