import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const IssuingReceivingScheduleModel = () => {
    const chartRef = useRef(null);
    const barWidth = 20
    useEffect(() => {
        if (chartRef.current) {
            let myChart = echarts.init(chartRef.current);
            myChart.setOption({
                grid: {
                    left: '3.6%',
                    right: '0%'
                },
                color: ['#148AAA', '#96AA3B', '#EF5780', '#D8790B', '#2576D5'],
                legend: {
                    right: 0,
                    itemWidth: 15,
                    textStyle: {
                        fontWeight: 560
                    }
                },
                tooltip: {
                    className: 'mychart-tooltip',
                    position: function (point) {  
                      let barX = point[0] - 110;
                      let y = point[1] - 100;  
                      return [barX, y]; 
                    },
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    formatter: function (params) {  
                        let html = `
                        <div class="chart-tooltip">
                          <div class="chart-tooltiptext">
                            ${ params.name } - Actual <br/>
                          Transaction 1 - 09:45am <br/>
                          ${  params.seriesName } - ${ params.value[params.seriesIndex+1] } Pcs
                            </div>
          
                          </div>
                        ` 
                        return html;  
                    }
                },
                dataset: {
                    source: [
                        ['product', '$2', '$5', '$10', '$50', '$100'],
                        ['Bank1', 43000, 35000, 23000, 40001, 50001],
                        ['Bank2', 43000, 13000, 55000, 43000, 25000],
                        ['Bank3', 46000, 45000, 43000, 65000, 12000],
                        ['Bank4', 32000, 43000, 35000, 53000, 39000],
                        ['Bank5', 12000, 53000, 39000, 33000, 40001],
                        ['Bank6', 22000, 23000, 40001, 53000, 39000],
                        ['Bank7', 12000, 55000, 43000, 53000, 39000],
                    ]
                },
                xAxis: { 
                    type: 'category', 
                    axisTick: {
                        show: false
                    },
                    axisLabel: {  
                        textStyle: {  
                            // color: 'black',
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
                    formatter: function(value){
                        let thousand = value;
                        if (value >= 1000) {
                            thousand = value / 1000 + 'k';
                        } else {
                            thousand = value
                        }
                        return thousand;
        
                    },
                    textStyle: {  
                    // color: 'black',
                    fontWeight: 600 
                    }  
                },
            },
            series: [{ type: 'bar', barWidth: barWidth }, 
            { type: 'bar', barWidth: barWidth }, 
            { type: 'bar', barWidth: barWidth }, 
            { type: 'bar', barWidth: barWidth }, 
            { type: 'bar', barWidth: barWidth }]
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
        <div ref={chartRef} style={{ minHeight: '360px' }}></div>
    );
};

export default IssuingReceivingScheduleModel;