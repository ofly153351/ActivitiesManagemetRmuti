import Link from 'next/link'
import React from 'react'

const Headnav = () => {
  return (
    <div>
      <span >LOGO </span>
      <Link href='/login'> Login</Link>
      <Link href='/register'> Register</Link>
    </div>
  )
}

export default Headnav