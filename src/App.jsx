import { useState } from 'react'
import './App.css'
import Tasks from './Components/Tasks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Tasks/>
    </>
  )
}

export default App
