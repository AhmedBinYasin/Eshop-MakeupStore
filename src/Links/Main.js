import React from 'react'
import AdminUserControl from '../Pages/AdminUserControl'
import Home from '../Pages/Home'

function Main(props) {
  let homePageProps = props.dataProps
  return (
    <div>
      {(props.dataProps.Role === 'unSigned' ||
        props.dataProps.Role === 'user') && (
        <Home homePageProps={homePageProps} />
      )}
      {props.dataProps.Role === 'admin' && (
        <AdminUserControl></AdminUserControl>
      )}
    </div>
  )
}

export default Main
