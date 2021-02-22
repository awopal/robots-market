import './CardItem.css'

const CardItem = ({ onClick }) => {
  return (
    <div className="card-item" onClick={() => onClick()}>
      <div className="image">
        <img src="robot.png" alt="robot" width="40" height="40" />
      </div>
      <div>
        <div className="name">Nameeee</div>
        <div className="details">Stock: 10</div>
        <div className="details">Created At: Japan</div>
        <div className="details">Material: Solid</div>
        <div className="price">3000฿</div>
      </div>
    </div>
  )
}

export default CardItem