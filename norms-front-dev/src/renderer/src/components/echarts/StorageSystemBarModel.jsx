import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function StorageSystemBarModel() {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const xAxisData = ['SKU1', 'SKU2', 'SKU3', 'SKU4', 'PB1', 'PB2', 'VLT1', 'VLT2', 'VLT3'];
      const seriesData1 = [20, 20, 20, 20, 20, 20, 20, 20, 20];
      const seriesData2 = [60, 160, 45, 45, 100, 120, 60, 15, 50];
      const seriesData3 = [150, 60, 60, 130, 15, 30, 80, 150, 50];

      const totalData = xAxisData.map((item, index) => {
        const total = seriesData1[index] + seriesData2[index] + seriesData3[index];
        return {
          total, percentages: [
            (seriesData1[index] / total * 100).toFixed(2),
            (seriesData2[index] / total * 100).toFixed(2),
            100 - (seriesData1[index] / total * 100).toFixed(2) - (seriesData2[index] / total * 100).toFixed(2)
          ]
        };
      });

      const topData = totalData.map(item => item.total)

      myChart.setOption({
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLabel: {
            formatter: '{value}%' 
          }
        },
        series: [
          {
            name: '',
            type: 'bar',
            stack: 'value',
            stackStrategy: 'all',
            data: totalData.map(item => parseFloat(item.percentages[0])),
            itemStyle: {
              color: '#2A3675'
            },
            label: {
              show: true,
              position: 'inside',
              formatter: function (params) {
                const index = xAxisData.indexOf(params.name);
                return `${seriesData1[index]}`;
              }
            },
            // radius: ['50%', '70%'],
            barWidth: 26,
          },
          {
            name: '',
            type: 'bar',
            stack: 'value',
            stackStrategy: 'all',
            data: totalData.map(item => parseFloat(item.percentages[1])),
            itemStyle: {
              color: '#C0C8E4'
            },
            label: {
              show: true,
              position: 'inside',
              formatter: function (params) {
                const index = xAxisData.indexOf(params.name);
                return `${seriesData2[index]}`;
              }
            }
          },
          {
            name: '',
            type: 'bar',
            stack: 'value',
            stackStrategy: 'all',
            data: totalData.map(item => parseFloat(item.percentages[2])),
            itemStyle: {
              color: '#ECEFF3'
            },
            label: {
              show: true,
              position: 'inside',
              formatter: function (params) {
                const index = xAxisData.indexOf(params.name);
                return `${seriesData3[index]}`;
              }
            }
          },
          {
            name: '',
            type: 'bar',
            stack: 'value',
            stackStrategy: 'all',
            data: topData,
            itemStyle: {
              color: '#ECEFF3'
            },
            emphasis: {
              itemStyle: {
                color: '#ECEFF3'
              }
            },
            label: {
              show: true,
              position: 'top',
              // formatter: function (params) {
              //   console.log(params.value);
              //   const index = xAxisData.indexOf(params.name);
              //   return `${seriesData3[index]}`;
              // }
              formatter: `{c}`
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
    <div ref={chartRef} style={{ minHeight: '100%', minWidth: '100%' }} />
  );
}

export default StorageSystemBarModel