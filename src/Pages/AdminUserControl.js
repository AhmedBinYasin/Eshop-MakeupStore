import React from 'react'
import { useState } from 'react';

function AdminUserControl() {
  const [userData,setUserData] = useState({
    Users: [
      {
        Name: 'ahmed',
        Email: 'ahmed@gmail.com',
        Role: 'user',
      },
      {
        Name: 'ahmed1',
        Email: 'ahmed1@gmail.com',
        Role: 'user',
      },
      {
        Name: 'ahmed2',
        Email: 'ahmed2@gmail.com',
        Role: 'user',
      },
      {
        Name: 'ahmed4',
        Email: 'ahmed4@gmail.com',
        Role: 'admin',
      },
    ],
  })

  const SelectOnChange=(Email,event)=>{
    let temp=userData
    for(let i= 0; i<temp.Users.length; i++){
      if(temp.Users[i].Email === Email){
        temp.Users[i].Role="admin"
      }
    }
    setUserData(temp)
    console.log(userData)
  }

  let UserBox = (userData) => {
    let List = userData.Users.map(function (Users) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm" style={{ border: '2px solid black' }}>
              {Users.Name}
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              {Users.Email}
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              <div>
                <select className="form-select" onChange={() =>SelectOnChange(Users.Email)}>
                  <option selected value={Users.Role}>{Users.Role}</option>
                  {userData.Users.Role == 'admin' ? (
                    <option value="user">user</option>
                  ) : (
                    <option value="admin">admin</option>
                  )}
                </select>
              </div>
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
            <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-danger">Remove User</button></div>
            </div>
          </div>
        </div>
      </>
    )
  })
  return List
  }

  return (
    <div className="CataloguePage">
      <header>
        <div class="container logo">
          <div class="row">
            <div class="col-md-12">
              <h1>UserControl</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container" id="home">
        <div class="row row-offcanvas row-offcanvas-left">
          <div class="col col-xs-12 col-sm-12">
          <div className="container">
          <div className="row" style={{backgroundColor : "silver"}}>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              Name
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              Email
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              Role
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
              Delete
            </div>
          </div>
        </div>
            {UserBox(userData)}</div>
        </div>
      </div>
      <footer class="container">
        <div class="credit">
          <p id="templatemo_cr_bar">The MakeUp Store</p>
        </div>
      </footer>
    </div>
  )
}

export default AdminUserControl
