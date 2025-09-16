import React from 'react'
import LoadingScreen from '@/components/LoadingAnimation' 
import LoadingScreen2 from '@/components/LoadingScreen'

function Layout({children}) {
  return (
    <div>
        {/* <LoadingScreen2> */}
    {/* <LoadingScreen> */}

        {children}
        {/* </LoadingScreen> */}
        {/* </LoadingScreen2> */}

    </div>
  )
}

export default Layout