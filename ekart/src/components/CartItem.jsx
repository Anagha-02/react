import Button from "../Layout/Button"

function CartItem({ name,
  price,
  onDecrease}) {
  return (
    <li className="cart-item">
      <span> <Button onClick={onDecrease}>-</Button> </span>
      <span> {name} </span>
      <span>  &#8377;&nbsp;{price} </span>
    </li>
  )
}

export default CartItem