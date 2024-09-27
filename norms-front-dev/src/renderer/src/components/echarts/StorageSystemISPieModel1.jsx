import React, { useEffect, useRef } from 'react';
import '../../stylesheets/css/storageSystemISPieModel.css'
import * as echarts from 'echarts';
function StorageSystemISPieModel1() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      let myChart = echarts.init(chartRef.current);
      myChart.setOption({
        grid: {
          left: '0%',
          right: '0%'
        },
        color: [
          '#CFC77D',
          '#D0D68C',
          '#C5DEA5',
          '#90C07F',
          '#67CDA1',
          '#46B1C0',
          '#3B92B9'
        ],
        series: [
          {
            name: 'Issuing Completed',
            type: 'pie',
            startAngle: 0,
            tooltip: {},
            radius: ['20%', '30%'],
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
                  color: '#CFC77E'
                }
              },
              {
                value: 1,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Partially Completed',
            type: 'pie',
            startAngle: 0,
            radius: ['45%', '55%'],
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
                value: 9,
                itemStyle: {
                  color: '#D1D78E'
                }
              },
              {
                value: 1,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Issuing',
            type: 'pie',
            startAngle: 0,
            radius: ['70%', '80%'],
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
                value: 9,
                itemStyle: {
                  color: '#ABD07D'
                }
              },
              {
                value: 1,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Ready for issue',
            type: 'pie',
            startAngle: 0,
            radius: ['95%', '105%'],
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
                value: 8,
                itemStyle: {
                  color: '#90C07F'
                }
              },
              {
                value: 2,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Picking Activated',
            type: 'pie',
            startAngle: 0,
            radius: ['120%', '130%'],
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
                  color: '#67CDA1'
                }
              },
              {
                value: 3,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Ready for picking',
            type: 'pie',
            startAngle: 0,
            radius: ['145%', '155%'],
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
                  color: '#46B1C0'
                }
              },
              {
                value: 7,
                itemStyle: {
                  color: '#EAEDF1'
                }
              }
            ]
          },
          {
            name: 'Notification',
            type: 'pie',
            startAngle: 0,
            radius: ['170%', '180%'],
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
                  color: '#3B92B9'
                }
              },
              {
                value: 8,
                itemStyle: {
                  color: '#EAEDF1'
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
            {['0', '0', '0', '0', '0', '0', '0'].map((num, index) => (
              <span key={index} className="number-with-spacing-left" style={{ marginRight: '12.7px', marginLeft: '1px' }}>
                {num}
              </span>
            ))}
          </div>

          <div className='left-pie-bottom-right'>
            {['2', '3', '7', '8', '9', '9', '9'].map((num, index) => (
              <span key={index} className="number-with-spacing-right" style={{ marginLeft: '12.7px', marginRight: '1px' }}>
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="right-instance">
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#D1D78E' }}></span>
          <span className="right-instance-text">Issuinng Completed</span>
          <span className="right-instance-number">9</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#D1D78E' }}></span>
          <span className="right-instance-text">Partially Completed</span>
          <span className="right-instance-number">9</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#ABD07D' }}></span>
          <span className="right-instance-text">Issuing</span>
          <span className="right-instance-number">9</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#92C181' }}></span>
          <span className="right-instance-text">Ready for issue</span>
          <span className="right-instance-number">8</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#68CDA2' }}></span>
          <span className="right-instance-text">Picking Activated</span>
          <span className="right-instance-number">7</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#46B1C0' }}></span>
          <span className="right-instance-text">Ready for picking</span>
          <span className="right-instance-number">3</span>
        </div>
        <div className="status-line">
          <span className="status-circle" style={{ backgroundColor: '#3B92B9' }}></span>
          <span className="right-instance-text">Notification</span>
          <span className="right-instance-number">2</span>
        </div>
      </div>
    </div>
  );
}

export default StorageSystemISPieModel1