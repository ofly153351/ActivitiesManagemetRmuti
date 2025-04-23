import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarChartBasic({ insideCounts }) {
  // ใช้ optional chaining + nullish coalescing เพื่อจัดการ null
  const monthlyCounts = Array(12).fill(0);

  (insideCounts ?? []).forEach(({ month, count }) => {
    if (month >= 1 && month <= 12) {
      monthlyCounts[month - 1] = count;
    }
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: '100%' }}>
        <BarChart
          series={[{ data: monthlyCounts }]}
          height={440}
          xAxis={[{
            data: [
              'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
              'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
            ],
            scaleType: 'band'
          }]}
        />
      </div>
    </div>
  );
}