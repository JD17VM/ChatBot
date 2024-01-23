import { preguntar_IA } from './chat_ia.js';

const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send");

var chatInput = document.querySelector("#chat_registro");

sendButton.addEventListener("click", async () => {
  const message = userInput.value;

  const historial_mensajes = await preguntar_IA(message)

  console.log(historial_mensajes)
  visualizacion_mensajes(historial_mensajes)
  document.getElementById('user-input').value = '';

});


function visualizacion_mensajes(lista_de_objetos){
  var chat_completo = ""
  for (let i = 0; i < lista_de_objetos.length; i++){
    if(lista_de_objetos[i].role == "user"){
      var texto = `<div class="message incoming">${lista_de_objetos[i].parts}</div>`
    }else if(lista_de_objetos[i].role == "model"){
      var texto = `<div class="message">${lista_de_objetos[i].parts}</div>`
    }
    chat_completo = chat_completo + texto
  }
  chatInput.innerHTML = chat_completo
}