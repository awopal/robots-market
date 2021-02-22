import * as React from 'react';
import Cart from "./component/Cart/Cart"
import CardItem from './component/CardItem/CardItem'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

import "./App.css"

const initPaginate = {
  offset: 0,
  data: [],
  perPage: 8,
  currentPage: 1
}

function App() {
  const [paginate, setPaginate] = React.useState(initPaginate)
  const [pageCount, setPageCount] = React.useState()
  const [robotsList, setRobotsList] = React.useState([])

  const onClick = () => {
    console.log("hi")
  }

  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/robots'
    })
      .then(response => {
        const data = response.data.data
        const robots = data.slice(paginate.offset, paginate.offset + paginate.perPage)
        console.log(robots)
        const lists = robots.map((robot, i) => <CardItem data={robot} index={i} onClick={() => onClick()} />)

        setPageCount(Math.ceil(data.length / paginate.perPage))
        setRobotsList(lists)
      })
      .catch(err => {
        console.error(err)
      })
  }, [paginate])

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
      <div className="container">
        <div className="box">
          {robotsList}
        </div>
        <Cart />
      </div>
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
    </div>
  );
}

export default App;
