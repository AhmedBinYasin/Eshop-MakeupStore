import React from 'react'
import Home from '../Pages/Home';
import Nevbar from './../Components/Nevbar';

function Main(props) {
 
      let homePageProps = props.dataProps
  return (
    <div>
      
      <Home homePageProps={homePageProps}/>
    </div>
  )
}

export default Main
