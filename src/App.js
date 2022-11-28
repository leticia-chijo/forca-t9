import { useState } from "react"
import Chute from "./components/Chute"
import Jogo from "./components/Jogo"
import Letras from "./components/Letras"
import alfabeto from "./alfabeto"
import palavras from "./palavras"

export default function App() {
  const [desabilitarInput, setDesabilitarInput] = useState(true)  // desabilitar input
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)      // letras que ficarão desabilitadas
  const [erros, setErros] = useState(0)                           // quantidade de erros cometidos
  const [palavraJogo, setPalavraJogo] = useState([])              // palavra que está sendo adivinhada
  const [palavraEscolhida, setPalavraEscolhida] = useState([])    // palavra que foi sorteada

  function iniciarJogo() {
    sortearPalavra()
    setDesabilitarInput(false)
    setLetrasUsadas([])
  }

  function sortearPalavra() {
    const i = Math.floor(Math.random() * palavras.length)
    const palavra = palavras[i]
    const palavraArray = palavra.split("")
    setPalavraEscolhida(palavraArray)
    console.log(palavra)

    let tracinhos = []
    palavraArray.forEach(() => tracinhos.push(" _"))
    setPalavraJogo(tracinhos)
  }

  function clicarLetra(letraClicada) {
    setLetrasUsadas([...letrasUsadas, letraClicada])
    if (palavraEscolhida.includes(letraClicada)) {
      acertouLetra(letraClicada)
    } else {
      errouLetra(letraClicada)
    }
  }

  function acertouLetra(letraClicada) {
    const novaPalavraJogo = [...palavraJogo]

    palavraEscolhida.forEach((letraEscolhida, i) => {
      if (palavraEscolhida[i] === letraClicada) {
        novaPalavraJogo[i] = letraEscolhida
      }
    })
    setPalavraJogo(novaPalavraJogo)

    // ganhar

  }

  function errouLetra(letraClicada) {
    console.log("Errou")
  }

  return (
    <div className="container-tela">
      <Jogo iniciarJogo={iniciarJogo} erros={erros} palavraJogo={palavraJogo} />
      <Letras letrasUsadas={letrasUsadas} clicarLetra={clicarLetra} />
      <Chute desabilitarInput={desabilitarInput} />
    </div>
  )
}