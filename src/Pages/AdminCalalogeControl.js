import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'

function AdminCalalogeControl() {
  const [itemData, setItemData] = useState([
    {
      CatagoryName: 'a',
      ItemList: [
        {
          Id: '1',
          Name: 'b',
          img: 'c',
        },
        {
          Id: '1',
          Name: 'b',
          img: 'c',
        },
        {
          Id: '1',
          Name: 'b',
          img: 'c',
        },
      ],
    },
    {
      CatagoryName: 'a',
      ItemList: [
        {
          Id: '1',
          Name: 'b',
          img: 'c',
        },
        {
          Id: '1',
          Name: 'b',
          img: 'c',
        },
      ],
    },
  ])

  const [ItemName, setItemName] = useState('')
  const [ItemCatagory, setItemCatagory] = useState('')
  const [ItemPrice, setItemPrice] = useState('')
  const [ItemImage, setItemImage] = useState('')

  const ItemNameOnChangeHandeler = (event) => {
    setItemName(event.target.value)
  }
  const ItemCatagoryOnChangeHandeler = (event) => {
    setItemCatagory(event.target.value)
  }
  const ItemPriceOnChangeHandeler = (event) => {
    setItemPrice(event.target.value)
  }
  const ItemImageOnChangeHandeler = (event) => {
    setItemImage(event.target.files[0])
    let name = ItemImage.name

    let idxDot = name.lastIndexOf('.') + 1

    var extFile = name.substr(idxDot, name.length).toLowerCase()
    if (extFile !== 'png') {
      alert('Only jpg/jpeg and png files are allowed!')
      setItemImage('')
    }
  }

  let getCatalogeData = () => {
    axios
      .post(`http://localhost:5000/api/Cataloge/ViewCatalog`, {})
      .then((response) => {
        setItemData(response.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCatalogeData()
  }, [])

  const AddItemOnClickHandeler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('Name', ItemName)
    formData.append('Category', ItemCatagory)
    formData.append('Price', ItemPrice)
    formData.append('image', ItemImage)
    await axios.post('http://localhost:5000/api/Cataloge/AddItem', formData)
    setItemImage('')
    setItemPrice('')
    setItemCatagory('')
    setItemName('')
    getCatalogeData()
  }

  const deleteHandler = (Id, cat) => {
    axios
      .post(`http://localhost:5000/api/Cataloge/DeleteItem`, {
        Id: Id,
        CatagoryName: cat,
      })
      .then((response) => {})
      .catch((err) => console.log(err))
    getCatalogeData()
  }

  let itemList = (Catagory) => {
    let List = Catagory.ItemList.map(function (Items) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div
                className="col-sm"
                style={{ border: '2px solid black', textAlign: 'center' }}
              >
                {Items.Id}
              </div>
              <div className="col-sm" style={{ border: '2px solid black' }}>
                {Items.Name}
              </div>
              <div className="col-sm" style={{ border: '2px solid black' }}>
                {Items.Price}
              </div>
              <div className="col-sm" style={{ border: '2px solid black' }}>
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    onClick={() =>
                      deleteHandler(Items.Id, Catagory.CatagoryName)
                    }
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    })
    return List
  }

  let ItemBox = (itemData) => {
    let List = itemData.map(function (Catagory) {
      return (
        <>
          <div className="container">
            <div className="row" style={{ backgroundColor: 'silver' }}>
              <div
                className="col-sm"
                style={{ border: '2px solid black', textAlign: 'center' }}
              >
                {Catagory.CatagoryName}
              </div>
            </div>
          </div>
          {itemList(Catagory)}
        </>
      )
    })
    return List
  }

  return (
    <div>
      <div className="CataloguePage">
        <header>
          <div class="container logo">
            <div class="row">
              <div class="col-md-12">
                <h1>Cataloge Control</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container ">
          <div className="row">
            <Popup
              trigger={
                <button
                  type="button"
                  class="btn btn-info my-2"
                  style={{
                    backgroundColor: 'green',
                    border: '5px solid black',
                  }}
                >
                  Add New Product
                </button>
              }
              position="bottom center"
            >
              <div class="bg-light" style={{ width: '300%' }}>
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 order-md-1">
                      <h4 class="mb-3">Item Details</h4>
                      <form class="needs-validation">
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="firstName">Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="firstName"
                              placeholder=""
                              value={ItemName}
                              required=""
                              onChange={ItemNameOnChangeHandeler}
                            />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="lastName">Catagory</label>
                            <input
                              type="text"
                              class="form-control"
                              id="lastName"
                              placeholder=""
                              value={ItemCatagory}
                              required=""
                              onChange={ItemCatagoryOnChangeHandeler}
                            />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="lastName">Price</label>
                            <input
                              type="number"
                              class="form-control"
                              id="lastName"
                              placeholder=""
                              min="0"
                              data-bind="value:replyNumber"
                              value={ItemPrice}
                              required=""
                              onChange={ItemPriceOnChangeHandeler}
                            />
                          </div>
                          <div class="col-md-12 mb-3">
                            <label for="formFile" class="form-label">
                              Upload Image
                            </label>
                            <input
                              class="form-control"
                              type="file"
                              id="formFile"
                              accept=".png"
                              style={{}}
                              value=""
                              required=""
                              onChange={ItemImageOnChangeHandeler}
                            />
                            <label for="formFile">{ItemImage.name}</label>
                          </div>
                        </div>
                        <hr class="mb-4" />
                        <div class="col-md-12 mb-4">
                          <button
                            class="btn btn-primary btn-lg btn-block col-md-12"
                            onClick={(e) => AddItemOnClickHandeler(e)}
                          >
                            Add to Catalog
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        </div>
        <div class="container" id="home">
          <div class="row row-offcanvas row-offcanvas-left">
            <div class="col col-xs-12 col-sm-12">
              <div className="container">
                <div className="row" style={{ backgroundColor: 'silver' }}>
                  <div className="col-sm" style={{ border: '2px solid black' }}>
                    id
                  </div>
                  <div className="col-sm" style={{ border: '2px solid black' }}>
                    Name
                  </div>
                  <div className="col-sm" style={{ border: '2px solid black' }}>
                    Price
                  </div>
                  <div className="col-sm" style={{ border: '2px solid black' }}>
                    Delete
                  </div>
                </div>
              </div>
              {ItemBox(itemData)}
            </div>
          </div>
        </div>
        <footer class="container">
          <div class="credit">
            <p id="templatemo_cr_bar">The MakeUp Store</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AdminCalalogeControl
