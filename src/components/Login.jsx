import React, { useEffect, useRef, useState } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {BeatLoader, DotLoader, PacmanLoader} from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import useFetch from '@/hooks/use-fetch'
import { login } from '@/db/auth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const {data, loading, error, fn: fnLogin} = useFetch(login, formData)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const longLink = useRef(searchParams.get("createNew")).current


    useEffect(()=>
    {
        if (error === null && data)
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)

    }, [data, error])

    function handleInputChange (e)
    {
        const {name, value} = e.target
        setFormData ((prev) => ({...prev, [name]: value}))
    }

    async function handleLogin ()
    {
        setErrors({})
        
        try 
        {
            const schema = Yup.object().shape({
                email: Yup.string().email("Invalid Email").required("Email is required"),
                password: Yup.string().min(6, "Password must have at least 6 characters").required("Password is required")
            })

            await schema.validate(formData, {abortEarly: false})
            await fnLogin()
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
            <CardTitle>Login</CardTitle>
            <CardDescription>to your account, if you already have one</CardDescription>
            {error && <Error message={error.message}/>}
            {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>

        <CardContent className='space-y-2'>
            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='email' name='email' placeholder='Enter email' />
            {errors.email && <Error message={errors.email}/>}
            </div>

            <div className='space-y-1'>
            <Input onChange = {handleInputChange} type='password' name='password' placeholder='Enter password' />
            {errors.password && <Error message={errors.password}/>}
            </div>
        </CardContent>

        <CardFooter className='w-full flex justify-center items-center' onClick={handleLogin}>
            {
                loading ?
                <PacmanLoader color='#ffffff' size={15} speedMultiplier={4} className='w-full'/> :
                <Button className='w-full' >Login</Button>
            }
        </CardFooter>
    </Card>

    </div>
  )
}

export default Login
