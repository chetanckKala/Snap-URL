import DeviceStats from '@/components/DeviceStats'
import LocationStats from '@/components/LocationStats'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserState } from '@/context'
import { getClicksData } from '@/db/apiClicks'
import { deleteUrl, getUrlById } from '@/db/apiUrl'
import useFetch from '@/hooks/use-fetch'
import { Check, Copy, Download, LinkIcon, Trash } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BarLoader, MoonLoader } from 'react-spinners'
const baseUrl = import.meta.env.VITE_BASE_URL

const Link = () => {

  const navigate = useNavigate()
  const {id} = useParams()
  let link = ''
  const {data: user} = UserState()
  const {loading: loadingUrl, error, data: url, fn: fnGetUrl} = useFetch(getUrlById, {url_id: id, user_id: user?.id})
  const {loading: loadingClicks, data: clicks, fn: fnGetClicks} = useFetch(getClicksData, id)
  const {loading: loadingDelete, fn: fnDelete, data: deletedUrl} = useFetch(deleteUrl, id)
  const [copied, setCopied] = useState(false)

  useEffect(()=>
  {
    fnGetUrl()
    fnGetClicks()
  },[])

  useEffect (()=>
  {
    if (!loadingDelete && deletedUrl)
    navigate("/dashboard")
  }, [deletedUrl, loadingDelete])

  if (error)
  {
    console.log(error)
    navigate("/dashboard")
  }

  if (url) 
  link = url?.custom_url ? url?.custom_url : url?.short_url

  function handleCopy ()
  {
    navigator.clipboard.writeText(`${baseUrl}/${url?.custom_url ? url?.custom_url : url?.short_url}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const handleDownload = () =>
  {
      const anchor = document.createElement("a")
      anchor.href = url?.qr
      anchor.download = url?.title

      document.body.appendChild(anchor)
      anchor.click()

      document.body.removeChild(anchor)
  }

  // console.log(url)

  return (
    <>
    {(loadingUrl || loadingClicks) && <BarLoader width={'80%'} color='#ffffff' className='ml-[10%]' />}
    <div className='flex flex-col gap-8 sm:flex-row justify-between mt-2'>

      <div className='flex flex-col gap-8 items-start h-fit  sm:w-2/5'>

        <span className='text-5xl font-bold'>{url?.title}</span>
        <a href={`${baseUrl}/${link}`} target='_blank' className='text-2xl font-semibold text-blue-500 hover:underline cursor-pointer border-1 bg-[#0F172B] px-3 py-1 rounded-2xl'>{baseUrl}/{link}</a>
        <a href={url?.original_url} target='_blank' className='flex flex-1 break-words w-full whitespace-normal items-center hover:underline gap-2 cursor-pointer'><span className='break-words w-full whitespace-normal'>{url?.original_url}</span></a>
        <span className='text-sm flex items-end font-extralight text-gray-400'>{new Date(url?.created_at).toLocaleString()}</span>
        
        <div className='flex md:flex-col lg:flex-row'>
          <Button variant={"ghost"} onClick={handleCopy}>{copied ? <Check/> : <Copy/>}</Button>
          <Button variant={"ghost"} onClick={handleDownload}><Download/></Button>
          <Button variant={"ghost"} onClick={()=> fnDelete()}>
              {loadingDelete ? <MoonLoader size='14' color='#ffffff'/> : <Trash/>}
          </Button>
        </div>

        <img src={url?.qr} alt="URL QR" className='h-50 w-50 object-cover ring-3 ring-blue-500 self-start rounded-sm' />


      </div>

      <Card className='sm:w-3/5'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Stats</CardTitle>
        </CardHeader>

        {
        clicks && clicks?.length ? 

        <CardContent className='flex flex-col gap-6'>

          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>

            <CardContent>
              <p>{clicks?.length}</p>
            </CardContent>
          </Card>

          <CardTitle>Location Data</CardTitle>
          <LocationStats stats={clicks}/>

          <CardTitle>Device Data</CardTitle>
          <DeviceStats stats={clicks} />

        </CardContent> :

        <CardContent>
          {loadingClicks ? <MoonLoader size='20' color='#ffffff'/> : <span>No stats yet</span>}
        </CardContent>
        }
      </Card>

    </div>
    </>
  )
}

export default Link
