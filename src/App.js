import { useState } from "react"
import Chute from "./components/Chute"
import Jogo from "./components/Jogo"
import Letras from "./components/Letras"
import alfabeto from "./alfabeto"

export default function App() {
  const [desabilitarInput, setDesabilitarInput] = useState(true)  // desabilitar input
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)      // letras que ficarão desabilitadas
  const [erros, setErros] = useState(0)                           // quantidade de erros cometidos

  function iniciarJogo() {
    setDesabilitarInput(false)
    setLetrasUsadas([])
  }

  return (
    <div className="container-tela">
      <Jogo iniciarJogo={iniciarJogo} erros={erros}/>
      <Letras letrasUsadas={letrasUsadas}/>
      <Chute desabilitarInput={desabilitarInput}/>
    </div>
  )
}