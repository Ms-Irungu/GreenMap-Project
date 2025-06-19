import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer';

const getInvolved:React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />

        <Footer />
    </div>
  )
}

export default getInvolved;