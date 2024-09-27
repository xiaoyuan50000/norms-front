import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function OrderSalesDetailsLineModel({ salesDetails }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const result = {
        OrderDates: [],
        Amount: []
      };

      salesDetails.forEach(item => {
        result.OrderDates.push(item.OrderDate);
        result.Amount.push(item.Amount);
      });

      myChart.setOption({
        grid: {
          top: '5%',
          left: '6%',
          right: '3%',
          bottom: '12%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#7780E8'
            }
          }
        },
        xAxis: {
          boundaryGap: false,
          data: result.OrderDates
        },
        yAxis: {
          type: 'value'
        },
        color: 'rgba(0, 0, 180, 0.5)',
        series: [
          {
            type: 'line',
            smooth: true,
            areaStyle: {},
            data: result.Amount
          }
        ]
      });

      window.addEventListener('resize', myChart.resize);
      myChart.on('finished', function () {
        myChart.resize();
      });

      return () => {
        myChart.dispose();
      };
    }
  }, [salesDetails]);
  return (
    <div ref={chartRef} style={{ minHeight: '100%', minWidth: "100%" }} />
  );
}

export default OrderSalesDetailsLineModel