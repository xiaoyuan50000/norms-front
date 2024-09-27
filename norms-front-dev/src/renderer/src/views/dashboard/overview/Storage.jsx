import React, { useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import './css/storage.css';
import { IsStatus, SubsystemStatus, TransportErrors } from './components/StorageModule';
import LinearProgressWithLabel from './components/LinearProgressWithLabel';
import StorageBarModel from './components/StorageBarModel';
import SimpleCustomDialog from './components/SimpleCustomDialog';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import axios from 'axios';

import noBatchreadyImg from '../../../images/NoBatchready.svg';
import noBatchActivatedImg from '../../../images/NoBatchActivated.svg';
import allBatchesCompletedImg from '../../../images/AllBatchesCompleted.svg';
import pass from '../../../images/pass.svg';
import Fail from '../../../images/Fail.svg';
import error1 from '../../../images/error1.svg';
import Issuing from '../../../images/Issuing.svg';
import Receiving from '../../../images/Receiving.svg';
import Audit from '../../../images/Audit.svg';
import error from '../../../images/error.svg';
import More from '../../../images/More.svg';
import Output from '../../../images/Output.svg';
import Picking from '../../../images/Picking.svg';
import Palletizing from '../../../images/Palletizing.svg';
import Charging from '../../../images/Charging.svg';
import Shifting from '../../../images/Shifting.svg';
import Transporting from '../../../images/Transporting.svg';

function Storage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [height, setHeight] = useState(0);
  const [datas, setDatas] = useState([]);
  const intervalRef = React.useRef(null);

  let issuingStatus = []
  let receivingStatus = []
  let noteProcessingStatus = []
  let bulkLaneStatus = []
  let teamStatus = []
  let subsystemStatus = []
  let storageCapacityStatus = []
  let transportErrors = []

  let issuingStatusData = []
  let receivingStatusData = []
  let noteProcessingStatusData = []
  let bulkLaneStatusData = []
  let subsystemStatusData = []

  useEffect(() => {
    document.body.style.background = 'linear-gradient(45deg, #E5DBC1, #A7AFD9)'
    setTimeout(() => {
      let containerHeight = document.getElementsByClassName('container-right-div')[0].offsetHeight;
      let titleHeight = document.getElementsByClassName('container-right-title')[0].offsetHeight;
      setHeight(containerHeight - titleHeight - 20);
    }, 100);

    gettingData();

    // timed task
    // intervalRef.current = setInterval(() => {
    //   gettingData();
    // }, 5000);

    // return () => {
    //   clearInterval(intervalRef.current);
    // };
  }, [])

  async function gettingData() {
    axios.post('/api/initStorageStatus').then(res => {
      let storageStatusList = res.data.data
      setDatas(storageStatusList);
    })
  }

  datas.forEach(data => {
    switch (data.key) {
      case 'issuingStatus':
        issuingStatus = data.value;
        break;
      case 'receivingStatus':
        receivingStatus = data.value;
        break;
      case 'noteProcessingStatus':
        noteProcessingStatus = data.value;
        break;
      case 'bulkLaneStatus':
        bulkLaneStatus = data.value;
        break;
      case 'teamStatus':
        teamStatus = data.value;
        break;
      case 'subsystemStatus':
        subsystemStatus = data.value;
        break;
      case 'storageCapacityStatus':
        storageCapacityStatus = data.value;
        break;
      case 'transportErrors':
        transportErrors = data.value;
        break;
      default:
        console.log('Data null.');
        break;
    }
  })

  const blrsTableHeaders = ['Trans ID', 'Product', 'Product Type', 'No. of Pakkets', 'Amount', 'Status'];
  const blrsDatas = [
    ['1012341', '100-PORT-SGD', 'New', '15', '$810,000,000', 'Ready to Receive'],
    ['1231412', '1-TS-SGD', 'New', '10', '$100,000', 'Receuvung Cimpleted']
  ];

  const tsTableHeaders = ['', 'Status', 'Total Input', 'Total Output', 'Discrepancies', 'Shredded', 'Float', 'Balance'];
  const tsDatas = [
    ['5-1', 'In-Operation', '$319,510', '$10,000', '$0', '$200,000', '$0', '×'],
    ['5-2', 'Not-in-Operation', '$11,170,031', '$6,369,653', '-$1,050.50', '$4,799,327.50', '$0', '√'],
  ];

  const scsTableHeaders = ['Product', 'Product Type', 'Product Subtype', 'Amount'];
  const scsDatas = [
    ['10-PORT-SGD', 'Processed', 'FFG', '$200,000'],
    ['50-PORT-SGD', 'Processed', 'Fit', '$300,000'],
    ['100-PORT-SGD', 'Processed', 'Fit', '$400,000']
  ];

  const topcTableHeaders = ['TU', 'State', 'Source', 'Dest', 'Date & Time'];
  const topcDatas = [
    ['1234568', 'G', 'NPM1', 'SKU3', '20/May/2024 13:51'],
    ['1234569', 'G', 'NPM1', 'SKU3', '20/May/2024 13:51']
  ];

  if (Array.isArray(issuingStatus) && issuingStatus.length > 0) {
    const isBgColors = [
      '#3B92B9',
      '#46B1C0',
      '#68CDA2',
      '#92C181',
      '#ABD07D',
      '#D1D78E',
      '#CFC77D'
    ];

    issuingStatusData = issuingStatus.map((item, index) => {
      const colorIndex = index % isBgColors.length;
      return {
        ...item,
        bgColor: isBgColors[colorIndex],
      };
    });
  }


  if (Array.isArray(receivingStatus) && receivingStatus.length > 0) {
    const rsBgColors = [
      '#F76816',
      '#F7A416',
      '#EFC019',
      '#EAD921',
      '#C6D41E',
      '#3B92B9',
      '#46B1C0'
    ];

    receivingStatusData = receivingStatus.map((item, index) => {
      const colorIndex = index % rsBgColors.length;
      return {
        ...item,
        bgColor: rsBgColors[colorIndex],
      };
    });
  }


  if (Array.isArray(noteProcessingStatus) && noteProcessingStatus.length > 0) {
    const npsColors = ['#6D6D6D', '#EB3A24', '#FFB021', '#18A79F'];
    const getStatusImg = (status) => {
      if (status === 'No Batch ready!') {
        return noBatchreadyImg;
      } else if (status === 'No Batch Activated!') {
        return noBatchActivatedImg;
      } else if (status === 'All Batches Completed!') {
        return allBatchesCompletedImg;
      } else {
        return '';
      }
    };

    noteProcessingStatusData = noteProcessingStatus.map((item, index) => {
      const text = item.name.replace(/\s/g, '');
      const color = npsColors[index % npsColors.length];
      const imgs = getStatusImg(item.status);

      return {
        ...item,
        text,
        color,
        imgs
      };
    });
  }


  if (Array.isArray(subsystemStatus) && subsystemStatus.length > 0) {
    const getStatusImg = (status) => {
      if (status === 'Shifting') {
        return Shifting;
      } else if (status === 'Transporting') {
        return Transporting;
      } else if (status === 'Picking') {
        return Picking;
      } else if (status === 'Output' || status === 'Input') {
        return Output;
      } else if (status === 'Palletizing') {
        return Palletizing;
      } else if (status === 'Charging') {
        return Charging;
      } else if (status === 'Error' || status === 'LTF') {
        return error1;
      } else {
        return '';
      }
    };

    subsystemStatusData = subsystemStatus.map(item => {
      const imageSrc = getStatusImg(item.operation);

      return {
        ...item,
        imageSrc
      };
    })
  }


  if (Array.isArray(bulkLaneStatus) && bulkLaneStatus.length > 0) {
    const getStatusImg = (status) => {
      if (status === 'Issuing') {
        return Issuing;
      } else if (status === 'Receiving') {
        return Receiving;
      } else if (status === 'Audit') {
        return Audit;
      } else {
        return '';
      }
    };

    const getCurrentState = (status) => {
      if (status === 'Issuing' || status === 'Receiving') {
        return 'No Activeated Schedule';
      } else if (status === 'Audit') {
        return 'In-operation';
      } else {
        return '';
      }
    }

    bulkLaneStatusData = bulkLaneStatus.map(item => {
      const imageSrc = getStatusImg(item.name);
      const currentState = getCurrentState(item.name);

      return {
        ...item,
        imageSrc,
        currentState
      };
    })
  }

  const handleOpenDialog = (data) => {
    setIsDialogOpen(true);
    setDialogData(data);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#374BBA',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#374BBA',
      color: 'white',
      fontSize: '15px',
      borderRadius: '8px',
      border: '1px solid #374BBA'
    },
  }));

  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            xs: 490,
            sm: 560,
            md: 1230,
            lg: 1270,
            xl: 1270
          }
        }
      })}>

      {isDialogOpen && (
        <SimpleCustomDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          data={dialogData}
        />
      )}

      <div className='container-div'>
        <Grid container columns={26} margin={0}>
          <Grid container spacing={2} columns={21} xl={21} paddingLeft={1} paddingRight={2}>
            <Grid container columns={10} xs={21} xl={10} alignContent={'space-between'} paddingTop={0} paddingBottom={0} marginTop={1}>
              <Grid xs={10} md={5} xl={10}>
                <div className='left-is-rs-container'>
                  <div className='ldt-title'>
                    <div className='title-textStyle'>
                      Issuing Status
                    </div>
                    <div className='title-textStyle'>
                      Receiving Status
                    </div>
                  </div>
                  <Grid>
                    <div className='ldt-Statistics'>
                      {issuingStatusData && issuingStatusData.length > 0 ?
                        <div className="left-instance">
                          {issuingStatusData.map((i, index) => (
                            i.name != '' ? <IsStatus key={index} onAddTask={handleOpenDialog} text={i.name} number={i.num} bgColor={i.bgColor} details={i.details} /> : null))}
                        </div>
                        : null}
                      {receivingStatusData && receivingStatusData.length > 0 ?
                        <div className="right-instance">
                          {receivingStatusData.map((r, index) => (
                            r.name != '' ? <IsStatus key={index} onAddTask={handleOpenDialog} text={r.name} number={r.num} bgColor={r.bgColor} details={r.details} /> : null))}
                        </div>
                        : null}
                    </div>
                  </Grid>
                </div>
              </Grid>

              <Grid xs={10} md={5} xl={10}>
                <div className='note-processing-status'>
                  <div className='title-textStyle'>
                    Note Processing Status
                  </div>
                  {noteProcessingStatusData && noteProcessingStatusData.length > 0 ?
                    <div className='nps-bottom'>
                      {noteProcessingStatusData.map((n, index) => (
                        n.name != '' ? < LinearProgressWithLabel onAddTask={handleOpenDialog} key={index} text={n.text} headline={n.name} value={n.num} state={n.status} color={n.color} imgs={n.imgs} details={n.details} /> : null))
                      }
                    </div>
                    : null}
                </div>
              </Grid>

              <Grid xs={10} paddingBottom={0}>
                <div className='left-div-bottom'>
                  <div className='bulk-lane-status'>
                    <div className='title-textStyle'>
                      Bulk Lane Status
                    </div>
                    <div className='bls-bottom'>

                      {bulkLaneStatusData && bulkLaneStatusData.length > 0 ?
                        bulkLaneStatusData.map((b, index) => (
                          <Fragment key={index}>
                            <div className='bls-bottom-div' onClick={() => handleOpenDialog({ title: `Bulk Lane ${b.name} Schedules`, tableHeaders: blrsTableHeaders, data: blrsDatas })}>
                              <img src={b.imageSrc} className='bgcl' />
                              <div className='bls-right'>
                                <div className="bls-right-title">
                                  <div className="text-head">{b.name}</div>
                                  <div className={b.currentState === 'In-operation' ? 'text-style4' : 'text-style3'}>{b.currentState}</div>
                                </div>
                                <div className="bls-right-bottom">
                                  <div className="text-end">Outstanding<span className='b'>{b.Outstanding}</span>,Completed<span className='b'>{b.Completed}</span></div>
                                </div>
                              </div>
                            </div>
                            {index < bulkLaneStatusData.length - 1 && <hr />}
                          </Fragment>
                        ))
                        : null}
                    </div>
                  </div>
                  <div className='team-status'>
                    <div className='title-textStyle'>
                      Team 5 Status
                    </div>
                    <div className='team-status-bottom' onClick={() => handleOpenDialog({ title: 'Team 5 Status', tableHeaders: tsTableHeaders, data: tsDatas })}>
                      <div className="tsb-top">
                        <div className="text-head tsb-top-head1">
                          Teams 5-1 <img src={pass} />
                        </div>
                        <div className='text-style2'>In-operation</div>
                      </div>
                      <div className="tsb-bottom">
                        <div className="text-head tsb-top-head2">
                          Teams 5-2 <img src={Fail} />
                        </div>
                        <div className='text-style1'>No Activeated Schedule</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container columns={11} xs={21} xl={11} alignContent={'space-between'} paddingTop={0} paddingBottom={0} marginTop={1}>
              <Grid xs={11} lg={5} xl={11} margin={0}>
                <div className="subsystem-status">
                  <div className='subsystem-status-title'>
                    <div className='title-textStyle'>
                      Subsystem Status
                    </div>
                    <div className='sst-right-open'>
                      <span>Vault Door</span>
                      <span className='open'>Open</span>
                    </div>
                  </div>
                  <Grid container spacing={1} minHeight={'415px'}>
                    {subsystemStatusData && subsystemStatusData.length > 0 ?
                      <div className='subsystem-status-bottom'>
                        {subsystemStatusData.map((s, index) => (
                          s.name === '' ?
                            <Grid xs={6} sm={3} key={index} maxHeight={'81px'}>
                              <div className='ssb-modules' style={{ border: 0 }}></div>
                            </Grid>
                            :
                            <Grid xs={6} sm={3} key={index} maxHeight={'81px'}>
                              <SubsystemStatus
                                module={s}
                                HtmlTooltip={HtmlTooltip} />
                            </Grid>
                        ))}
                      </div>
                      : null}
                  </Grid>
                </div>
              </Grid>

              <Grid xs={11} lg={6} xl={11} margin={0} paddingBottom={0}>
                <div className="storage-capacity-status">
                  <div className="scs-title">
                    <div className='scs-title-top'>
                      <div className='title-textStyle'>
                        Storage Capacity Status
                      </div>
                      <div className='title-textStyle-right'>
                        <div className="textStyle-right-line">
                          <span className="scs-circle" style={{ backgroundColor: '#ECEFF3' }}></span>
                          <span className="scs-right-instance-text">Empty</span>
                        </div>
                        <div className="textStyle-right-line">
                          <span className="scs-circle" style={{ backgroundColor: '#ECDFB8' }}></span>
                          <span className="scs-right-instance-text">Filled</span>
                        </div>
                        <div className="textStyle-right-line">
                          <span className="scs-circle" style={{ backgroundColor: '#C29C63' }}></span>
                          <span className="scs-right-instance-text">Locked</span>
                        </div>
                      </div>

                    </div>
                    <div className='title-subtitle'>
                      {'Safe capacity<40% | Early warning capacity 40~80 % | Burst capacity 80%<'}
                    </div>
                  </div>
                  <Grid>
                    <div className='scs-bottom'>
                      {storageCapacityStatus && storageCapacityStatus.length > 0 ?
                        <StorageBarModel onAddTask={handleOpenDialog} data={storageCapacityStatus} scsTableHeaders={scsTableHeaders} scsDatas={scsDatas} />
                        : null}
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={26} xl={5} margin={0}>
            <div className="container-right-div">
              <div className='container-right-title' style={{ height: '95px' }}>
                <div className='title-textStyle'>
                  Transport Errors
                </div>
                <div className='title-subtitle'>
                  To Pending Completion order errors:
                  <span className='container-right-title-span' onClick={() => handleOpenDialog({ title: 'Transport Orders Pending Completion', tableHeaders: topcTableHeaders, data: topcDatas })}>{transportErrors ? transportErrors.length : 0}</span>
                </div>
              </div>
              <div className="container-right-bottom" style={{ height: height }}>
                {transportErrors && transportErrors.length > 0 ?
                  transportErrors.map((module, index) => (
                    <TransportErrors
                      key={index}
                      module={module}
                      MoreImg={More}
                      errorImg={error}
                      HtmlTooltip={HtmlTooltip}
                    />
                  )) : null}
              </div>
            </div>
          </Grid>
        </Grid>
      </div >
    </ThemeProvider >
  )
}


export default Storage