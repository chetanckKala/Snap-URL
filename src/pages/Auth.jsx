import Login from '@/components/Login'
import Signup from '@/components/Signup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserState } from '@/context'
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Auth = () => {

  const [searchParams] = useSearchParams()
  const longLink = searchParams.get("createNew")
  const {loading, isAuthenticated} = UserState()
  const navigate = useNavigate()

  useEffect (()=>
  {
    if (!loading && isAuthenticated)
    navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
  }, [loading, isAuthenticated])

  return (
    <div className='mt-8 flex flex-col items-center gap-10'>
      
      {
        searchParams.get("createNew") ?
        <h1 className='text-5xl font-bold'>Hold up! let's Login first</h1> :
        <h1 className='text-5xl font-bold'>Login / Signup</h1>
      }

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        <TabsContent value="login"><Login/></TabsContent>
        <TabsContent value="signup"><Signup/></TabsContent>
      </Tabs>

    </div>
  )
}

export default Auth
