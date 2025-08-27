import React, { useState } from 'react'

const useFetch = (cb, options = {}) => 
{
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const fn = async (...args) =>
  {
    // console.log ("use fetch fn")
    setLoading(true)
    setError(null)

    try 
    {
        // console.log(options)
        const response = await cb (options, ...args)
        setData(response)
        // console.log ("data updated")


    }
    catch (err) {setError(err)}
    finally {setLoading(false)}
  }

  return {data, loading, error, fn}
}

export default useFetch
