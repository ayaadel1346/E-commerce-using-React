import React from 'react'
import MyNavbar from '../layouts/myNavbar'
import { Outlet } from 'react-router-dom'



export default function SharedLayout() {
  return (
   <>
   <MyNavbar></MyNavbar>
   <Outlet></Outlet>
  
   </>
  )
}
