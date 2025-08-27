import supabase from "./supabase";

export async function login ({email, password}) 
{
    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if (error)
        throw new Error(error.message)

    return data
}

export async function getCurrentUser () 
{
    const {data, error} = await supabase.auth.getSession()

    if (!data.session)
    return null

    if (error)
    throw new Error (error.message)

    return data.session?.user
}

export async function signup ({name, email, password, profile_pic}) 
{
    const filename = `dp-${name.split(" ").join("-")}-${Math.random()}`
    const {error: storageError} = await supabase.storage.from("profile pic").upload(filename, profile_pic)

    if (storageError) 
    throw new Error (storageError.message)

    const {data: userData, error} = await supabase.auth.signUp(
    {
        email, 
        password,
        options : 
        {
            data : 
            {
                name, 
                profile_pic: `https://fgskfnbrpkxvazmlxjsj.supabase.co/storage/v1/object/public/profile%20pic/${filename}`
            }
        }
    })

    if(error)
    throw new Error (error.message)

    return userData

}

export async function logout () 
{
    const {error} = await supabase.auth.signOut()

    if (error)
    throw new Error (error.message)
}