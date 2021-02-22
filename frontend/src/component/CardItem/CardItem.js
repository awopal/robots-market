import FormatDigit from '../common/FormatDigit'
import { format } from 'date-fns'

import './CardItem.css'

const CardItem = ({ onClick, data, index }) => {
  return (
    <div className="card-item" onClick={() => onClick(index)}>
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
        <div className="price">
          {`${FormatDigit(data.price)}$`}
        </div>
      </div>
    </div>
  )
}

export default CardItem