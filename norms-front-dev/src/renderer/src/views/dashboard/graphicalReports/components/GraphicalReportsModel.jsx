import { useEffect, useRef, useImperativeHandle, useState } from 'react';
import * as echarts from 'echarts';
import jsPDF from 'jspdf';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const GraphicalReportsModel = ({ chartData, grepChartRef, currReportType }) => {
  const chartRef = useRef(null);
  const barWidth = 5
  const legendstr = ['Pcs_2', 'Pcs_Phy_2', 'Pcs_5', 'Pcs_Phy_5', 'Pcs_10', 'Pcs_Phy_10', 'Pcs_50', 'Pcs_100', 'Pcs_1000', 'Pcs_10000']
  let myChart;
  useEffect(() => {
    // console.log('chartData', chartData)
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);

      //legendselectchanged
      myChart.on("legendselectchanged", (event) => {
        // console.log('event', event)
        // console.log('event.selected[event.name];', event.selected[event.name])
        const name = event.name;
        let isSelected = event.selected[event.name];
        if (!isSelected) {
          myChart.dispatchAction({
            type: 'legendSelect',//legendSelect
            name: name
          });
        }
        let option = myChart.getOption()
        // console.log('option',option)
        option.series.map((s, i) => {
          if (legendstr[i] === name) {
            s.lineStyle.width = 5;
          } else {
            s.lineStyle.width = 2;
          }
          return s;
        })
        option.legend[0].data.map((e, i) => {
          if (legendstr[i] === name) {
            e.textStyle.color = 'red';//#f3cecd
          } else {
            e.textStyle.color = '#333';
          }
          return e;
        })
        myChart.setOption(option, false);

      });

      setOptionByData(chartData)
      window.addEventListener('resize', myChart.resize);

      myChart.on('finished', function (e) {
        // console.log('finished',e)
        myChart.resize();
        myChart.off('finished');
      });

      // Cleanup function when the component will unmount
      return () => {
        myChart.dispose();
      };
    }
  }); //chartData Empty array ensures this effect runs once on mount

  useImperativeHandle(grepChartRef, () => {
    return {
      savePdf
    };
  });

  function savePdf() {
    setTimeout(() => {
      // let imgWidth = myChart.getWidth();
      // let imgHeight = myChart.getHeight();
      let imgWidth = 1566;
      let imgHeight = 950;
      // console.log('imgWidth', imgWidth);
      // console.log('imgHeight', imgHeight);

      let canvas = document.createElement('canvas');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      console.log('myChart', myChart)
      let img = myChart.getDataURL({
        type: 'image/png',
        pixelRatio: 1,
        backgroundColor: '#fff'
      })
      let image = new Image()
      image.src = img
      image.onload = () => {
        let pdfX = (imgWidth + 10) / 2 * 0.75
        let pdfY = (imgHeight + 500) / 2 * 0.75
        let imgX = pdfX;
        let imgY = (imgHeight / 2 * 0.75);

        canvas.getContext('2d').drawImage(image, 0, 0, imgWidth, imgHeight);

        let imgData = canvas.toDataURL('image/png');

        let pdf = new jsPDF('', 'pt', 'a4');
        // let pdf = new jsPDF('', 'pt', [pdfX,pdfY]);
        pdf.addImage(imgData, 'PNG', 0, 0, imgX, imgY);

        pdf.save('echarts.pdf');
      }
    }, 500);

  }
  function setOptionByData(newData) {
    // console.log(newData);

    if (myChart) {
      myChart.setOption({
        title: {
          text: currReportType,
          left: 'center',
          textStyleL: {
            color: '#000'
          },
        },
        // animation: false,
        grid: {
          left: '6.5%',
          right: '10%'
        },
        color: ['#bd8bf8', '#9a60b4', '#91cc75', '#3ba272', '#fac858', '#fc8452', '#ee6666', '#8cc1e3', '#be002d', '#4c40ac'],
        legend: {
          data: [
            { name: 'Pcs_2', textStyle: { color: '#333' } },
            { name: 'Pcs_Phy_2', textStyle: { color: '#333' } },
            { name: 'Pcs_5', textStyle: { color: '#333' } },
            { name: 'Pcs_Phy_5', textStyle: { color: '#333' } },
            { name: 'Pcs_10', textStyle: { color: '#333' } },
            { name: 'Pcs_Phy_10', textStyle: { color: '#333' } },
            { name: 'Pcs_50', textStyle: { color: '#333' } },
            { name: 'Pcs_100', textStyle: { color: '#333' } },
            { name: 'Pcs_1000', textStyle: { color: '#333' } },
            { name: 'Pcs_10000', textStyle: { color: '#333' } },
          ],
          icon: 'rect',
          orient: 'vertical',
          right: 0,
          bottom: 60,
          itemWidth: 15,
          textStyle: {
            fontWeight: 560,
          },
          // lineStyle: {
          //     type: 'dotted'
          // },


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
          formatter: function (params) {//Transaction 1 - 09:45am <br/> - Actual 
            let html = `
                        <div class="chart-tooltip">
                          <div class="chart-tooltiptext">
                          ${params.seriesName} - ${params.value[params.seriesIndex + 1]}
                            </div>
          
                          </div>
                        `
            return html;
          }
        },
        // dataset: {
        //   source: newData
        //   // source: [
        //   //   ['1','2','3','4'],
        //   //   [10, 35, 53, 39],
        //   //   [43, 35, 53, 39],
        //   //   [43, 35, 53, 39],
        //   //   // ['8', 32, 43, 35, 53, 39, 32, 43, 35, 53, 39],
        //   //   // ['9', 12, 53, 39, 33, 41, 12, 53, 39, 33, 41],
        //   // ]
        // },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              // color: 'black',
              fontWeight: 600
            }
          },
          data: newData[0]
        },
        yAxis: {
          type: 'value',
          name: 'No of Stock(million)',
          nameTextStyle: {
            fontSize: 12,
            color: 'black',
            fontWeight: '600',
            overflow: 'truncate'
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: function (value) {
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
        series: [
          { name: 'Pcs_2', type: 'line', barWidth: barWidth, data: newData[1] },
          { name: 'Pcs_Phy_2', type: 'line', barWidth: barWidth, data: newData[2] },
          { name: 'Pcs_5', type: 'line', barWidth: barWidth, data: newData[3] },
          { name: 'Pcs_Phy_5', type: 'line', barWidth: barWidth, data: newData[4] },
          { name: 'Pcs_10', type: 'line', barWidth: barWidth, data: newData[5] },
          { name: 'Pcs_Phy_10', type: 'line', barWidth: barWidth, data: newData[6] },
          { name: 'Pcs_50', type: 'line', barWidth: barWidth, data: newData[7] },
          { name: 'Pcs_100', type: 'line', barWidth: barWidth, data: newData[8] },
          { name: 'Pcs_1000', type: 'line', barWidth: barWidth, data: newData[9] },
          { name: 'Pcs_10000', type: 'line', barWidth: barWidth, data: newData[10] },
        ]
      }, true);
    }

  }
  return (
    <>
      <div ref={chartRef} style={{ minHeight: '550px' }}></div>
    </>
  );
};

export default GraphicalReportsModel;