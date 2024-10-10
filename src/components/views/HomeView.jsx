import myImage from '../../assets/img/nuevo-logo-vrintex-6.png'
function HomeView(){
  return(
    <>
      <img src={myImage} style={{width: '350px', margin: '0 auto', display: 'block', marginTop:'290px'}}/>
      <h2 style={{textAlign: 'center', marginTop:'25px'}}> Sistema de gestion empresarial VRINTEX </h2>
    </>
  )
}
export default HomeView