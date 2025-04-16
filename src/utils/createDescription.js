function createDescription(description, color){
  console.log("Que acaso esto no se ejecuta nunca?")
  let string
  if(color.length === 1){
    string = `${description}. Color: ${color}`    
    return string
  }else if(color.length > 1){
    let colors = '';
    color.forEach((e, i)=>{
        // console.log(i, color.length)
        if(i == color.length - 1){
          colors = colors + ' ' + e + '.' 
        }else{
          colors = colors + ' ' + e + ', ' 
        }
      })
    string = `${description}. Color a elegir: ${colors}`
    return string
  }
}
export default createDescription