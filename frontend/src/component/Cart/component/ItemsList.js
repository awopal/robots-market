import CountNumber from './CountNumber'

const ItemsList = ({ length }) => {
  return (
    <>
      <div className="row">
        <div className="image-cart">
          <img src="robot.png" alt="robot" width="30" height="30" />
        </div>
        <div>
          <div className="name-bot">หุ่นยนต์เดินได้นะ</div>
          <div className="count-box">
            <CountNumber length={length} />
            <div className="text-price">30000$</div>
            <img className="remove" src="close.png" alt="remove" width="20" height="20" />
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default ItemsList