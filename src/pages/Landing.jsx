import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const [longUrl, setLongUrl] = useState("")
  const navigate = useNavigate()
  
  function handleSnap (e)
  {
    e.preventDefault()
    
    if (longUrl)
      navigate (`/auth?createNew=${longUrl}`)
  }


  return (
    <div className='flex flex-col items-center'>
  
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-bold'>
        The only URL Shortener <br /> you&rsquo;ll need!
      </h2>

      <form onSubmit={handleSnap} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2' >
        <Input value={longUrl} onChange={(e)=> setLongUrl(e.target.value)} type='url' placeholder='Enter your long URL' className='h-full flex-1 py-4 px-4'/>
        <Button type='submit' className='h-full text-1xl font-bold' >Snap</Button>
      </form>

      <img src="/banner.png" className='w-8/10 rounded-lg my-11 md:mx-11' alt="" />

      <Accordion type="multiple" collapsible className='w-full md:px-11'>

        <AccordionItem value="item-1">
          <AccordionTrigger>1. What is a URL Shortener?</AccordionTrigger>
          <AccordionContent>
            A URL shortener is a tool that takes a long web link and converts it into a shorter, easy-to-share link. When someone clicks the short link, they are redirected to the original long URL.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>2. Is it free to use?</AccordionTrigger>
          <AccordionContent>
            Yes! Our URL shortener is completely free. You can shorten as many links as you want without any hidden charges.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>3. Can I track the number of clicks on my link?</AccordionTrigger>
          <AccordionContent>
            Yes, our shortener provides basic analytics. You can see how many times your shortened link has been clicked and get insights into link performance.
          </AccordionContent>
        </AccordionItem>

      </Accordion>

    </div>
  )
}

export default Landing
