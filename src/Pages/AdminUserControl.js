import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

function AdminUserControl() {
  const [userData,setUserData] = useState({})

  let getUserData = () => {
    axios
      .post(`http://localhost:5000/api/auth/ViewUsers`, {})
      .then((response) => {
        setUserData({Users:response.data})
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getUserData()
  }, [])


  const SelectOnChange=(Email,event)=>{
    axios
      .post(`http://localhost:5000/api/auth/UpdateUsersRole`, {Email:Email,Role:event.target.value})
      .then((response) => {
      })
      .catch((err) => console.log(err))
  }

  const deleteHandler=(Email)=>{
    axios
      .post(`http://localhost:5000/api/auth/DeleteUsers`, {Email:Email})
      .then((response) => {
      })
      .catch((err) => console.log(err))
      getUserData()
  }
  

  let UserBox = (userData) => {
    let List = userData.Users?.map(function (Users) {
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
                <select className="form-select" onChange={(e) =>SelectOnChange(Users.Email, e)}>
                  <option selected value={Users.Role}>{Users.Role}</option>
                  {Users.Role === 'admin' ? (
                    <option value="user">user</option>
                  ) : (
                    <option value="admin">admin</option>
                  )}
                </select>
              </div>
            </div>
            <div className="col-sm" style={{ border: '2px solid black' }}>
            <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-danger" onClick={() =>deleteHandler(Users.Email)}>Remove User</button></div>
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
