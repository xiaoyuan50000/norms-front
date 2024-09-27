import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DetailStockEchartsModel = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: {
          left: '7%',
          right: '0%'
        },
        color: ['#5270C6', '#91CB74', '#FAC855'],
        legend: {
          right: 0,
          itemWidth: 15,
          textStyle: {
            fontWeight: 560
          }
        },

        dataset: {
          source: [
            ['product', 'New', 'Unprocessed', 'Processed'],
            ['$2', 430, 850, 930],
            ['$5', 830, 730, 550],
            ['$10', 860, 550, 430],
            ['$50', 720, 430, 850],
            ['$100', 720, 530, 390],
          ]
        },
        xAxis: {
          type: 'category',
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
          type: 'value',
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: function (value) {
              let thousand = value;
              if (value >= 1000) {
                thousand = value / 1000 + 'k';
              } else {
                thousand = value
              }
              return thousand;

            },
            textStyle: {
              fontWeight: 600
            }
          },
        },
        series: [
          { type: 'bar', barWidth: 25 },
          { type: 'bar', barWidth: 25 },
          { type: 'bar', barWidth: 25 }]
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
    <div ref={chartRef} style={{ minHeight: '300px' }}></div>
  );
};

export default DetailStockEchartsModel;