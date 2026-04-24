import React from 'react'
import {  PropagateLoader } from 'react-spinners'

export default function loading() {
  return (
    <div className='flex justify-center  items-center h-screen'>
        <PropagateLoader color="#37c622" />
   </div>
 )
}
