import React from 'react'
import HomeComp from '../component/Home'
import Navbar from '../component/Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <section>
      <HomeComp/>
    </section>
    </>
    
  )
}

export default Home