import * as React from 'react';
import Cart from "./component/Cart/Cart"
import CardItem from './component/CardItem/CardItem'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Filter from './component/Filter/Filter'

import "./App.css"

const initPaginate = {
  offset: 0,
  data: [],
  perPage: 8,
  currentPage: 1
}

const materialList = [
  "Metal",
  "Concrete",
  "Rubber",
  "Frozen",
  "Plastic",
  "Wooden",
  "Cotton",
  "Granite",
  "Steel",
  "Soft",
  "Fresh",
]

const App = () => {
  const [paginate, setPaginate] = React.useState(initPaginate)
  const [pageCount, setPageCount] = React.useState()
  const [robotsList, setRobotsList] = React.useState([])
  const [selectedItems, setSelectedItems] = React.useState([])
  const [materialSelected, setMaterialSelected] = React.useState("")

  const filterOptions = materialList

  const handleOnClick = (data) => {
    setSelectedItems(prevState => [...prevState, data])
  }

  const getRobots = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/robots'
    })
      .then(response => {
        let data = response.data.data
        if (materialSelected !== "") {
          data = data.filter((d) => { return d.material === materialSelected })
        }

        const robots = data.slice(paginate.offset, paginate.offset + paginate.perPage)
        const lists = robots.map((robot, i) => <CardItem data={robot} index={i} onClick={(data) => handleOnClick(data)} />)

        setPageCount(Math.ceil(data.length / paginate.perPage))
        setRobotsList(lists)
      })
      .catch(err => {
        console.error(err)
      })
  }

  React.useEffect(() => {
    getRobots()
  }, [paginate, materialSelected])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * paginate.perPage;

    setPaginate({
      ...paginate, currentPage: selectedPage, offset: offset
    })

  };

  return (
    <div className="App">
      <header>Robot Market</header>
      <div>
        <div className="container">
          <div>
            <div className="box-header">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
              <Filter options={filterOptions} onSelected={(item) => setMaterialSelected(item)} />
            </div>
            <div className="box">
              {robotsList}
            </div>
          </div>
          <Cart items={selectedItems} />
        </div>
      </div>
    </div>
  );
}

export default App;
