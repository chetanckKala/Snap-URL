
import CreateLink from '@/components/Create-link'
import LinkCard from '@/components/LinkCard'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserState } from '@/context'
import { getClicks } from '@/db/apiClicks'
import { getUrl } from '@/db/apiUrl'
import useFetch from '@/hooks/use-fetch'
import { Filter, FilterIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const {data: user} = UserState()
  const {loading: loadingUrl, data: urls, error: errorUrl, fn: fnUrl} = useFetch(getUrl, user?.id)
  const {loading: loadingClicks, data: clicks, error: errorClicks, fn: fnClicks} = useFetch(getClicks, urls?.map((url)=>url.id))
  const [filteredUrls, setFilteredUrls] = useState(urls)

  useEffect(()=>
  {
    fnUrl()
  }, [])

  useEffect(()=>
  {
    if (urls?.length)
    fnClicks()
  },[urls?.length])

  // console.log (urls)
  // console.log (clicks)

  useEffect(()=>  
  {
    const temp = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredUrls(temp)
    // console.log ("filtered", filteredUrls)
  }, [searchQuery, urls])

  return (
    <div className='flex flex-col gap-8'>
      {(loadingClicks || loadingUrl) && <BarLoader width={'80%'} color='#ffffff' className='ml-[10%]' />}

      <div className='grid grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>
        </CardHeader>

        <CardContent>
          <h2 className='text-2xl font-bold'>{urls?.length}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>

        <CardContent>
          <h2 className='text-2xl font-bold'>{clicks?.length}</h2>
        </CardContent>
      </Card>
      </div>

      <div className='flex justify-between items-center'> 
        <h1 className='font-bold text-3xl'>My Links</h1>
        <CreateLink/>
      </div>

      <div className='relative'>
        <Input placeholder='Search links here...' value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
        <Filter className='absolute top-2 right-2 p-1' />
      </div>

      {errorUrl && <Error message={errorUrl.message}/>}

      <div>
      {(filteredUrls || []).map ((url)=>
      {
        return <LinkCard url={url} fetchUrl={fnUrl}/>
      })}
      </div>


    </div>
  )
}

export default Dashboard
