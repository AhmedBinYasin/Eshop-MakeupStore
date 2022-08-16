import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'

function Grade() { 
    const [sec,setSec]=useState([])
    const [Records,setRecords]=useState([])
    let sap=2
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
          useEffect(() => {
            section()
          });
          const SelectOnChange=(event)=>{
            axios.post(`http://localhost:5000/api/attendence/Grades`,{Email : event.target.value}).then(response => {
                   setRecords(response.data)
                }).catch(err => console.log(err))
            }
          const card=()=>{
            if(sap==2){
                return(
                <div className="container">
	<div className="row">
		<div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
    	 <div className="well profile">
            <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                    <h2>Report</h2>
                    <p><strong>Present: </strong>{Records.p}</p>
                    <p><strong>Absent: </strong> {Records.a}</p>
                    <p><strong>Leave: </strong>{Records.l}</p>
                    <p><strong>Grade: </strong><h2>{Records.G}</h2></p>
                </div>             
            </div>            
    	 </div>                 
		</div>
	</div>
</div>)
            }
          }
  return (
    <div>
        <label>Show Grade Report of </label>
      <select className="form-select1312" onChange={SelectOnChange}>
          {sec}
        </select>
        {card()}
    </div>
  )
}

export default Grade
