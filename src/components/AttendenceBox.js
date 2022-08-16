import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

function AttendenceBox(props) {
  const [sec,setSec]=useState([])
  const [Date1,setDate1]=useState('')
  const [Email,setEmail]=useState('')
    let date2=new Date
    date2 = date2.getFullYear() + '/0' + (date2.getMonth() + 1) + '/' + date2.getDate();;

  const setDate=(event)=>{
    let date=event.target.value
    date=date.split('');
    for(let i=0;i<date.length;i++){
      if(date[i]=='-'){
        date[i]='/'
      }
    }
    date=date.join('')
    setDate1(date)
  }
  const SelectOnChange=(event)=>{
    setEmail(event.target.value)
  }

    useEffect(() => {
     section()
    });
  const section=()=>{
    axios.post(`http://localhost:5000/api/auth/GetAllEmails`,).then(response => {
        const responseData = response.data;
        let option=[<option >Select</option>]
       for(let i =1;i<=responseData.length;i++){
        option[i]=<option value={responseData[i-1]}>{responseData[i-1]}</option>
       }
       setSec(option)
    }).catch(err => console.log(err))
  }
  const onClickAttendenceHandle=()=>{
    if(props.Role=='admin'){
      axios.post(`http://localhost:5000/api/attendence/MarkAttendence`,{Email : Email,Date : Date1}).then(response => {
      const responseData = response.data;
     console.log(responseData)
  }).catch(err => console.log(err))
    }
    else{
      let attData={
        Email : props.Email,
        Date : date2
      }
      axios.post(`http://localhost:5000/api/attendence/MarkAttendence`,attData).then(response => {
      const responseData = response.data;
     console.log(responseData)
  }).catch(err => console.log(err))
    }
}
  if(props.Role=='admin'){
    return(
      <div>
        <h3>Mark attendence for <input type="date"  onChange={setDate}></input>
        <select className="form-select" onChange={SelectOnChange}>
          {sec}
        </select></h3>
      <button type="button" className="btn btn-primary" onClick={onClickAttendenceHandle}>Mark Attendence</button>
    </div>
    )
  }
  else{
  return (
    
    <div style={{margin : "20%"}}>
        <h3>Mark attendence for {date2}</h3>
      <button type="button" className="btn btn-primary" style={{marginLeft : "20%"}} onClick={onClickAttendenceHandle}>Mark Attendence</button>
    </div>
  )}
}

export default AttendenceBox
