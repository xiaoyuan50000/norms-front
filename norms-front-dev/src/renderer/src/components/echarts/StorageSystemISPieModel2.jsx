import '../../stylesheets/css/storageSystemISPieModel.css'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function StorageSystemISPieModel2() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({

        color: ['#C5D31D', '#EAD921', '#EFC019', '#F7A517', '#F76917'],
        series: [
          {
            name: 'Issuing Completed',
            type: 'pie',
            startAngle: 0,
            tooltip: {},
            radius: ['25%', '40%'],
            center: ['50%', '90%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  color: 'rgba(80,150,224,0)'
                }
              },
              {
                value: 9,
                itemStyle: {
                  color: '#C5D31D'
                }
              },
              {
                value: 1,
                itemStyle: {
                  color: '#F5F3EF'
                }
              }
            ]
          },
          {
            name: 'Partially Completed',
            type: 'pie',
            startAngle: 0,
            radius: ['60%', '75%'],
            center: ['50%', '90%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  color: 'rgba(35,206,167,0)'
                }
              },
              {
                value: 8,
                itemStyle: {
                  color: '#EAD921'
                }
              },
              {
                value: 2,
                itemStyle: {
                  color: '#F5F3EF'
                }
              }
            ]
          },
          {
            name: 'Ready for issue',
            type: 'pie',
            startAngle: 0,
            radius: ['95%', '110%'],
            center: ['50%', '90%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  color: 'rgba(1,218,220,0)'
                }
              },
              {
                value: 7,
                itemStyle: {
                  color: '#EFC019'
                }
              },
              {
                value: 3,
                itemStyle: {
                  color: '#F5F3EF'
                }
              }
            ]
          },
          {
            name: 'Ready for picking',
            type: 'pie',
            startAngle: 0,
            radius: ['130%', '145%'],
            center: ['50%', '90%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  color: 'rgba(1,218,220,0)'
                }
              },
              {
                value: 3,
                itemStyle: {
                  color: '#F7A517'
                }
              },
              {
                value: 7,
                itemStyle: {
                  color: '#F5F3EF'
                }
              }
            ]
          },
          {
            name: 'Notification',
            type: 'pie',
            startAngle: 0,
            radius: ['165%', '180%'],
            center: ['50%', '90%'],
            labelLine: {
              show: false
            },
            data: [
              {
                value: 10,
                itemStyle: {
                  color: 'rgba(1,218,220,0)'
                }
              },
              {
                value: 2,
                itemStyle: {
                  color: '#F76917'
                }
              },
              {
                value: 8,
                itemStyle: {
                  color: '#F5F3EF'
                }
              }
            ]
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
  }, []);


  return (
    <div className='issuing-status-bottom'>
      <div className="left-pie">
        <div ref={chartRef} style={{ height: '166px', width: "302px" }} />
        <div className="left-pie-bottom">
          <div className='left-pie-bottom-left'>
            {['0', '0', '0', '0', '0'].map((num, index) => (
              <span key={index} className="number-with-spacing-left" style={{ marginRight: '18.7px', marginLeft: '3px' }}>
                {num}
              </span>
            ))}
          </div>

          <div className='left-pie-bottom-right'>
            {['2', '3', '7', '8', '9'].map((num, index) => (
              <span key={index} className="number-with-spacing-right" style={{ marginLeft: '18.7px', marginRight: '3px' }}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="right-instance">
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#C5D31E' }}></span>
          <span className="right-instance-text">Issuinng Completed</span>
          <span className="right-instance-number">9</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#EAD921' }}></span>
          <span className="right-instance-text">Partially Completed</span>
          <span className="right-instance-number">8</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#EFC019' }}></span>
          <span className="right-instance-text">Ready for issue</span>
          <span className="right-instance-number">7</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#F7A517' }}></span>
          <span className="right-instance-text">Ready for picking</span>
          <span className="right-instance-number">3</span>
        </div>

        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#F76917' }}></span>
          <span className="right-instance-text">Notification</span>
          <span className="right-instance-number">2</span>
        </div>
      </div>
    </div>
  );
}

export default StorageSystemISPieModel2