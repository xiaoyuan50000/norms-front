import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


function StorageBarModel({ data, onAddTask, scsTableHeaders, scsDatas }) {
  const chartRef = useRef(null);

  const xAxisData = []
  const seriesData1 = []
  const seriesData2 = []
  const seriesData3 = []

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      data.forEach(o => {
        xAxisData.push(o.key);
        seriesData1.push(o.value[0] || 0);
        seriesData2.push(o.value[1] || 0);
        seriesData3.push(o.value[2] || 0);
      });

      // Calculate the sum of each column and the percentage of each field.
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

      myChart.setOption({
        grid: {
          top: '20px',
          left: '15px',
          right: '15px',
          bottom: '0px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
            }
          },
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
              color: function (params) {
                const index = xAxisData.indexOf(params.name);
                return index === -1 ? '#C29C63' : (xAxisData.indexOf('SKU3') === index ? '#D73E3D' : (xAxisData.indexOf('PB2') === index ? '#020E50' : '#C29C63'));
              }
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
            barWidth: '50%'
          },
          {
            name: '',
            type: 'bar',
            stack: 'value',
            stackStrategy: 'all',
            data: totalData.map(item => parseFloat(item.percentages[1])),
            itemStyle: {
              color: function (params) {
                const index = xAxisData.indexOf(params.name);
                return index === -1 ? '#C29C63' : (xAxisData.indexOf('SKU3') === index ? '#FFD1D1' : (xAxisData.indexOf('PB2') === index ? '#98A1C3' : '#ECDFB8'));
              }
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
            data: totalData.map(item => item.total),
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
              formatter: `{c}`
            }
          }
        ]
      });

      window.addEventListener('resize', myChart.resize);

      myChart.on('finished', function () {
        myChart.resize();
      });

      myChart.on('click', function (params) {
        const type = params.name
        const title = 'Storage Capacity Status - ' + type


        onAddTask({ title: title, tableHeaders: scsTableHeaders, data: scsDatas })
      });

      // Cleanup function when the component will unmount
      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return (
    <div ref={chartRef} style={{ minHeight: '100%', minWidth: '100%', paddingBottom: '15px' }} />
  );
}

export default StorageBarModel