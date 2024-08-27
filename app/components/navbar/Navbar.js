'use client'
import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
     <div className='flex justify-between h-20 mb-8 shadow-lg p-5'>
        <h1 className='text-2xl'>Where in the world?</h1>
        <button className='hidden'>toggle theme</button>
     </div>
    )
  }
}
