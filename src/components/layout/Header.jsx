import '../../assets/styles/layout/Header.css'
function Header({keysPages, setPageFocus}){
  function handleNavigate(newPage){
    setPageFocus(newPage)
  }
  return(
    <header>
      <nav>
        <ul>
            {
              keysPages.map((keyPage)=>{ 
                return (
                  <li key={keyPage} >
                    <a href="#" onClick={(e)=>{e.preventDefault(); handleNavigate(keyPage)}}>{keyPage}</a>
                  </li>
                ) 
              })
            }
        </ul>
      </nav>
    </header>
  )
}
export default Header