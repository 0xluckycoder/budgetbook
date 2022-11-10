import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CustomLineChart = ({ data, isContentLoading }) => {

  const [dataState, setDataState] = useState([]);

  useEffect(() => {
    if (data.data) {
      const stringKeyFormat = data.data.map(item => {
        return {
          "amount": parseInt(item.amount)
        }
      });
      setDataState(stringKeyFormat);
    }
  }, [data.data]);

    
  return (
    dataState &&
    <ResponsiveContainer width="100%" height="100%">                     
    <LineChart height={100} data={dataState} >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      {/* <XAxis dataKey="name" /> */}
      {/* <YAxis /> */}
      <Tooltip />
      {/* <Legend /> */}
      <Line 
        stroke="#6F6AF8" 
        dot={false}
        width={3}
        strokeWidth={2}
        type="monotone" 
        dataKey="amount" 
      />
    </LineChart>
    </ResponsiveContainer>
  );
}