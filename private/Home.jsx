import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { axiosInstance } from '../src/api';
import UserContext from "../context/userContext";
import { LineChart } from '@mui/x-charts/LineChart';



const Home = () => {
  const { data } = useContext(UserContext);
  console.log(data)
 
  return (
    <div>
      <Typography variant='h5' sx={{ fontWeight: "bold", paddingY: 5 }}>
        Welcome <span style={{ color: "green" }}>{data.first_name} {data.last_name}</span>, From Equipe Africa Shining Fuel
      </Typography>
      <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
     
    </div>
  );
}

export default Home;