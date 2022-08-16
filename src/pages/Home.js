import React from 'react'
import { useState } from 'react';
import Nevbar from '../components/Nevbar'
import Sidebar from '../components/Sidebar'
import AttendenceBox from './../components/AttendenceBox';
import Leavebox from './../components/Leavebox';
import Grade from './Grade';
import ViewAttendences from './ViewAttendences';

function Home(props) {
    const [sat2, setSat2] = useState('1');
    if(props.Role=='user'){
  const setToMarkAttendence=()=>{
    setSat2('1')
  }
  const setToMarkLeave=()=>{
    setSat2('2')
  }
  const setToViewAttendence=()=>{
    setSat2('3')
  }
  let home=()=>{
    switch (sat2) {
        case '1':
            document.title='Home-Mark Attendence'
            return(
                <AttendenceBox Email={props.Email}></AttendenceBox>
            );
        case '2':
            document.title='Home-Mark Leave'
            return(
                <Leavebox Email={props.Email}></Leavebox>
            );
        case '3':
            document.title='Home-View Attendences'
            return(
                <ViewAttendences Email={props.Email} Role='user'></ViewAttendences>
            );
        default:
            break;
    }
  }


  return (
    <div>
      <Nevbar title={'Attendence Management Solution'} Name={props.Data.Name}></Nevbar>
      <Sidebar Role={'user'} setToMarkAttendence={setToMarkAttendence} setToMarkLeave={setToMarkLeave} setToViewAttendence={setToViewAttendence}></Sidebar>
      <div className="content">
        {home()}
      </div>
    </div>
  )
}
if(props.Role=='admin'){
  const setToMarkAttendence=()=>{
    setSat2('1')
  }
  const setToGenerateReport=()=>{
    setSat2('2')
  }

  let home=()=>{
    switch (sat2) {
        case '1':
            document.title='Home-Attendence'
            return(
              <ViewAttendences Email={props.Email} Role='admin'></ViewAttendences>
            );
        case '2':
            document.title='Home-Grades'
            return(
                <Grade></Grade>
            );
        default:
            break;
    }
  }


  return (
    <div>
      <Nevbar title={'Attendence Management Solution'} Name={props.Data.Name}></Nevbar>
      <Sidebar Role={'admin'} setToMarkAttendence={setToMarkAttendence} setToMarkLeave={setToGenerateReport}></Sidebar>
      <div className="content">
        {home()}
      </div>
    </div>
  )
}


}

export default Home
