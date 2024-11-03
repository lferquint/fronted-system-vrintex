import '../../assets/styles/layout/NavBar.css'
function NavBar({elements, onClick}){
    return (
        <nav className="NavBar">
            <ul>
                {
                    elements.map((element)=>{
                        return <li key={element}><a href="#" onClick={()=>{ onClick(element) }}>{element}</a></li>
                    })
                }
            </ul>
        </nav>
    )
}
export default NavBar