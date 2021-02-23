import ItemsList from './component/ItemsList'
import FormatDigit from '../common/FormatDigit'
import { useEffect, useState } from 'react'

import './Cart.css'

const Cart = ({ items = [], onAdd, onRemove, removeOutOfList }) => {
  const [total, setTotal] = useState(0)

  const toggleTotalChange = (amount) => {
    setTotal(prevState => {
      return prevState + amount
    })
  }

  useEffect(() => {
    const test = items.map(item => {
      return item.price * item.selected
    })
    setTotal(test.reduce((a, b) => a + b, 0))
  }, [items])

  return (
    <div className="cart">
      <div className="header">{`Your Cart (${items.length})`}</div>
      <hr />
      {items.length === 0 && <div className="padding">Please Select a Cute Robot...</div>}
      {items.map(item => {
        return <ItemsList
          item={item}
          onRemove={() => onRemove(item)}
          onAdd={() => onAdd(item)}
          removeOutOfList={() => removeOutOfList(item)}
          toggleTotalChange={(amount) => toggleTotalChange(amount)}
        />
      })}
      <div className="total">
        <div className="font-secondary">Total Price</div>
        <div>{`฿${FormatDigit(total)}`}</div>
      </div>
    </div>
  )
}

export default Cart