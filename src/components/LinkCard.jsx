import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Check, Copy, Delete, Download, Trash } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrl'
import { MoonLoader } from 'react-spinners'

const LinkCard = ({url, fetchUrl}) => {

    // console.log (url)
    const {loading, fn: fnDelete} = useFetch(deleteUrl, url?.id)
    const [copied, setCopied] = useState(false)

    const handleDownload = () =>
    {
        const anchor = document.createElement("a")
        anchor.href = url?.qr
        anchor.download = url?.title

        document.body.appendChild(anchor)
        anchor.click()

        document.body.removeChild(anchor)
    }

    function handleCopy ()
    {
      navigator.clipboard.writeText(`htttps://snap.in/${url?.custom_url ? url?.custom_url : url?.short_url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }

  return (
    <div className='flex flex-col mb-4 md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>

      <img src={url?.qr} alt="URL QR" className='h-32 w-32 object-cover ring-3 ring-blue-500 self-start rounded-sm' />

      <Link to={`/link/${url?.id}`} className='flex-1 flex flex-col gap-3 md:gap-0'>
      <span className='text-2xl font-bold cursor-pointer'>{url?.title}</span>
      <span className='text-1xl font-bold text-blue-400 hover:underline'>{`htttps://snap.in/${url?.custom_url ? url?.custom_url : url?.short_url}`}</span>
      <span className='hover:underline flex-1 text-1xl mb-2'>{url?.original_url}</span>
      <span className='flex items-end text-sm font-extralight flex-1 text-gray-400'>{new Date(url?.created_at).toLocaleString()}</span>
      </Link>

      <div className='flex md:flex-col lg:flex-row'>
        <Button variant={"ghost"} onClick={handleCopy}>{copied ? <Check/> : <Copy/>}</Button>
        <Button variant={"ghost"} onClick={handleDownload}><Download/></Button>
        <Button variant={"ghost"} onClick={()=> fnDelete().then(()=> fetchUrl())}>
            {loading ? <MoonLoader size='14' color='#ffffff'/> : <Trash/>}
        </Button>
      </div>

    </div>
  )
}

export default LinkCard
