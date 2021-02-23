import FormatDigit from '../common/FormatDigit'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import './CardItem.css'

const CardItem = ({ onClick, data, soldOutList }) => {
  const [isSoldOutActive, setIsSoldOutActive] = useState(false)

  useEffect(() => {
    const soldout = soldOutList.some(i => { return i.id === data.id })
    setIsSoldOutActive(soldout)
  }, [soldOutList])

  return (
    <div className="group">
      <div className="card-item">
        <div className="image">
          <img src={data.image} alt="robot" width="150" height="150" />
        </div>
        <div>
          <div className="name">{data.name}</div>
          <div className="details">
            Created At:
          <div className="font-weight">{`${format(new Date(data.createdAt), 'dd-MM-yyyy')}`}</div>
          </div>
          <div className="details">
            Material:
          <div className="font-weight">{data.material}</div>
          </div>
          <div className="details">
            Stock:
          <div className="font-weight">{data.stock}</div>
          </div>
        </div>
      </div>
      {
        isSoldOutActive ?
          <div className="soldout">
            <div className="price">
              <div className="section">
                {`฿${FormatDigit(data.price)}`}
              </div>
            </div>
          </div>
          :
          <div className="add-to-cart" onClick={() => onClick(data)}>
            <div className="price">
              <div className="section">
                {`฿${FormatDigit(data.price)}`}
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default CardItem