import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenuSeparator } from './ui/dropdown-menu';
import { LinkIcon, LogOutIcon } from 'lucide-react';
import { UserState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/auth';
import { BarLoader } from 'react-spinners';

const Header = () => {

  const navigate = useNavigate();
  const {isAuthenticated, data: user, fetchUser} = UserState()
  const {loading, error, fn: fnLogout} = useFetch(logout)

  // if (isAuthenticated)
  // console.log (user)

  async function handleLogout () 
  {
    fnLogout().then (()=>
    {
      fetchUser()
      navigate("/")
    })
  }

  return (
    <>
    <nav className='py-4 flex justify-between items-center'>

    <Link to='/'>
    <img src="./logo.png" className='h-12' alt="Logo" />
    </Link>

    <div>
    {
      !isAuthenticated ?
      (<Button onClick={() => navigate('/auth')} >Login</Button>) :
      (
        <DropdownMenu>
          <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
            <Avatar>
              <AvatarImage src={user?.user_metadata?.profile_pic} className='object-cover' />
              <AvatarFallback>CK</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className='mr-10 mt-2'>
            <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className='mr-2 h-4 w-4'/>

              <span onClick={() => navigate('/dashboard')}>My Links</span>

            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className='mr-2 h-4 w-4'/>
              <span >Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    </div>


    </nav>

    {loading && <BarLoader className='mb-4 ml-[10%]' width={'80%'} color='#ffffff' />}

    </>
  )
}

export default Header
