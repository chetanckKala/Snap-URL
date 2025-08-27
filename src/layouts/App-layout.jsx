import Header from '@/components/Header'
import React from 'react'
import {Outlet} from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      
      <main className='min-h-screen container_custom px-4'>
        {/* Header */}
        <Header/>

        {/* Body */}
        <Outlet/>
      </main>

      <footer className='p-10 text-center bg-gray-800 mt-10'>
        {/* footer */}
        <h3>Made with luv by Chetan</h3>
      </footer>

    </div>
  )
}

export default AppLayout
