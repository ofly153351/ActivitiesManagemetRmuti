import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartBasic() {
  return (
    <BarChart
      series={[
        { data: [10, 20, 15, 30, 25, 18, 22, 17, 28, 35, 40, 31] }, // ตัวอย่างข้อมูล 12 เดือน
      ]}
      height={440}
      xAxis={[{
        data: [
          'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
          'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ],
        scaleType: 'band'
      }]}
    />
  );
}