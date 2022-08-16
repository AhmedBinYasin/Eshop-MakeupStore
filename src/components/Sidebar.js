import React from 'react'
import { useState } from 'react';

function Sidebar(props) {
    const [MarkAttendenceColor, setMarkAttendenceColor] = useState('green');
    const [MarkLeaveColor, setMarkLeaveColor] = useState('gray');
    const [ViewAttendenceColor, setViewAttendenceColor] = useState('gray');

    const onClickMarkAttendenceHandle=()=>{
        setMarkAttendenceColor('green')
        setMarkLeaveColor('gray')
        setViewAttendenceColor('gray')
        props.setToMarkAttendence()
    }
    const onClickMarkLeaveHandle=()=>{
        setMarkAttendenceColor('gray')
        setMarkLeaveColor('green')
        setViewAttendenceColor('gray')
        props.setToMarkLeave()
    }
    const onClickViewAttendenceHandle=()=>{
        setMarkAttendenceColor('gray')
        setMarkLeaveColor('gray')
        setViewAttendenceColor('green')
        props.setToViewAttendence()
    }
    if(props.Role=='user'){
  return (
      <div>
            <div className="sidebar">
            <a className="active" href="#home" style={{background : MarkAttendenceColor}} onClick={onClickMarkAttendenceHandle}>Mark Attendence</a>
            <a href="#news" style={{background : MarkLeaveColor}} onClick={onClickMarkLeaveHandle}>Mark Leave</a>
            <a href="#contact" style={{background : ViewAttendenceColor}} onClick={onClickViewAttendenceHandle}>View Attendence</a>
        </div>
      </div>
  )}
  if(props.Role=='admin'){
    return (
        <div>
              <div className="sidebar">
              <a className="active" href="#home" style={{background : MarkAttendenceColor}} onClick={onClickMarkAttendenceHandle}>All Attendence</a>
              <a href="#contact" style={{background : ViewAttendenceColor}} onClick={onClickMarkLeaveHandle}>Grades</a>
          </div>
        </div>
    )
  }
}

export default Sidebar
