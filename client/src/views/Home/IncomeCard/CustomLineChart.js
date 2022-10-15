import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CustomLineChart = ({ data }) => {

    const jsonData = JSON.stringify(data);
    const convertedData = JSON.parse(jsonData);
    
    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={convertedData}
        >
          <Tooltip />
          <Line 
              type="monotone" 
              dataKey="scales" 
              stroke="#6F6AF8" 
              dot={false}
              width={3}
              strokeWidth={2}
             />
            <XAxis dataKey={"Date"} display={"none"} />
        </LineChart>
      </ResponsiveContainer>
    );
}