import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function DrawNpmModel({ data }) {
  const chartRef = useRef(null);


  const setSummarizedData = function(statuses, data, summarizedData, price){
    statuses.forEach(status => {
      data.forEach(item => {
        if (item.product === price && item.npmStatus === status) {
          summarizedData[price][status] = item.amount_sum;
        }
      });
    });
  }

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      const prices = ['$100', '$50', '$10'];
      const statuses = ['New', 'Processed', 'Unprocessed'];

      const summarizedData = {}
      prices.forEach(price => {
        summarizedData[price] = {};
        // statuses.forEach(status => {
        //   data.forEach(item => {
        //     if (item.product === price && item.npmStatus === status) {
        //       summarizedData[price][status] = item.amount_sum;
        //     }
        //   });
        // });
        setSummarizedData(statuses, data, summarizedData, price)
      });

      const x_name = Object.keys(summarizedData).reverse();

      const series = [
        {
          name: 'Processed',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}', 
            fontSize: 14,
            fontWeight: 'bold',
            position: 'top'
          },
          barWidth: 16,
          data: Array(x_name.length + 1).fill(0),
          color: "#64A519"
        },
        {
          name: 'Unprocessed',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 14,
            fontWeight: 'bold',
            position: 'top'
          },
          data: Array(x_name.length + 1).fill(0),
          color: "#F84141"
        },
        {
          name: 'New',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 14,
            fontWeight: 'bold',
            position: 'top'
          },
          data: Array(x_name.length + 1).fill(0),
          color: "#0A9FBA"
        },

        {
          name: 'w',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{c}',
            fontSize: 14,
            fontWeight: 'bold',
            position: 'right'
          },
          data: Array(x_name.length + 1).fill(0),
          color: "#0A9FBA"
        }
      ];

      x_name.forEach((price, index) => {
        series.forEach((seriesItem) => {
          const value = summarizedData[price][seriesItem.name] || null;
          seriesItem.data[index] = value;
        });
      });

      myChart.setOption({
        grid: {
          left: '9%',
          right: '20%',
          bottom: 15,
          top: 25,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: x_name,
          axisLine: { show: true },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              color: "brak"
            }
          },
        },
        series: series
      }
      );

      window.addEventListener('resize', myChart.resize);

      myChart.on('finished', function () {
        myChart.resize();
      });

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);
  return (
    <div ref={chartRef} style={{ minHeight: '160px', minWidth: "480px" }} />
  );
}

export default DrawNpmModel