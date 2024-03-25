import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { ProgressContextProvider } from './store/ProgressContext';
import { CartContextProvider } from './store/CartContext';
import ItemsList from './components/ItemList';
import AvailableItem from './components/AvailableItem';
import Cart from './components/Cart';
import AppAuth from './components/AppAuth';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProgressContextProvider>
      <CartContextProvider>
        <Header />
        <AppAuth />
        <ItemsList />
        <Cart />
      </CartContextProvider>
    </ProgressContextProvider>
  )
}

export default App
