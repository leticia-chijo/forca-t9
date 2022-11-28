import { useState } from "react"
import Chute from "./components/Chute"
import Jogo from "./components/Jogo"
import Letras from "./components/Letras"
import alfabeto from "./alfabeto"

export default function App() {
  const [desabilitarInput, setDesabilitarInput] = useState(true)  // desabilitar input
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)      // letras que o usuário já usou

  return (
    <div className="container-tela">
      <Jogo />
      <Letras letrasUsadas={letrasUsadas}/>
      <Chute desabilitarInput={desabilitarInput}/>
    </div>
  )
}