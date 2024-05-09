import { useState } from 'react'
import './App.css'
import Sidebar from './containers/Sidebar'
import Board from './containers/Board'
import Header from './containers/Header'

export default function App() {

  return (
    <div className="App">
      <Header />

      <Board />
    </div>
  )
}