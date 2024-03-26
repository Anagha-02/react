import { Outlet, Link } from "react-router-dom";
import { useContext, useState } from 'react';
import cart from '../assests/cart.jpg';
import CartContext from '../store/CartContext.jsx'
import ProgressContext from '../store/ProgressContext.jsx';
import Button from '../Layout/Button.jsx';

function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);
  // const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem('accountDetails')))
  const userData = JSON.parse(sessionStorage.getItem('accountDetails'))
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  console.log(userData)
  function handleShowCart() {
    progressCtx.showCart();
  }

  function handleShowLogin() {
    progressCtx.showLogin('login')
  }

  function hideLogin() {
    progressCtx.hideLogin()
  }

  function handleLogout() {
    sessionStorage.removeItem('accountDetails')
    // setUserData([])
    progressCtx.showLogin('login')
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <h1>Ekart</h1>
        </div>
        <nav>
          {!userData && <Button onClick={handleShowLogin}> Login/Register </Button>}
          {
            userData && userData['name'] && hideLogin &&
            <div className="col-6">
              <span className="userName">Hello {userData['name']}</span>&nbsp;&nbsp;
              <Button textOnly onClick={handleShowCart}>
                <img src={cart} height="50px" width="50px" /> 
                {/* Cart */}
                <span className="cart-text">
                ({totalCartItems})
                </span>
                
              </Button> &nbsp;&nbsp;
              <Button onClick={handleLogout}>Logout</Button>
            </div>

          }

        </nav>
      </header>
    </>
  );
}

export default Header