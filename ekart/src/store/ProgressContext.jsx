import { createContext, useState } from 'react';

const 
ProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showLogin: () => {},
  hideLogin: () => {},
  showDetails: () => {},
  hideDetails: () => {},
  showOrders: () => {},
  hideOrders: () => {},
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function ProgressContextProvider({ children }) {  
  const userData = JSON.parse(sessionStorage.getItem('accountDetails'))
  const [progress, setProgress] = userData ? useState('') : useState('login');
  
  function showLogin() {
      setProgress('login');
  }

  function hideLogin() {
    setProgress('');
  }
  
  function showCart() {
    setProgress('cart');
  }
  
  function showOrders() {
    setProgress('orders');
  }

  function hideOrders() {
    setProgress('');
  }

  
  function showDetails() {
    setProgress('detail');
  }

  function hideDetails() {
    setProgress('');
  }


  function hideCart() {
    setProgress('');
  }

  function showCheckout() {
    setProgress('checkout');
  }

  function hideCheckout() {
    setProgress('');
  }

  const progressCtx = {
    progress: progress,
    showLogin,
    hideLogin,
    showDetails,
    hideDetails,
    showOrders,
    hideOrders,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressContext;