import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OverviewReceivingPie = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            let myChart = echarts.init(chartRef.current);
            myChart.setOption({
                title: {
                  text: 'Receiving',
                  textStyle: {
                      color: '#333770',
                      fontSize: 20
                  },
                  subtext: '',
                  left: 'left'
                },
                color: ['#658dfb', '#f49a2e', '#3eb546'],
                legend: {
                //   orient: 'vertical',
                //   right: 10,
                  bottom: 0,
                  data: ['Ready', 'Activated', 'Completed']
                },
                series: [
                    {
                        left: 20,
                        type: 'pie',
                        radius: ['30%', '50%'],
                        data: [
                          {name: 'Ready', value: 300, label: {formatter: `{c}`}},
                          {name: 'Activated', value: 500, label: {formatter: `{c}`}},
                          {name: 'Completed', value: 480, label: {formatter: `{c}`}},
                        ],
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
    }, []); // Empty array ensures this effect runs once on mount

    return (
        <div ref={chartRef} style={{ minHeight: '260px' }}></div>
    );
};

export default OverviewReceivingPie;