import React, { useCallback } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;

function Chart({ data }) {
  const renderCustomizedLabel = useCallback(
    ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {data[index].name} {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    },
    [data]
  );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Tooltip />
        <Pie
          label={renderCustomizedLabel}
          labelLine={false}
          startAngle={180}
          endAngle={0}
          data={data}
          dataKey="value"
          nameKey="name"
          fill="#3f51b5"
        >
          {' '}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Chart;
