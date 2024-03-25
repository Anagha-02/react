import { useContext, useState } from 'react';
import CartContext from '../store/CartContext';
import Button from '../Layout/Button.jsx';
import ItemDetails from './ItemDetails.jsx';
import ProgressContext from '../store/ProgressContext.jsx';

function AvailableItem({ item }) {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(ProgressContext)
  const [isDetail, setIsDetail] = useState(false);

  function handleMoreDetails() {
    // setIsDetail(true)
    cartCtx.itemDetail(item);
    progressCtx.showDetails('detail');
    setIsDetail(true)
  }

  function handleAddItemToCart() {
    cartCtx.addItem(item);
  }

  return (
    <>
    {/* { isDetail && <ItemDetails item={item} />} */}
    <li className="item">
      <article>
        <img src={`./src/assests/${item['imageValue']}`} alt={item['name']} className='productImg'/>
        <div>
          <h3>{item['name']}</h3>
          <p className="item-price">
            {item['price']}
          </p>
        </div>
        <p className="item-actions">
          {/* <Button onClick={handleMoreDetails}>More Details</Button>           */}
          <Button onClick={handleAddItemToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
    </>
    
  );
}

export default AvailableItem