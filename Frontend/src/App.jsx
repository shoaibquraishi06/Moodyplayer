import { useState } from 'react'
import FacialExpression from "./components/FaceialExpresssion"
import './App.css'
import MoodSongs from './components/MoodSongs'


function App() {

const [Songs,setSongs] = useState([
 

])

  return (
    <>
      <FacialExpression  setSongs={setSongs}/>
      <MoodSongs Songs={Songs} />
    </>
  )
}

export default App
