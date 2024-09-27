import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function OrderAnalyticsBarModel({ AnalyticsData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const result = {
        OrderDates: [],
        PendingOrders: [],
        DeliveredOrders: [],
        NewOrders: []
      };

      AnalyticsData.forEach(item => {
        result.OrderDates.push(item.OrderDate);
        result.PendingOrders.push(item.PendingOrders);
        result.DeliveredOrders.push(item.DeliveredOrders);
        result.NewOrders.push(item.NewOrders);
      });

      result.OrderDates.reverse();
      result.PendingOrders.reverse();
      result.DeliveredOrders.reverse();
      result.NewOrders.reverse();

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        // legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: result.OrderDates
          }
        ],
        yAxis: [{ type: 'value' }],
        color: ['#E28451', '#F8D53F', '#5D67E5'],
        series: [{
          name: 'padding',
          type: 'bar',
          stack: 'Search Engine',
          barWidth: 15,
          data: result.PendingOrders,
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        },
        {
          name: 'Delivered',
          type: 'bar',
          stack: 'Search Engine',
          data: result.DeliveredOrders,
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
        },
        {
          name: 'New',
          type: 'bar',
          stack: 'Search Engine',
          data: result.NewOrders,
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          }
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
  }, [AnalyticsData]);
  return (
    <div ref={chartRef} style={{ minHeight: '100%', minWidth: "100%" }} />
  );
}

export default OrderAnalyticsBarModel