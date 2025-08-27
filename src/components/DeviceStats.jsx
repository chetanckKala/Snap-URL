import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default function DeviceStats({stats}) {

    const deviceCount = stats.reduce ((acc, item) =>
    {
        if (acc[item.device])
            acc[item.device] += 1
        
        else
            acc[item.device] = 1

        return acc
    }, {})


    const devices = Object.entries(deviceCount).map(([device, count]) => ({device, count: deviceCount[device]}))


  return (
    <div className='w-[100%] h-64'>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        
        <Pie data={devices} labelLine='false' label={({device, percent}) => `${device}: ${(percent*100).toFixed(0)}%`} dataKey="count" outerRadius={80} fill="#8884d8">
        {devices.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}
