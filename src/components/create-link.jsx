import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Error from './Error'
import { Card } from './ui/card'
import { UserState } from '@/context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import QRCode from 'react-qrcode-logo'
import useFetch from '@/hooks/use-fetch'
import { createUrl } from '@/db/apiUrl'
import { BeatLoader, MoonLoader } from 'react-spinners'

const CreateLink = () => {

    const {data: user} = UserState()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let longUrl = searchParams.get("createNew")
    const ref = useRef()
    const [errors, setErrors] = useState({})


    
    const [formData, setFormData] = useState({
        title: "",
        original_url: longUrl || "",
        custom_url: ""
    })

    const {loading, error, data, fn: fnCrateLink} = useFetch(createUrl, {...formData, user_id: user?.id})

    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        original_url: Yup.string().url("Invalid URL").required("Original URL is required"),
        custom_url: Yup.string()
    })

    function handleInputChange (e)
    {
        const {name, value} = e.target
        setFormData ((prev) => ({...prev, [name]: value}))
    }

    async function submitHandler ()
    {
        setErrors ({})
        // console.log("hi")
        // console.log(ref.current.canvasRef.current)

        try
        {
            await schema.validate(formData, {abortEarly: false})
            const canvas = ref.current?.canvasRef?.current

            const blob = await new Promise((resolve)=> canvas.toBlob(resolve))
            await fnCrateLink (blob)
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

    useEffect(()=>
    {
        if (error === null && data)
        {
            // console.log(data)
            navigate(`/link/${data[0].id}`)
        }
    }, [data, error])

  return (
    <div>
      <Dialog defaultOpen={longUrl} onOpenChange={(res)=> {if (!res) setSearchParams ({})}}>
        <DialogTrigger><Button>Create Link</Button></DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle className='font-bold text-2xl'>Create New Link</DialogTitle>
            </DialogHeader>

            {formData.original_url && <div className='h-32 ring-0 sm:w-32 sm:ring-3 ring-blue-500 overflow-hidden flex items-center justify-center rounded-sm'><QRCode size='110' value={formData?.original_url} ref={ref}/></div>}

            <div>
                <Input name='title' value={formData.title} onChange={handleInputChange} placeholder='URL Title'/>
                {errors.title && <Error message={errors.title}/>}
            </div>

            <div>
                <Input name='original_url' value={formData.original_url} onChange={handleInputChange} placeholder='Original URL'/>
                {errors.original_url && <Error message={errors.original_url}/>}
            </div>

            <div className='flex items-center gap-2'>
                <Card className='p-2'>snap.in</Card>
                /
                <Input name='custom_url' value={formData.custom_url} onChange={handleInputChange} placeholder='Custom URL (Optional)'/>
                {errors.custom_url && <Error message={errors.custom_url}/>}
            </div>

            <DialogFooter className='justify-end'>
                {   
                    loading ? 
                    <BeatLoader size={'12'} color='#ffffff'/>:
                    <Button onClick={submitHandler}>Create</Button>
                }
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateLink
