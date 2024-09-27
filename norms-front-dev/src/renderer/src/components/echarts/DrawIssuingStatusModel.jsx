import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function DrawIssuingStatusModel({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const yAxisCategories = ['Issuing Completed', 'Partially Completed', 'Issuing', 'Ready for Issue', 'Picking Activated', 'Ready for Picking', 'Notification'];
      const colorMap = {
        'Issuing Completed': '#375723',
        'Partially Completed': '#8337A5',
        'Issuing': '#BD8BF8',
        'Ready for Issue': '#FAC858',
        'Picking Activated': '#4FB2D6',
        'Ready for Picking': '#49A81C',
        'Notification': '#FC8452'
      };

      const entries = data.map(item => [item.issuingStatus, item.rs_count]);
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
          left: "140px",
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
    <div ref={chartRef} style={{ minHeight: '420px', width: "328px" }} />
  );
}

export default DrawIssuingStatusModel