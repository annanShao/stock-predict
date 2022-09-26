import { StepLineChart } from 'bizcharts';

// 数据源
const data = [
  { day: '08.01', value: 3 },
  { day: '08.02', value: 4 },
  { day: '08.03', value: 5 },
  { day: '08.04', value: 4 },
  { day: '08.05', value: 5 },
  { day: '08.06', value: 6 },
  { day: '08.07', value: 7 },
  { day: '08.08', value: 6 },
  { day: '08.09', value: 5 },
];

const Demo = () => {
  return (
    <div>
      <StepLineChart
      
      data={data}
      xField='day'
      yField='value'
      step="vh"
    />
    </div>
  );
}

// ReactDOM.render(<Demo />, mountNode);
export default Demo;