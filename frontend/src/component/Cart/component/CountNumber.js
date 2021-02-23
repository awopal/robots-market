const CountNumber = ({ count, onAdd, onRemove }) => {
  return (
    <div className="count-box">
      <div className="btn" onClick={() => onRemove()}><img src="remove.png" alt="remove" width="15" height="15" /></div>
      <div className="count">{count}</div>
      <div className="btn" onClick={() => onAdd()}><img src="add.png" alt="remove" width="15" height="15" /></div>
    </div>
  )
}

export default CountNumber