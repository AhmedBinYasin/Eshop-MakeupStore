import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart(props) {
  const [Empty, setEmpty] = useState(0);
  const [billFName, setbillFName] = useState("");
  const [billLName, setbillLName] = useState("");
  const [billaddress, setbilladdress] = useState("");
  const [billzip, setbillzip] = useState("");
  const [catalogueData, setCatalogueData] = useState({
    _id: "630119afb634b3ca6d5a4c35",
    Email: "ahmed116046@gmail.com",
    CatagoryList: [
      {
        CatagoryName: "Lipstick",
        ItemList: [
          {
            Id: "001",
            Name: "Lipstic Artdeco Pink",
            img: "/assets/LipsticArtdecoPink.png",
            quantity: "1",
            _id: "630119afb634b3ca6d5a4c37",
          },
        ],
        _id: "630119afb634b3ca6d5a4c36",
      },
    ],
    __v: 0,
  });

  let getCartData = () => {
    axios
      .post(`http://localhost:5000/api/Cart/ViewCart`, {
        Email: props.dataProps.Email,
      })
      .then((response) => {
        if (!response.data) {
          setEmpty(0);
        } else {
          setEmpty(1);
          console.log("1");
          setCatalogueData(response.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCartData();
  }, []);

  const onChangehandleFName=(event)=>{
    setbillFName(event.target.value)
} 
const onChangehandleLName=(event)=>{
  setbillLName(event.target.value)
} 
const onChangehandleaddress=(event)=>{
  setbilladdress(event.target.value)
} 
const onChangehandlezip=(event)=>{
  setbillzip(event.target.value)
} 
  let removeFromCart = (event, CatagoryName) => {
    let toRemoveData = {
      Email: props.dataProps.Email,
      CatagoryList: [
        {
          CatagoryName: CatagoryName,
          ItemList: [
            {
              Id: event.Id,
              Name: event.Name,
              img: event.img,
              quantity: "1",
            },
          ],
        },
      ],
    };
    axios
      .post(`http://localhost:5000/api/Cart/Remove`, toRemoveData)
      .then((response) => {
        console.log(response);
        getCartData();
      });
  };

let placeOrder=(e)=>{
  e.preventDefault();
  let itemList=[]
  for(let i=0;i<catalogueData.CatagoryList.length;i++){
    for(let j=0;j<catalogueData.CatagoryList[i].ItemList.length;j++){
      itemList.push({
        Id: catalogueData.CatagoryList[i].ItemList[j].Id,
        Name: catalogueData.CatagoryList[i].ItemList[j].Name,
        quantity: catalogueData.CatagoryList[i].ItemList[j].quantity,
      })
    }
  }
  let OrderData={
    Email: props.dataProps.Email,
    Billing:{
      Name: billFName + billLName,
      Address: billaddress,
      Zip:billzip
    },
    ItemList:itemList
  }
  axios
      .post(`http://localhost:5000/api/Cart/PlaceOrder`, OrderData)
      .then((response) => {
        getCartData();
      });
}


  let ItemList = (ItemList, CatagoryName) => {
    let List = ItemList.map(function (ItemList) {
      return (
        <div class="item">
          <Popup
            trigger={
              <Link to="" class="thumbnail">
                <img
                  src={window.location.origin + ItemList.img}
                  alt={ItemList.Name}
                />
                <p>{ItemList.Name}</p>
                <p>Quantity : {ItemList.quantity}</p>
              </Link>
            }
            position="right center"
          >
            <div>
              <button
                type="button"
                class="btn btn-warning"
                style={{ marginLeft: "10%" }}
                onClick={() => removeFromCart(ItemList, CatagoryName)}
              >
                Remove From Cart
              </button>
            </div>
          </Popup>
        </div>
      );
    });
    return List;
  };
  let CatalogueList = catalogueData.CatagoryList.map(function (CatagoryList) {
    return (
      <>
        <section class="row" id="website_templates">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <h3>{CatagoryList.CatagoryName}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="item_container row">
                {ItemList(CatagoryList.ItemList, CatagoryList.CatagoryName)}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  });

  return (
    <div className="CataloguePage">
      <header>
        <div class="container logo">
          <div class="row">
            <div class="col-md-12">
              <h1>Cart</h1>
            </div>
          </div>
        </div>
      </header>
      {console.log(Empty)}
      {Empty == 0 ? (
        <h4 style={{ textAlign: "center" }}>The Cart is Empty</h4>
      ) : (
        <h4 style={{ textAlign: "center" }}>
          Following Items Have Been Added To The Cart
        </h4>
      )}

      <div class="container" id="home">
        <div class="row row-offcanvas row-offcanvas-left">
          {Empty != 0 && (
            <div class="col col-xs-12 col-sm-9">{CatalogueList}</div>
          )}
        </div>
      </div>
      {Empty == 1 && (
      <Popup
        trigger={
          <button type="button" class="btn btn-success" style={{marginLeft:"5vw"}}>
            Proceed to checkout
          </button>
        }
        position="right bottom"
      >
        <div class="bg-light" style={{width:"300%"}}>
          <div class="container">
            <div class="row">
              <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Billing address</h4>
                <form class="needs-validation was-validated" >
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName">First name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder=""
                        value={billFName}
                        onChange={onChangehandleFName}
                      />
                      <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName">Last name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        value={billLName}
                        onChange={onChangehandleLName}
                      />
                      <div class="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      onChange={onChangehandleaddress}
                      value={billaddress}
                    />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-3 mb-3">
                      <label for="zip">Zip</label>
                      <input
                        type="text"
                        class="form-control"
                        id="zip"
                        placeholder=""
                        onChange={onChangehandlezip}
                        value={billzip}
                      />
                      <div class="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <hr class="mb-4" />

                  <h4 class="mb-3">Payment</h4>

                  <div class="d-block my-3">
                    <div class="custom-control custom-radio">
                      <label class="custom-control-label" for="credit">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                  <hr class="mb-4" />
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    onClick={e => placeOrder(e)}
                  >
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Popup>)}
      <footer class="container">
        <div class="credit">
          <p id="templatemo_cr_bar">The MakeUp Store</p>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
