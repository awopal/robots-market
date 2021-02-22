import "./Filter.css"

const Filter = ({ options = [], onSelected }) => {
  const handleOnChange = () => {
    var selected = document.getElementById("mySelect").value;
    onSelected(selected)
  }

  return (
    <div className="box-filter">
      <select id="mySelect" className="custom-select" onChange={() => handleOnChange()}>
        <option value="">Find By Material...</option>
        {options.map((item) => { return (<option value={item}>{item}</option>) })}
      </select>
    </div >

  )
}

export default Filter