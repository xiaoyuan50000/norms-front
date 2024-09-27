import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const StorageLocationEchartsModel = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const label = {
      show: true,
      fontSize: 10,
      fontWeight: 600,
      position: 'right',
      bottom: 0,
    }

    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: {
          top: 0,
          left: '100px',
        },

        color: ['#EC7D2C', '#39B14A', '#5A9ACA', '#DDDDDD'],
        legend: {
          bottom: 0,
          itemWidth: 15,
          textStyle: {
            fontWeight: 560
          }
        },

        dataset: {
          source: [
            ['product', 'Used', 'Unused', 'Reserved', 'Locked'],
            ['Vault Crane 3', 133, 102, 146, 78],
            ['Vault Crane 2', 133, 345, 45, 78],
            ['Vault Crane 1', 54, 102, 146, 78],
            ['SKU 4', 133, 534, 146, 78],
            ['SKU 3', 133, 44, 54, 78],
            ['SKU 2', 67, 66, 75, 78],
            ['SKU 1', 133, 56, 146, 78],
            ['PB2', 133, 102, 43, 78],
            ['PB1', 123, 23, 23, 78],
          ]
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              fontWeight: 600
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: true,
          },
          axisLabel: {
            textStyle: {
              fontWeight: 600
            }
          }
        },
        series: [
          { type: 'bar', label: label },
          { type: 'bar', label: label },
          { type: 'bar', label: label },
          { type: 'bar', label: label }
        ],
        barCategoryGap: '30px'
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
  }, []); // Empty array ensures this effect runs once on mount

  return (
    <div ref={chartRef} style={{ minHeight: '700px', height: '100%' }}></div>
  );
};

export default StorageLocationEchartsModel;