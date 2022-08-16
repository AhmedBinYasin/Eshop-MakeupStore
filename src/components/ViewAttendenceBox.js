import React from 'react'
import axios from 'axios'

function ViewAttendenceBox(props) {
  if(props.Role=='admin'){
    let Data={
           Email : props.Email,
           Date : props.Date,
           Status : ''
         }

         const SelectOnChange=(event)=>{
               Data.Status=event.target.value
               console.log(Data)
               axios.post(`http://localhost:5000/api/attendence/UpdateAttendence`,Data).then(response => {
                  const responseData = response.data;
                  console.log(responseData)
               }).catch(err => console.log(err))
             }
            const section=()=>{
              if(props.head=='1'){
                return(
                <div className="col-sm" style={{border:'2px solid black'}}>
                  Status
                </div>
                )
              }
              if(props.head=='2'){
                return(
                  <div className="col-sm" style={{border:'2px solid black'}}>
                  <div>
                  <select className="form-select" onChange={SelectOnChange}>
              <option selected>{props.status}</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
           </select></div></div>
                )
              }

            }
         return (
          <div>
            <div className="container">
        <div className="row" style={{backgroundColor : props.color}}>
          <div className="col-sm" style={{border:'2px solid black'}}>
            {props.Date}
          </div>
          <div className="col-sm" style={{border:'2px solid black'}}>
            {props.Email}
          </div>
            {section()}
        </div>
      </div>
          </div>
        )
  }
  else{
  return (
    <div>
      <div className="container">
  <div className="row" style={{backgroundColor : props.color}}>
    <div className="col-sm" style={{border:'2px solid black'}}>
      {props.Date}
    </div>
    <div className="col-sm" style={{border:'2px solid black'}}>
      {props.status}
    </div>
  </div>
</div>
    </div>
  )}
}



export default ViewAttendenceBox
