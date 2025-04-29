import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const BarChartComponent = ({ title, data }: { title: string; data: { name: string; value: number }[] }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#ffcab0" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default BarChartComponent;
