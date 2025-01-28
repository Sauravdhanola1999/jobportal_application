import React from 'react'
import { Outlet } from 'react-router-dom'

const PlainLayout = () => {
  return (
    <>
    <Outlet /> {/* Render the matched route */}
  </>
  )
}

export default PlainLayout
