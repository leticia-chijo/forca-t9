import { useState } from "react"
import Chute from "./components/Chute"
import Jogo from "./components/Jogo"
import Letras from "./components/Letras"
import alfabeto from "./alfabeto"
import palavras from "./palavras"
import styled from "styled-components"

export default function App() {
  const [desabilitarInput, setDesabilitarInput] = useState(true)  // desabilitar input
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)      // letras que ficarão desabilitadas
  const [erros, setErros] = useState(0)                           // quantidade de erros cometidos
  const [palavraJogo, setPalavraJogo] = useState([])              // palavra que está sendo adivinhada
  const [palavraEscolhida, setPalavraEscolhida] = useState([])    // palavra que foi sorteada
  const [corPalavra, setCorPalavra] = useState("preto")           // cor que a palavra aparece na tela
  const [chute, setChute] = useState("")                          // input controlado do chute

  function iniciarJogo() {
    sortearPalavra()
    setDesabilitarInput(false)
    setLetrasUsadas([])
    setErros(0)
    setCorPalavra("preto")
    setChute("")
  }

  function sortearPalavra() {
    const i = Math.floor(Math.random() * palavras.length)
    const palavra = palavras[i]
    const palavraArray = palavra.split("")
    setPalavraEscolhida(palavraArray)

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

    // verificar se ganhou
    if (!novaPalavraJogo.includes(" _")) {
      setCorPalavra("verde")
      finalizarJogo()
    }

  }

  function errouLetra(letraClicada) {
    const novosErros = erros + 1
    setErros(novosErros)

    // perdeu
    if (novosErros === 6) {
      setCorPalavra("vermelho")
      finalizarJogo()
    }
  }

  function finalizarJogo() {
    setLetrasUsadas(alfabeto)
    setDesabilitarInput(true)
    setPalavraJogo(palavraEscolhida)
  }

  function chutarPalavraInteira() {
    // palavra escolhida => array
    // palavra do input => string

    let palavraEscolhidaString = ""
    palavraEscolhida.forEach(letra => palavraEscolhidaString += letra)

    if (chute === palavraEscolhidaString) {
      // ganhou
      setCorPalavra("verde")
    } else {
      // perdeu
      setCorPalavra("vermelho")
      setErros(6)
      alert("Você errou o chute e por isso perdeu :(")
    }
    finalizarJogo()
  }

  return (
    <ContainerTela>
      <Jogo
        iniciarJogo={iniciarJogo}
        erros={erros}
        palavraJogo={palavraJogo}
        corPalavra={corPalavra}
      />
      <Letras
        letrasUsadas={letrasUsadas}
        clicarLetra={clicarLetra}
      />
      <Chute
        desabilitarInput={desabilitarInput}
        chute={chute}
        setChute={setChute}
        chutarPalavraInteira={chutarPalavraInteira}
      />
    </ContainerTela>
  )
}

const ContainerTela = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`