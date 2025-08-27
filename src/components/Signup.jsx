import React, { useEffect, useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {BeatLoader, DotLoader, PacmanLoader} from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login, signup } from '@/db/auth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Signup = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        profile_pic: null
    })

    const [errors, setErrors] = useState({});
    const {data, loading, error, fn: fnSignup} = useFetch(signup, formData)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const longLink = useRef(searchParams.get("createNew")).current

    useEffect(()=>
    {
        if (error === null && data)
        {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
        }

    }, [data, error])

    function handleInputChange (e)
    {
        const {name, value, files} = e.target
        setFormData ((prev) => ({...prev, [name]: files? files[0] : value}))
    }

    async function handleSignup ()
    {
        setErrors({})
        
        try 
        {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(6, "Password must have at least 6 characters").required("Password is required"),
                name: Yup.string().required("Name is required"),
                profile_pic: Yup.mixed().required("Profile Pic is required")
            })

            await schema.validate(formData, {abortEarly: false})
            await fnSignup()
        }
        catch (err)
        {
            let newErr = {}


            err?.inner?.forEach ((e) => {
                newErr[e.path] = e.message
            })

            setErrors ({...newErr})
        }
    }

  return (
    <div>
      
    <Card>
        <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>Create an account, if you not have one</CardDescription>
            {error && <Error message={error.message}/>}
            {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>

        <CardContent className='space-y-2'>
            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='text' name='name' placeholder='Enter Name' />
            {errors.name && <Error message={errors.name}/>}
            </div>

            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='email' name='email' placeholder='Enter email' />
            {errors.email && <Error message={errors.email}/>}
            </div>

            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='password' name='password' placeholder='Enter password' />
            {errors.password && <Error message={errors.password}/>}
            </div>

            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='file' name='profile_pic' accept='image/*' />
            {errors.profile_pic && <Error message={errors.profile_pic}/>}
            </div>
        </CardContent>

        <CardFooter className='w-full flex justify-center items-center'>
            {
                loading ?
                <PacmanLoader color='#ffffff' size={15} speedMultiplier={4} className='w-full'/> :
                <Button className='w-full' onClick={handleSignup}>Create Account</Button>
            }
        </CardFooter>
    </Card>

    </div>
  )
}

export default Signup
