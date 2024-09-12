import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import { User, AddUser } from '../pages'

function CustomRouter() {
  return (
    <Routes>
        <Route path='/' element={<User/>}/>
        <Route path='/add' element={<AddUser/>}/>
    </Routes>
  )
}

export default CustomRouter