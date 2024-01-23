import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDlLfzbweRdyC9dVlPWEIUH_RCCGxQUrUU";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

var history = {}
var infoTextArea = document.getElementById("area_texto_informacion")
var chat_Input = document.querySelector("#chat_registro");
var guardarButton = document.getElementById("guardar_info");

var informacion_producto = ""
actualizar_informacion()


function actualizar_informacion() {
  informacion_producto = infoTextArea.value
  
  history = {
    history: [
      {
        role: "user",
        parts: `Hola, a continuación te voy a mostrar la información de un producto, cuando yo te haga una consulta, sólo me responderás en base a la información que te haya proporcionado. En caso de que no esté esa información en el texto. Me responderás, Lo siento, no tengo esa información, nada más que ese texto pondrás si no está la información. Aquí te dejo la información: ${informacion_producto}`,
      },
      {
        role: "model",
        parts: "Ok, entonces contestaré todas tus dudas respecto a ese producto en base a a la información que me proporcionaste",
      },
      {
        role: "user",
        parts: "¿Cómo es la cámara del Iphone 8",
      },
      {
        role: "model",
        parts: "Lo siento, no tengo esa información",
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  }
}

// Guardar información del campo de texto
guardarButton.addEventListener("click", async () => {
  actualizar_informacion()
  chat_Input.innerHTML = ""
});


// Establecer pregunta a IA y recibe respuesta de la lista del chat completo
export async function preguntar_IA(mensaje) {

  const chat = model.startChat(history);

  var objeto_usuario = { role: "user", parts: `${mensaje}` }
  history.history.push(objeto_usuario)
  
  const result = await chat.sendMessage(mensaje);
  const response = await result.response;
  const text = response.text();

  var objeto_model = { role: "model", parts: `${text}` }
  history.history.push(objeto_model)

  var lista_chat = history.history.slice(4);

  return lista_chat;
}






