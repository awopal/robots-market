import * as React from 'react';
import Cart from "./component/Cart/Cart"
import CardItem from './component/CardItem/CardItem'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Filter from './component/Filter/Filter'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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
  const [soldOutList, setSoldOutList] = React.useState([])

  const notify = () => {
    toast.error("Maximum 5 items")
  }

  const outOfStockNotify = (item) => {
    setSoldOutList(prevState => {
      return [...prevState, item]
    })
    toast.error("Out of Stock")
  }

  const handleOnClick = (data) => {
    setSelectedItems(prevState => {
      let newArray = [...prevState]
      const index = prevState.findIndex(i => { return (i.id === data.id) })

      if (newArray.length >= 5) {
        notify()
        return newArray
      }

      else if (index < 0) {
        return [...prevState, data]
      } else if (newArray[index].stock <= 1) {
        outOfStockNotify(newArray[index])
        return newArray
      } else {
        newArray[index] = { ...newArray[index], selected: newArray[index].selected + 1, stock: newArray[index].stock - 1 }
        return newArray
      }
    })
  }

  const removeItemOutOfList = (item) => {
    setSelectedItems(prevState => {
      const newState = prevState.filter(i => { return (i.id !== item.id) })
      return newState
    })
    setSoldOutList(prevState => {
      const newState = prevState.filter(i => { return (i.id !== item.id) })
      return newState
    })
  }

  const handleOnAdd = (item) => {
    setSelectedItems(prevState => {
      const index = prevState.findIndex(i => { return (i.id === item.id) })
      let newArray = [...prevState]
      if (newArray[index].stock <= 1) {
        outOfStockNotify(newArray[index])
        return newArray
      }
      newArray[index] = { ...newArray[index], selected: newArray[index].selected + 1, stock: newArray[index].stock - 1 }
      return newArray
    })
  }

  const handleOnRemove = (item) => {
    setSelectedItems(prevState => {
      const index = prevState.findIndex(i => { return (i.id === item.id) })
      let newArray = [...prevState]
      if (newArray[index].selected <= 1) {
        removeItemOutOfList(item)
        return newArray
      }
      newArray[index] = { ...newArray[index], selected: newArray[index].selected - 1, stock: newArray[index].stock + 1 }
      return newArray
    })
    setSoldOutList(prevState => {
      const newState = prevState.filter(i => { return (i.id !== item.id) })
      return newState
    })

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
        setRobotsList(robots)
        setPageCount(Math.ceil(data.length / paginate.perPage))
      })
      .catch(err => {
        console.error(err)
      })
  }

  React.useEffect(() => {
    getRobots()
  }, [paginate, materialSelected])

  const handlePageClick = (e) => {
    setSoldOutList([])
    const selectedPage = e.selected;
    const offset = selectedPage * paginate.perPage;
    setPaginate({
      ...paginate, currentPage: selectedPage, offset: offset
    })
  }

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
              <Filter options={materialList} onSelected={(item) => setMaterialSelected(item)} />
            </div>
            <div className="box">
              {robotsList.map(robot => {
                return <CardItem data={robot} soldOutList={soldOutList} onClick={(data) => handleOnClick(data)} />
              })}
            </div>
          </div>
          <Cart
            items={selectedItems}
            onAdd={(item) => handleOnAdd(item)}
            onRemove={(item) => handleOnRemove(item)}
            removeOutOfList={(item) => removeItemOutOfList(item)}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
