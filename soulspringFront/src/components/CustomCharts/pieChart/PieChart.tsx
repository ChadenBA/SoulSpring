import { PieChart } from '@mui/x-charts/PieChart';
import { Container } from './PieChart.style';
import { PieChartProps } from './PieChart.type';
import { Typography } from '@mui/material';

const PieChartComponent = ({ data, title }: PieChartProps) => {
  const pieParams = { height: 200 };
  const palette = [
    '#ffcab0',
    '#9896f1',
    '#d59bf6',
    '#edb1f1',
    '#f4c2f2',
    '#f9d7f4',
    '#98d9e7',
    '#b5e7f4',
    '#c9f0f8',
    '#e3f9f7',
    '#f0f9f4',
    '#f6f9ea',
    '#f9f8d8',
    '#f9f3c7',
    '#f9eeb9',
    '#f9e4b9',
    '#f9dab9',
    '#f9d0b9',
    '#f9c6b9',
    '#f9bcb9',
    '#f9b2b9',
    '#f9a8b9',
    '#f99eb9',
    '#f994b9',
    '#f98ab9',
    '#f980b9',
    '#f976b9',
    '#f96cb9',
    '#f962b9',
    '#f958b9',
    '#f94eb9',
    '#f944b9',
    '#f93ab9',
    '#f930b9',
    '#f926b9',
    '#f91cb9',
    '#f912b9',
    '#f908b9',
    '#f900b9',
    '#fcd5ce',
    '#f8edeb',
    '#f9dcc4',
    '#fae1dd',
    '#ffcfdf',
    '#d1e7dd',
    '#d5e1df',
    '#d3d3d3',
    '#e4c5af',
    '#ffb3c1',
    '#ffdde1',
    '#d3e0dc',
    '#c8d5b9',
    '#ffe8d6',
    '#faedcb',
    '#fefae0',
    '#e8e8e4',
    '#f4b0c7',
    '#c2b0f4',
    '#b0e1f4',
    '#b0f4e4',
    '#b0f4c2',
    '#e4f4b0',
    '#f4f4b0',
    '#f4d1b0',
    '#f4b0b0',
    '#f4b0e1',
    '#d1b0f4',
    '#b0c2f4',
    '#b0d1f4',
    '#b0f4d1',
    '#b0f4c2',
    '#b0f4b0',
    '#d1f4b0',
    '#e1f4b0',
    '#f4e1b0',
    '#f4d1b0',
    '#f4b0d1',
    '#f4b0e1',
    '#f4b0f4',
    '#e1b0f4',
    '#d1b0f4',
    '#c2b0f4',
    '#b0d1f4',
    '#b0e1f4',
    '#b0f4e1',
    '#b0f4d1',
    '#b0f4c2',
    '#b0f4b0',
  ];

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <PieChart
        colors={palette}
        {...pieParams}
        series={[
          {
            data: data?.map((item, index) => ({
              id: index,
              value: item.value,
              label: item.title,
            })),
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
      />
    </Container>
  );
};

export default PieChartComponent;
