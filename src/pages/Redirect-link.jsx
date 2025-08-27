import { getLongUrl } from '@/db/apiUrl'
import { storeClicks } from '@/db/apiClicks'
import useFetch from '@/hooks/use-fetch'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const RedirectLink = () => {

  const {id} = useParams()
  const {data, loading: loadingUrl, error, fn: fnGetLongUrl} = useFetch(getLongUrl, id)
  const {loading: loadingClicks, fn: fnStoreClisk} = useFetch(storeClicks, {id: data?.id, original_url: data?.original_url})

  useEffect(()=>
  {
    fnGetLongUrl()
  }, [])

  useEffect(()=>
  {
    if (!loadingUrl && data)
      fnStoreClisk()
  }, [loadingUrl, data])

  if (loadingUrl || loadingClicks)
  {return (
    <div>
      {/* <BarLoader width={"100%"} color="#ffffff" /> */}
      {/* <h1 className='mt-4'>Redirecting...</h1> */}
      <div className='flex items-center justify-center'>
        <img src="wait.gif" className='aspect-square mix-blend-difference sm:aspect-video object-cover rounded-3xl' alt="" />
      </div>
    </div>
  )}
}

export default RedirectLink
