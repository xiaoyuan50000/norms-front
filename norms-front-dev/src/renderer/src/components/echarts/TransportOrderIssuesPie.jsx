import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TransportOrderIssuesPie = ({ agvName, activeNum, pendingNum, completedNum, Result }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        title: {
          text: agvName,
          textStyle: {
            color: '#333770',
            fontSize: 12
          },
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        color: ['#5D70C6', '#55B343', '#F2C653'],
        series: [
          {
            type: 'pie',
            data: [
              { name: 'Active', value: activeNum, label: { formatter: `{c}` } },
              { name: 'Pending', value: pendingNum, label: { formatter: `{c}` } },
              { name: 'Completed', value: completedNum, label: { formatter: `{c}` } }
            ]
          }
        ]
      })
      window.addEventListener('resize', myChart.resize);

      myChart.on('finished', function () {
        myChart.resize();
      });

      // Cleanup function when the component will unmount
      return () => {
        myChart.dispose();
      };
    }
  }, [activeNum, pendingNum, completedNum])
  return (<div ref={chartRef} style={{ minHeight: '140px', width: '16%' }}></div>)
}


export default TransportOrderIssuesPie;