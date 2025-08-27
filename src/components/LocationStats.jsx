import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function LocationStats({stats}) {

    const cityCount = stats.reduce ((acc, item) =>
    {
        if (acc[item.city])
            acc[item.city] += 1
        
        else
            acc[item.city] = 1

        return acc
    }, {})

    const cities = Object.entries(cityCount).map(([city, count]) => ({city, count}))


  return (
    <div className='w-[100%] h-64'>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={cities}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip labelStyle={{color: 'green'}} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
      
    </div>
  );
}
