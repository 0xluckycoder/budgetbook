import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LoadingSpinner } from "../../../components/LoadingSpinner/LoadingSpinner";

export const CustomLineChart = ({ data, isContentLoading }) => {

  // const jsonData = JSON.stringify(data.data);
  // const convertedData = JSON.parse(jsonData);
    
  return (
    data &&
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.data}
      >
        <Tooltip />
        <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#6F6AF8" 
            dot={false}
            width={3}
            strokeWidth={2}
            />
          <XAxis dataKey={"transactionDate"} display={"none"} />
      </LineChart>
    </ResponsiveContainer>
  );
}