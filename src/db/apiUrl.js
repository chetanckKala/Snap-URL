import supabase from "./supabase";

export async function getUrl(user_id) 
{
    const {data: urlData, error} = await supabase.from('url').select('*').eq("user_id", user_id)

    if (error) 
    throw new Error(error.message);

    return urlData
}

export async function deleteUrl(id) 
{
    const {data: urlData, error} = await supabase.from('url').delete().eq("id", id).select("*")

    if (error) 
    throw new Error(error.message);

    return urlData
}

export async function createUrl({title, original_url, custom_url, user_id}, qrImg) 
{
    const short_url = Math.random().toString(36).substring(2, 6)
    const filename = `qr-${short_url}`

    const {error: storageError} = await supabase.storage.from("qr").upload(filename, qrImg)

    if (storageError) 
    throw new Error(storageError.message);

    const qr = `https://fgskfnbrpkxvazmlxjsj.supabase.co/storage/v1/object/public/qr/${filename}`

    const {data: urlData, error: urlError} = await supabase.from('url').insert(
    {
        title, 
        original_url, 
        custom_url: custom_url ? custom_url : null, 
        short_url, 
        user_id,
        qr
    }).select()

    if (urlError)
    throw new Error (urlError.message)

    return urlData
}

export async function getLongUrl (id)
{
    const {data, error} = await supabase.from("url").select("id, original_url").or(`short_url.eq.${id}`, `custom_url.eq.${id}`).single()

    if (error)
    throw new Error (error.message)

    return data
}

export async function getUrlById ({url_id, user_id})
{
    console.log ("get url fn", url_id, user_id)
    const {data, error} = await supabase.from("url").select("*").eq("id", url_id).eq("user_id", user_id).single()

    if (error)
    {
        console.log ("error in get url by id")
        throw new Error (error.message)
    }

    return data
}

