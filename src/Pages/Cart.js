import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";

function Cart() {
  let catalogueData = [
    {
      CatagoryName: "Lipstick",
      ItemList: [{ Id: "001", Name: "Lipstick1", img: "/assets/lipstic.png" }],
    },
    {
      CatagoryName: "Powder",
      ItemList: [
        { Id: "023", Name: "Powder3", img: "/assets/lipstic.png" },
        { Id: "024", Name: "Powder4", img: "/assets/lipstic.png" },
      ],
    },
  ];
  let removeFromCart = (event) => {
    console.log(event);
  };
  let catagoryList = catalogueData.map(function (catalogueData) {
    return (
      <li>
        <Link to="">{catalogueData.CatagoryName}</Link>
      </li>
    );
  });

  let ItemList = (ItemList) => {
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
              </Link>
            }
            position="right center"
          >
            <div>
              <button
                type="button"
                class="btn btn-warning"
                style={{ marginLeft: "10%" }}
                onClick={() => removeFromCart(ItemList)}
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
  let CatalogueList = catalogueData.map(function (catalogueData) {
    return (
      <>
        <section class="row" id="website_templates">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <h3>{catalogueData.CatagoryName}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <div class="item_container row">
                {ItemList(catalogueData.ItemList)}
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
      {catalogueData.length==0 ?
            <h4 style={{textAlign:"center"}}>The Cart is Empty</h4>
    :<h4 style={{textAlign:"center"}}>Following Items Have Been Added To The Cart</h4>}
      
      <div class="container" id="home">
        <div class="row row-offcanvas row-offcanvas-left">
          

          <div class="col col-xs-12 col-sm-9">{CatalogueList}</div>
        </div>
      </div>
      <footer class="container">
        <div class="credit">
          <p id="templatemo_cr_bar">The MakeUp Store</p>
        </div>
      </footer>
    </div>
  );
}

export default Cart;
