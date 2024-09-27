import React, { useState, useRef, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './css/graphicalReports.css'
import { DateRangePicker } from 'rsuite';
import moment from 'moment';

import GraphicalReportsModel from './components/GraphicalReportsModel.jsx';

export default function GraphicalReports() {
  const grepChartRef = useRef(null);
  const [reportType, setReportType] = useState(1);
  const [dateType, setDateType] = useState(1);
  const [currReportType, setCurrReportType] = useState('Unprocessed Stock in Days');
  const stockTypeList = [
    { 'name': 'Unprocessed Stock in Days', 'value': 1 },
    { 'name': 'Notes Issued To Banks', 'value': 2 },
    { 'name': 'Notes Received From Banks', 'value': 3 },
    { 'name': 'Total Notes Processed', 'value': 4 },
    { 'name': 'Notes Received VS Notes Processed', 'value': 5 },
    { 'name': 'Cycle Time', 'value': 6 },
  ]
  const [chartData, setChartData] = useState([
    ['11\n\rJanuary', '12', '13', '14', '15', '16', '17', '18'],
    [65, 43, 25, 43, 50, 55, 30, 25],
    [7, 65, 12, 46, 45, 43, 65, 12],
    [8, 32, 24, 48, 57, 25, 53, 25],
    [9, 12, 23, 39, 33, 39, 33, 41],
    [10, 22, 28, 41, 53, 41, 53, 39],
    [11, 9, 26, 43, 53, 39, 53, 39],
  ]);
  const handleChangeReportType = (event) => {
    setReportType(event.target.value);
    setCurrReportType(stockTypeList[event.target.value - 1].name);
    if (event.target.value === 1) {
      setChartData([
        ['11\n\rJanuary', '12', '13', '14', '15', '16', '17', '18'],
        [47, 3, 34, 27, 80, 99, 89, 24],
        [47, 74, 62, 58, 14, 94, 24, 55],
        [48, 64, 12, 73, 22, 40, 62, 47],
        [9, 12, 23, 39, 33, 39, 33, 41],
        [10, 22, 28, 41, 53, 41, 53, 39],
        [0, 52, 64, 92, 16, 60, 67, 95],
      ])
    } else if (event.target.value === 2) {
      setChartData([
        ['11\n\rJanuary', '12', '13', '14', '15', '16', '17', '18'],
        [47, 3, 34, 27, 80, 99, 89, 24],
        [47, 74, 62, 58, 14, 94, 24, 55],
        [48, 64, 12, 73, 22, 40, 62, 47],
        [9, 12, 23, 39, 33, 39, 33, 41],
        [10, 22, 28, 41, 53, 41, 53, 39],
        [0, 52, 64, 92, 16, 60, 67, 95],
      ])
    }
  };

  const [value, setValue] = useState([
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
  ]);



  const predefinedBottomRanges = [
    {
      label: 'Today',
      value: [new Date(), new Date()]
    },
    // {
    //   label: <span id="start"></span>,
    //   closeOverlay: false,
    // },
    // {
    //   label: <span>-</span>,
    //   closeOverlay: false,
    // },
    // {
    //   label: <span id="end"></span>,
    //   closeOverlay: false,
    // }
  ];



  const handleChangeDateType = (newValue) => {
    let newChartDate = [];
    let days;
    // if (event.target.value === 1) {
    //   days = getPreviousSevenDays();
    // } else if (event.target.value === 2) {
    //   days = getPreviousMonth()
    // }
    // console.log('days' + days);

    if (!Array.isArray(newValue) || newValue.length === 0) {
      setValue([
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ]);

      days = getPreviousSevenDays([
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ]);
    } else {
      setValue(newValue);
      days = getPreviousSevenDays(newValue);
    }


    console.log('days' + days);

    newChartDate.push(
      days.map((day, i) => {
        let dayNum = day.getDate();

        return dayNum === 1 || i === 0 ? day.getDate() + "\n\r" + getMonthNameByNumber(day.getMonth()) + " " + day.getFullYear() : day.getDate()

      })
    )
    for (let i = 0; i < 10; i++) {
      let daydata = []
      days.forEach((day, i) => {
        let dayNum = day.getDate();

        // daydata.push(dayNum === 1 || i === 0 ? day.getDate() + "\n\r" + getMonthNameByNumber(day.getMonth()) + " " + day.getFullYear() : day.getDate())
        daydata.push(randomNum(2))
      })
      newChartDate.push(daydata)
    }
    console.log('newChartDate', newChartDate)
    setChartData(newChartDate)
  }

  const randomNum = function (digits) {
    return Math.floor(Math.random() * Math.pow(10, digits));
  }

  function getPreviousSevenDays(newValue) {
    const oneDay = 24 * 60 * 60 * 1000;
    if (!Array.isArray(newValue) || newValue.length === 0) {
      return;
    }
    const today = new Date(newValue[0]);


    const diffTime = Math.abs(new Date(newValue[1]) - new Date(newValue[0]));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const previousSevenDays = [];

    for (let i = 0; i < diffDays + 1; i++) {
      const previousDate = new Date(today.getTime() + i * oneDay);
      previousSevenDays.push(previousDate);
    }
    // previousSevenDays.reverse();
    return previousSevenDays;
  }


  function getPreviousMonth() {
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = new Date();
    let previousDate = new Date();
    previousDate.setMonth(currentDate.getMonth() - 1);
    let currentDateStamp = currentDate.getTime();
    let previousDateStamp = previousDate.getTime();
    const previousMonthDays = [];
    while (previousDateStamp < currentDateStamp) {
      previousMonthDays.push(new Date(previousDateStamp));
      previousDateStamp += oneDay;
    }
    return previousMonthDays;
  }


  function getMonthNameByNumber(monthNumber) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber];
    }
    return 'Invalid month number';
  }

  function exportPdf() {
    grepChartRef.current.savePdf();
  }


  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    backgroundColor: '#b59329',
    '&:hover': {
      backgroundColor: '#b59329',
    },
  }));

  return (
    <div className="content-wrapper">
      <div className="bark-div bark-chart-div">
        <div className="bark-body-div card-g" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '33px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              <span style={{ marginTop: '6px', marginRight: '10px', fontWeight: 'bold' }}>Report Type:</span>
              <Select
                sx={{ height: '33px', minWidth: '320px', fontSize: '16px' }}
                id="type-select"
                value={reportType}
                onChange={handleChangeReportType}
              >
                {
                  stockTypeList.map((stockType, cellIndex) => {
                    return (
                      <MenuItem key={stockType.value} value={stockType.value}>{stockType.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <span style={{ marginTop: '6px', marginRight: '10px', fontWeight: 'bold' }}>Period:</span>

                {/* <Select
                  sx={{ height: '33px', minWidth: '140px', fontSize: '16px' }}
                  id="date-select"
                  value={dateType}
                  onChange={handleChangeDateType}
                >
                  <MenuItem value={1}>Weekly</MenuItem>
                  <MenuItem value={2}>Monthly</MenuItem>
                </Select> */}

                <DateRangePicker
                  format='MM/dd/yyyy'

                  // showHeader={false}
                  ranges={predefinedBottomRanges}
                  weekStart={1}
                  // onSelect={(selectedValue, event) => {
                  //   console.log(selectedValue);
                  // }}
                  value={value}
                  onChange={handleChangeDateType}
                />
              </div>


              <ColorButton variant="contained" onClick={() => exportPdf()} sx={{ margin: '0px 10px 0px 10px', fontWeight: 'bolder', textTransform: 'unset' }}>Export PDF</ColorButton>
              <ColorButton variant="contained" sx={{ fontWeight: 'bolder', textTransform: 'unset' }}>Export Excel</ColorButton>
            </div>

          </div>
          {/* <div className="card-header-g">
                        <div className="card-header-title-g">
                            <span>{currReportType}</span>
                        </div>
                    </div> */}
          <GraphicalReportsModel grepChartRef={grepChartRef} chartData={chartData} currReportType={currReportType} />
        </div>
      </div>
    </div>
  )
}
