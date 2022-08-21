import React from 'react'
import { useState } from 'react'

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

  let itemList = (Catagory) => {
    let List = Catagory.ItemList.map(function (Items) {
      return (
        <>
          <div className="container">
            <div className="row" >
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
                <div class="d-grid gap-2">
                  <button type="button" class="btn btn-outline-danger">
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
                    Catagory
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
