import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";

function Catalogue() {
  let catalogueData = [
    {
      CatagoryName: "Lipstick",
      ItemList: [
        { Id: "001", Name: "Lipstick1", img: "/assets/lipstic.png" },
        { Id: "002", Name: "Lipstick2", img: "/assets/lipstic.png" },
        { Id: "003", Name: "Lipstick3", img: "/assets/lipstic.png" },
      ],
    },
    {
      CatagoryName: "Nail Polish",
      ItemList: [
        { Id: "011", Name: "Nail Polish", img: "/assets/lipstic.png" },
        { Id: "012", Name: "Nail Polish2", img: "/assets/lipstic.png" },
      ],
    },
    {
      CatagoryName: "Powder",
      ItemList: [
        { Id: "021", Name: "Powder1", img: "/assets/lipstic.png" },
        { Id: "022", Name: "Powder2", img: "/assets/lipstic.png" },
        { Id: "023", Name: "Powder3", img: "/assets/lipstic.png" },
        { Id: "024", Name: "Powder4", img: "/assets/lipstic.png" },
      ],
    },
  ];
  let addToCart=(event)=>{
    console.log(event)
  }
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
            <button type="button" class="btn btn-warning" style={{ marginLeft:'20%'}} onClick={() =>addToCart(ItemList)}>Add To Cart</button>
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
              <h1>Cataloge</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container" id="home">
        <div class="row row-offcanvas row-offcanvas-left">
          <div
            class="col col-xs-6 col-sm-3 sidebar-offcanvas"
            id="sidebar"
            role="navigation"
          >
            <div class="sidebar-nav">
              <h4>Catagories</h4>
              <ul class="sidebar_menu">{catagoryList}</ul>

              <hr />

              <h4>About Our Brand</h4>
              <p>
                Getting luxurious cosmetics brands on your fingertips seemed
                like a fictitious idea just a few years ago. But no more! We
                change the traditional practice of visiting makeup stores -
                forever. Now you can buy cosmetics online, get ready, and steal
                the show! We understand the struggles of being a fierce makeup
                fan. To cater to your inner beauty diva, we have brought makeup
                online.
              </p>

              <hr />
            </div>
          </div>

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

export default Catalogue;
