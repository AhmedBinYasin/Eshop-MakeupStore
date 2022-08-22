import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

function AdminOrderControl() {
  const [OrdersData, setOrdersData]= useState([
    {
      Email: 'a@b.c',
      Billing: {
        Name: 'a',
        Address: 'b',
        Zip: '0',
      },
      ItemList: [
        {
          Id: '0',
          Name: 'd',
          quantity: '1',
        },
        {
          Id: '1',
          Name: 'e',
          quantity: '1',
        },
      ],
    },
  ])

  let getOrderData = () => {
    axios.post(`http://localhost:5000/api/Cart/ViewOrders`, {})
      .then((response) => {
        setOrdersData(response.data)
        console.log(OrdersData)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getOrderData()
  }, [])

  let itemList = (ItemList) => {
    let List = ItemList.map(function (Items) {
      return (
        <>
          <div className="container">
            <div className="row">
              <div
                className="col-sm"
                style={{
                  border: '2px solid black',
                  textAlign: 'center',
                }}
              >
                {Items.Id}{' '}
              </div>
              <div
                className="col-sm"
                style={{
                  border: '2px solid black',
                  textAlign: 'center',
                }}
              >
                {Items.Name}{' '}
              </div>
              <div
                className="col-sm"
                style={{
                  border: '2px solid black',
                  textAlign: 'center',
                }}
              >
                {Items.Price}{' '}
              </div>
              <div
                className="col-sm"
                style={{
                  border: '2px solid black',
                  textAlign: 'center',
                }}
              >
                {Items.quantity}{' '}
              </div>
              <div
                className="col-sm"
                style={{
                  border: '2px solid black',
                  textAlign: 'center',
                }}
              >
                {Items.TotalPrice}{' '}
              </div>
            </div>
          </div>
        </>
      )
    })
    return List
  }
  const EmailList = (OrdersData) => {
    let i = 0
    let List = OrdersData.map(function (Order) {
      i++
      return (
        <>
          <div className="container">
            <div className="row" style={{ borderRadius: '10vh' }}>
              <button
                className="col-sm btn btn-primary my-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={'#collapse' + i}
                aria-expanded="false"
                aria-controls="collapse"
                style={{
                  backgroundColor: 'blue',
                  border: '2px solid black',
                  textAlign: 'center',
                  height: '9vh',
                  fontSize: '4vh',
                  borderRadius: '10vh',
                  color: 'white',
                }}
              >
                <div>{Order.Email}</div>
              </button>
            </div>
          </div>
          <div class="bg-light collapse" id={'collapse' + i}>
            <div class="container">
              <div class="row">
                <div class="col-md-8 order-md-1">
                  <h4 class="mb-3">Billing address</h4>
                  <form class="needs-validation was-validated" novalidate="">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="firstName">
                          Name : {Order.Billing.Name}{' '}
                        </label>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="address">
                        Address : {Order.Billing.Address}{' '}
                      </label>
                    </div>

                    <div class="row">
                      <div class="col-md-3 mb-3">
                        <label for="zip">Zip : {Order.Billing.Zip}</label>
                      </div>
                    </div>
                    <hr class="mb-4" />

                    <h4 class="mb-3">Payment</h4>

                    <div class="d-block my-3">
                      <div class="custom-control custom-radio">
                        <label class="custom-control-label" for="credit">
                          Cash on Delivery  , Total Price : Rs {Order.Billing.OrderPrice}
                        </label>
                      </div>
                    </div>
                    <hr class="mb-4" />
                  </form>
                </div>
              </div>
            </div>
            <div class="container" id="home">
            <div class="row row-offcanvas row-offcanvas-left">
              <div class="col col-xs-12 col-sm-12">
                <div className="container">
                  <div className="row" style={{ backgroundColor: 'silver' }}>
                    <div
                      className="col-sm"
                      style={{ border: '2px solid black', textAlign: 'center' }}
                    >
                      id
                    </div>
                    <div
                      className="col-sm"
                      style={{ border: '2px solid black', textAlign: 'center' }}
                    >
                      Name
                    </div>
                    <div
                      className="col-sm"
                      style={{ border: '2px solid black', textAlign: 'center' }}
                    >
                      Price
                    </div>
                    <div
                      className="col-sm"
                      style={{ border: '2px solid black', textAlign: 'center' }}
                    >
                      Quantity
                    </div>
                    <div
                      className="col-sm"
                      style={{ border: '2px solid black', textAlign: 'center' }}
                    >
                      TotalPrice
                    </div>
                  </div>
                </div>
                {itemList(Order.ItemList)}
              </div>
            </div>
          </div>
          </div>
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
                <h1>Orders</h1>
              </div>
            </div>
          </div>
        </header>
        <div class="container" id="home">
          <div class="row row-offcanvas row-offcanvas-left">
            <div class="col col-xs-12 col-sm-12">
              <div class="container logo">
                <div class="row">
                  <div class="col-md-12">
                    <h1 style={{ textAlign: 'center' }}>Placed Orders</h1>
                  </div>
                </div>
              </div>
              {EmailList(OrdersData)}{' '}
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

export default AdminOrderControl
