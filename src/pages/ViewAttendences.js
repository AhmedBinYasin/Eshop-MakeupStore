import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import ViewAttendenceBox from '../components/ViewAttendenceBox'
import AttendenceBox from '../components/AttendenceBox';

function ViewAttendences(props) {
  let Data={
    Email:props.Email
  }
  const [responseData,setresponseData]=useState('')
  let [from,setFrom]=useState(0)
  let [to,setTo]=useState(99999999)
  let getAttData=()=>{
    axios.post(`http://localhost:5000/api/attendence/ViewAttendencesUser`,Data).then(response => {
        const res=response.data
       setresponseData(res)
    }).catch(err => console.log(err))

  }
  let getAAttData=()=>{
    axios.post(`http://localhost:5000/api/attendence/ViewAllAttendences`,Data).then(response => {
       setresponseData(response.data)
    }).catch(err => console.log(err))

  }
  useEffect(() => {
    if(props.Role=='user'){
    getAttData()}
    if(props.Role=='admin'){
      getAAttData()}
  },[]);
  if (props.Role=='user'){
  let table=[]
  let tableGenerator=()=>{
    for(let i=0;i<responseData.length;i++){
      table[i]=<ViewAttendenceBox Date={responseData[i].Date} status={responseData[i].Status} color='white'></ViewAttendenceBox>
    }
    return(
      table
    )
  }
  return (
    <div>
      <ViewAttendenceBox Date='Date' status='Present/Abesent/leave' color='gray'></ViewAttendenceBox>
      {tableGenerator()}
    </div>
  )}

  if (props.Role=='admin'){
    const setDateFrom=(event)=>{
      let date=event.target.value
      date=date.split('');
      for(let i=0;i<date.length;i++){
        if(date[i]=='-'){
          date[i]=''
        }
      }
      date=date.join('')
      date=parseInt(date)
      setFrom(date)
    }
    const setDateTo=(event)=>{
      let date=event.target.value
      date=date.split('');
      for(let i=0;i<date.length;i++){
        if(date[i]=='-'){
          date[i]=''
        }
      }
      date=date.join('')
      date=parseInt(date)
      setTo(date)
    }
    const toInt=(date)=>{
      date=date.split('');
      for(let i=0;i<date.length;i++){
        if(date[i]=='/'){
          date[i]=''
        }
      }
      date=date.join('')
      date=parseInt(date)
      return date
    }
    let table=[]
    let tableGenerator=()=>{
      for(let i=0;i<responseData.length;i++){
        if(toInt(responseData[i].Date)>=from && toInt(responseData[i].Date)<=to){
        table[i]=<ViewAttendenceBox head='2' Email={responseData[i].Email} Date={responseData[i].Date} status={responseData[i].Status} color='white' Role='admin'></ViewAttendenceBox>
      }}
      return(
        table
      )
    }
    return (
      <div>
        <AttendenceBox Role='admin'></AttendenceBox>
        <div>
        <label >From :</label>
        <input type="date"  onChange={setDateFrom}></input>
        <label >To :</label>
        <input type="date"  onChange={setDateTo}></input>
        </div>
      <div>
        <ViewAttendenceBox Date='Date' status='Email' color='gray' head='1'></ViewAttendenceBox>
        {tableGenerator()}
      </div></div>
    )}
  
}

export default ViewAttendences
