import CountNumber from './CountNumber'
import FormatDigit from '../../common/FormatDigit'
import { useEffect, useState } from 'react'

const ItemsList = ({ item, onRemove, onAdd, removeOutOfList, toggleTotalChange }) => {
  const [amount, setAmount] = useState(item.price)

  useEffect(() => {
    const count = item.price * item.selected
    setAmount(count)
    toggleTotalChange(count)
  }, [item])


  return (
    <>
      <div className="row">
        <div className="image-cart">
          <img src={item.image} alt="robot" width="60" height="60" />
        </div>
        <div>
          <div className="name-bot">{item.name}</div>
          <div className="count-box">
            <CountNumber
              count={item.selected}
              onRemove={() => onRemove()}
              onAdd={() => onAdd()}
            />
            <div className="text-price">{`฿${FormatDigit(amount)}`}</div>
            <img onClick={() => removeOutOfList()} className="remove" src="close.png" alt="remove" width="20" height="20" />
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default ItemsList