boton=document.getElementById('boton')
function leer() { 

}
let producto={

}
const name= document.getElementById('name')
const precio=document.getElementById('precio')
const url=document.getElementById('url')
    name.addEventListener('change', updateValue);
  

    function updateValue(e) {
        name.value=e.target.value
      producto.name=name.value

      precio.value=e.target.value
      producto.precio=precio.value

      url.value=e.target.value
      producto.url=url.value
    }
boton.addEventListener('click',()=>{
    console.log(producto)
})
