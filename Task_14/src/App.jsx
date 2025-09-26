import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { students } from '../data'
import StudentsList from './StudentsList'
import OutStandingStudent from './OutStandingStudent'

function App() {

  const highestpoint = students.sort((a, b) => b.score - a.score)[0]
  return (
    <>
      <StudentsList students={students}/>
      <OutStandingStudent students={highestpoint}/>

    </>
  )
}

export default App
