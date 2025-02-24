import React, {useEffect, useState} from 'react'
import Footer from '../Footer'
import Hero from '../Hero'
import CubeLoader from '../loaders/CubeLoader'
import BallSpinner from '../loaders/BallSpinner'
import SpinningLoader from '../loaders/SpinningLoader'

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a delay of 3 seconds
  }, []);
  return (
    <>
      {loading ? (
        <SpinningLoader/>
      ) : (
        <div>
          <Hero/>
          <div id="footer">
            <Footer/>
          </div>
        </div>
      )}
      
    </>
  )
}

export default Home