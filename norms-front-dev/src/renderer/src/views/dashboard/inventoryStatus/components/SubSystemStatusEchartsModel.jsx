import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const SubSystemStatusEchartsModel = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            let myChart = echarts.init(chartRef.current);
            myChart.setOption({
                grid: {
                    left: '6%',
                    right: '0%'
                },
                color: ['#F4C871', '#F98856', '#DA6961', '#BD88F5', '#A35FBA', '#8CCC7E', '#2A7DDC', '#3FA16E', '#92BDDB'],
                legend: {
                    itemWidth: 15,
                    textStyle: {
                        fontWeight: 560
                    }
                },

                dataset: {
                    source: [
                        ['product', 'Vault Crane 1', 'Vault Crane 2', 'Vault Crane 3', 'PB Crane 1', 'PB Crane 2',
                            'SKU Crane 1', 'SKU Crane 2', 'SKU Crane 3', 'SKU Crane 4'],
                        ['21 Jan', 43, 85, 93, 32, 43, 56, 54, 34, 34],
                        ['22 Jan', 83, 73, 55, 55, 3, 43, 54, 87, 23],
                        ['23 Jan', 86, 55, 43, 4, 65, 54, 78, 63, 23],
                        ['24 Jan', 72, 43, 85, 54, 34, 54, 67, 34, 23],
                        ['Today', 72, 53, 39, 54, 4, 3, 42, 87, 23],
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
                        textStyle: {
                            fontWeight: 600
                        }
                    }
                },
                series: [
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                    { type: 'line', showSymbol: false, },
                ],
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

export default SubSystemStatusEchartsModel;