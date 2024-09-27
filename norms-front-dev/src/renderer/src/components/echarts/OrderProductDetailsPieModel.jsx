import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function OrderProductDetailsPieModel({ productDetails }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);

      const pieData = productDetails.map(item => ({
        value: item.status_count,
        name: item.status,
        label: { formatter: `{c}` }
      }));

      myChart.setOption({
        legend: {
          bottom: 0,
          left: 'center'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                formatter: '{d}%',
                fontSize: 35,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
            },
            color: ['#F8D53F', '#5D67E5', '#E28451'],
            data: pieData
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
  }, [productDetails]);
  return (
    <div ref={chartRef} style={{ minHeight: '95%', minWidth: "100%" }} />
  );
}

export default OrderProductDetailsPieModel