
import { useContext } from 'react';
import CartItem from './CartItem';
import CartContext from '../store/CartContext';
import ProgressContext from '../store/ProgressContext';
import Modal from '../Layout/Modal';
import Button from '../Layout/Button';
import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
function Cart() {
  const userData = JSON.parse(sessionStorage.getItem('accountDetails'))
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig);

  function handleCloseCart() {
    progressCtx.hideCart();
  }
  function handleFinish() {
    progressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          userId: userData['id']
        },
      })
    );
  }
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  let actions = (
    <>
      <Button type="button" onClick={handleCloseCart}>
        Close
      </Button>
      <Button onClick={handleSubmit}>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progressCtx.progress === 'cart'}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="cart"
      open={progressCtx.progress === 'cart'}
      onClose={progressCtx.progress === 'cart' ? handleCloseCart : null}
    >
      <div className="Cart">
        <div>
          Cart Page
        </div>
        <ul>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.itemId}
              name={item.name}
              price={item.price}
              onDecrease={() => cartCtx.removeItem(item['itemId'])}
            />
          ))}
        </ul>
      </div>
      <p className="cart-total">Cart Total: {cartTotal}</p>
      {/* <Button onClick={handleCloseCart}>
        Close
      </Button>
      <Button onClick={handleSubmit}>
        Place Order
      </Button> */}

      {error && <Error title="Failed to submit order" message={error} />}

      <p className="modal-actions">{actions}</p>
    </Modal>
  )
}

export default Cart