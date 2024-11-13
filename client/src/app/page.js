import { Input } from 'postcss'
import React from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const Home = () => {
  return (
    <div>Home
      <input placeholder="Enter your name"/>
      <input type='password' placeholder=''></input>
      <button>Click me </button>
      <h1>Hi</h1>
      <li>orange</li>
      <li>ball</li>

    </div>
  )
}

export default Home