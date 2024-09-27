import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function StatusStorageConditionlssuingBarModel() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: {
          top: 5,
          left: 129,
          right: 30,
          bottom: 10
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
          data: ['Issuing Completed', "Partially Completed", "Issuing", "Ready FOr Issue", "Picking Activated", "Ready For Picking", "Notification"],
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
              { value: 4, itemStyle: { color: '#4E3608' } },
              { value: 1, itemStyle: { color: '#794D00' } },
              { value: 1, itemStyle: { color: '#A16600' } },
              { value: 4, itemStyle: { color: '#BB7C00' } },
              { value: 2, itemStyle: { color: '#D59007' } },
              { value: 1, itemStyle: { color: '#DDB672' } },
              { value: 2, itemStyle: { color: '#E9D7A7' } }
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

export default StatusStorageConditionlssuingBarModel;