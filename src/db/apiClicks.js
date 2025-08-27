import { UAParser } from "ua-parser-js";
import supabase from "./supabase";
const parser = new UAParser()

export async function getClicks(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

export async function storeClicks ({id, original_url})
{
    try 
    {
        const res = parser.getResult()
        const device = res.device.type || "desktop"

        const response = await fetch ("https://ipapi.co/json")
        const {city, country_name: country} = await response.json()

        await supabase.from("clicks").insert(
        {
            url_id: id, city, country, device
        })
        
        console.log("Redirecting to:", original_url);
        window.location.href = original_url
    }
    catch (error)
    {
        console.error("Error storing click:", error);
        throw new Error (error.message)
    }
}

export async function getClicksData(id) {
  // console.log ("get clicks data fn", id)
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", id)

  if (error) 
  {
    // console.log ("error in get clicks data")
    throw new Error(error.message);
  }

  return data;
}