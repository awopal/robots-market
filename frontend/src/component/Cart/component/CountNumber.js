const CountNumber = ({ length }) => {
  return (
    <div className="count-box">
      <div className="btn"><img src="remove.png" alt="remove" width="15" height="15" /></div>
      <div className="count">{length}</div>
      <div className="btn"><img src="add.png" alt="remove" width="15" height="15" /></div>
    </div>
  )
}

export default CountNumber