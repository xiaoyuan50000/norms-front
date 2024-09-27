import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function StatusStorageConditionReceivingBarModel() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: {
          top: 5,
          left: 129,
          right: 30,
          bottom: 20
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['Notification', "Ready To Receive", "Receiving", "Receiving Completed", "Issuing Completed"],
          axisLabel: {
            align: 'left',
            margin: 110,
            fontSize: 10,
            color: "#1F1F1F"
          }
        },
        series: [
          {
            type: 'bar',
            data: [
              { value: 4, itemStyle: { color: '#1A375E' } },
              { value: 1, itemStyle: { color: '#3665A3' } },
              { value: 1, itemStyle: { color: '#4E89D5' } },
              { value: 4, itemStyle: { color: '#8FBDF0' } },
              { value: 2, itemStyle: { color: '#BAD0EB' } }
            ],
            barWidth: 15,
            label: {
              show: true,
              position: 'right',
              formatter: '{c}'
            }
          }
        ]
      });
      window.addEventListener('resize', myChart.resize);

      myChart.on('finished', function () {
        myChart.resize();
      });

      // Cleanup function when the component will unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []);
  return (
    <div ref={chartRef} style={{ minHeight: '100%', width: "100%" }} />
  );
}

export default StatusStorageConditionReceivingBarModel;