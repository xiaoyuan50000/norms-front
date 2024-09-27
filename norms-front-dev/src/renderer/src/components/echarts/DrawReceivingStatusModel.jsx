import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function ReceivingStatusModel({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const yAxisCategories = ['Notification', 'Ready to Receive', 'Receiving', 'Partially Completed', 'Issuing Completed'];
      const colorMap = {
        'Notification': '#375723',
        'Ready to Receive': '#8337A5',
        'Receiving': '#456CEF',
        'Partially Completed': '#3DC9C9',
        'Issuing Completed': '#FC8452'
      };

      const entries = data.map(item => [item.receivingStatus, item.rs_count]);
      const newObject = Object.fromEntries(entries);
      const seriesData = yAxisCategories.map(category => ({
        value: newObject[category] || 0,
        itemStyle: {
          color: colorMap[category] || '#defaultColor'
        }
      }));

      myChart.setOption({
        grid: {
          top: "30px",
          left: "135px",
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
          data: yAxisCategories,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          nameTextStyle: {
            align: "left"
          },
        },
        series: [{
          data: seriesData,
          type: 'bar',
          barWidth: 16,
          label: {
            show: true,
            position: 'right',
            formatter: '{c}', 
            fontSize: 16,
            fontWeight: 'bold'
          },
        }]
      });
    }
  }, [data]);
  return (
    <div ref={chartRef} style={{ minHeight: '300px', width: "330px" }} />
  );
}

export default ReceivingStatusModel