import React from 'react'
import { useParams } from 'react-router'

const Home = () => {

    const {username} = useParams();

    console.log(username)

  return (
    <div>Home</div>
  )
}

export default Home