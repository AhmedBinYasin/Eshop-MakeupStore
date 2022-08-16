import React from 'react'
import axios from 'axios'

function Leavebox(props) {
  let leaveData={
    Email: "",
    Date: '',

  }
    const setDate=(event)=>{
      let date=event.target.value
      date=date.split('');
      for(let i=0;i<date.length;i++){
        if(date[i]=='-'){
          date[i]='/'
        }
      }
      date=date.join('')
      leaveData.Date=date
    }
    const onClickLeaveHandle=()=>{
      leaveData.Email=props.Email
      axios.post(`http://localhost:5000/api/attendence/Markleave`,leaveData).then(response => {
        const responseData = response.data;
       console.log(responseData)
    }).catch(err => console.log(err))
  }
  return (
    <div style={{margin : "20%"}}>
      <label >Request Leave for :</label>
        <input type="date"  onChange={setDate}></input>
      <button type="button" className="btn btn-primary" style={{marginLeft : "20%"}} onClick={onClickLeaveHandle}>Request leave</button>
    </div>
  )
}

export default Leavebox
