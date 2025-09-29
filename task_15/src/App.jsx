import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GuessingGame from './GuessingGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GuessingGame/>
     
    </>
  )
}

export default App
