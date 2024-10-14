function createDescription(description, color){
  let string
  if(typeof color === 'string'){
    string = `${description}. Color: ${color}`    
    return string
  }else if(typeof color === 'object'){
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