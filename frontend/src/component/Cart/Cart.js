import './Cart.css'
import ItemsList from './component/ItemsList'

const Cart = () => {
  const length = 3

  return (
    <div className="cart">
      <div className="header">{`Your Cart (${length})`}</div>
      <hr />
      <ItemsList length={length} />
      <ItemsList length={length} />
      <ItemsList length={length} />
      <ItemsList length={length} />
      <div className="total">
        <div className="font-secondary">Total Price</div>
        <div>1000000$</div>
      </div>
    </div>
  )
}

export default Cart