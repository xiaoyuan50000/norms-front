import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const OverviewIssuingPie = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            let myChart = echarts.init(chartRef.current);
            myChart.setOption({
                title: {
                  text: 'Issuing',
                  textStyle: {
                      color: '#333770',
                      fontSize: 20
                  },
                  subtext: '',
                  left: 'left'
                },
                color: ['#7965fb', '#65b6fb', '#3eb546'],
                legend: {
                //   orient: 'vertical',
                //   right: 10,
                //   top: 10,
                    bottom: 0,
                    data: ['Ready for picking', 'Ready for issuing', 'Completed']
                },
                series: [
                    {
                        left: 20,
                        type: 'pie',
                        radius: ['30%', '50%'],
                        data: [
                          {name: 'Ready for picking', value: 400},
                          {name: 'Ready for issuing', value: 300, label: {formatter: `{c}`}},
                          {name: 'Completed', value: 120, label: {formatter: `{c}`}},
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

export default OverviewIssuingPie;