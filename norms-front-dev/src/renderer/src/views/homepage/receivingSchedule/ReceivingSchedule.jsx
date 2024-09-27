import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/receivingSchedule.css'
import axios from 'axios';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import uploadBlue from '../../../images/map/upload-blue.svg'
import uploadGreen from '../../../images/map/upload-green.svg'
import uploadRed from '../../../images/map/upload-red.svg'
import dustbin from '../../../images/map/dustbin.svg'
import ok from '../../../images/map/ok.svg'


const BootstrapButton2 = styled(Button)({
  width: '90px',
  height: '27px',
  textTransform: 'none',
  color: '#FFFFFF',
  fontSize: '14px',
})
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  minHeight: 185,
  maxHeight: 300,
  bgcolor: '#F2F2F2',
  borderRadius: '7px',
  p: 4,
  paddingTop: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};


function ReceivingSchedule() {
  const navigate = useNavigate();
  const [binNumber, setBinNumber] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [receivingScheduleDatas, setReceivingScheduleDatas] = useState([])
  const [unfoldedCrsNumber, setUnfoldedCrsNumber] = useState(null);
  const [detailedData, setDetailedData] = useState([]);


  // initialize
  useEffect(() => {
    getReceivingScheduleData();
  }, []);
  function getReceivingScheduleData() {
    axios.post('/api/getReceivingScheduleData').then(res => {
      let data = res.data.data;
      setReceivingScheduleDatas(data);
    })
  }


  async function getDetailedData(crsNumber) {
    await axios.post('/api/getRsDetailedData', { crsNumber: crsNumber }).then(res => {
      let data = res.data.data;
      setDetailedData(data);
    })
  }


  const toggleStatus = () => {
    setStatus(!status);
    setOpen(!open);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }


  const handleUnfold = (crsNumber) => {
    if (unfoldedCrsNumber === crsNumber) {
      setUnfoldedCrsNumber(null);
      setDetailedData(null);
    } else {
      setUnfoldedCrsNumber(crsNumber);
      getDetailedData(crsNumber);
    }
  };


  const regexOnlyNumbers = /^[0-9]+$/;
  const regexNumbersWithDecimal = /^[0-9][0-9]*(\.[0-9]*)?$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const regexTest = name === 'binNumber' ? regexOnlyNumbers : regexNumbersWithDecimal;
    if (regexTest.test(value) || value === '') {
      switch (name) {
        case 'binNumber':
          setBinNumber(value);
          break;
        case 'minWeight':
          setMinWeight(value);
          break;
        case 'maxWeight':
          setMaxWeight(value);
          break;
        default:
          break;
      }
    }
  };


  const handleUnfoldDetails = (crsNumber) => {
    navigate(`/homepage/cartonsReceived/${crsNumber}`);
  }


  return (
    <div className='outer-div'>
      <div className="issuingSchedule-container-div">
        <div className='page-container-top schedule'>
          <div className='page-container-left-title'>Receiving Schedule</div>
          <div className='gcc-avg'>
            {status ? (
              <>
                <div className='rs-topRightCorner' onClick={handleOpen} >
                  GCC
                  <img className='rs-topRightCorner-img' src={uploadGreen} alt="#" />
                  <span style={{ color: '#00AF50', fontWeight: 'bold' }}>
                    On Pause
                  </span>
                </div>
                <button className={`receivingSchedule-button ` + (status ? 'rs-inactive-state' : 'rs-activated-state')}>
                  + Add New Schedule
                </button>
              </>
            ) : (
              <>
                <div className='rs-topRightCorner' onClick={handleOpen} >
                  GCC
                  <img className='rs-topRightCorner-img' src={uploadBlue} alt="#" />
                </div>
                <button className={`receivingSchedule-button ` + (status ? 'rs-inactive-state' : 'rs-activated-state')}>+ Add New Schedule</button>
              </>
            )}
          </div>
        </div>


        <div className='issuingSchedule-container'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#F2F6FC' }}>
                <TableRow sx={{ 'th': { color: 'rgb(22, 63, 143)' } }}>
                  <TableCell></TableCell>
                  <TableCell align="center">CRS Number</TableCell>
                  <TableCell align="center">Total No. Of Cartons</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Created By</TableCell>
                  <TableCell align="center">Last Update Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ 'td': { backgroundColor: '#F2F2F2', fontSize: '13px !important', color: 'black' } }}>
                {receivingScheduleDatas.length > 0 && receivingScheduleDatas.map(item => (
                  <Fragment key={item.crsNumber}>
                    <TableRow >
                      <TableCell></TableCell>
                      <TableCell align="center">
                        <span
                          style={{
                            cursor: status ? 'pointer' : 'auto',
                            color: 'black'
                          }}
                          onClick={status ? () => handleUnfold(item.crsNumber) : () => { }}>
                          {unfoldedCrsNumber === item.crsNumber ? (
                            <KeyboardDoubleArrowUpIcon style={{
                              width: '20px',
                              height: '20px',
                              color: 'rgb(22, 63, 143)',
                            }} />
                          ) : (
                            <KeyboardDoubleArrowDownIcon style={{
                              width: '20px',
                              height: '20px',
                              color: 'rgb(22, 63, 143)',
                            }} />
                          )}
                          {item.crsNumber}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span className='countCrsNumber-span'
                          style={{ cursor: status ? 'pointer' : 'auto' }}
                          onClick={status ? () => handleUnfoldDetails(item.crsNumber) : () => { }}
                        >
                          {item.countCrsNumber}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <button
                          style={{
                            borderRadius: '4px',
                            color: '#FFFFFF',
                            background: status ? '#00AF50' : '#A3A3A3',
                            lineHeight: '25px',
                            fontSize: '13px',
                            width: '100px',
                            fontWeight: '100',
                            cursor: 'auto',
                          }}>
                          {item.action}
                        </button>
                      </TableCell>
                      <TableCell align="center">{item.createdBy}</TableCell>
                      <TableCell align="center">{moment(item.maxLastUpdatedDate).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    {unfoldedCrsNumber === item.crsNumber && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div>123</div>

                          <Table sx={{ minWidth: 650, border: '2px solid #ddd', borderTop: '2px solid #869AC0' }} aria-label="detailed table">
                            <TableHead sx={{ backgroundColor: '#F6F8FB' }}>
                              <TableRow sx={{ 'th': { color: 'rgb(22, 63, 143)' } }}>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">CRS Number</TableCell>
                                <TableCell align="center">Barcode</TableCell>
                                <TableCell align="center">Min Weight</TableCell>
                                <TableCell align="center">Max Weight</TableCell>
                                <TableCell align="center">Created By</TableCell>
                                <TableCell align="center">Last Update Date</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody sx={{ 'td': { backgroundColor: '#FFFFFF', fontSize: '13px !important', color: 'black' } }}>
                              {detailedData && (
                                detailedData.map(item => (
                                  <TableRow key={item.id}>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center">{item.crsNumber}</TableCell>
                                    <TableCell align="center">{item.barcode}</TableCell>
                                    <TableCell align="center">{item.minWeight}</TableCell>
                                    <TableCell align="center">{item.maxWeight}</TableCell>
                                    <TableCell align="center">{item.createdBy}</TableCell>
                                    <TableCell align="center">{moment(item.maxLastUpdatedDate).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                                    <TableCell align="center">
                                      <img src={dustbin} alt="dustbin" style={{ width: '17px', height: '17px' }} />
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                  </TableRow>
                                ))
                              )}

                              <TableRow sx={{ 'td': { backgroundColor: '#F6F8FB' } }}>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">{unfoldedCrsNumber}</TableCell>
                                <TableCell align="center">
                                  <input
                                    type="text"
                                    name='binNumber'
                                    className='rsAdd-input'
                                    value={binNumber}
                                    onChange={handleInputChange}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <input
                                    type="text"
                                    name='minWeight'
                                    className='rsAdd-input'
                                    value={minWeight}
                                    onChange={handleInputChange}
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <input
                                    type="text"
                                    name='maxWeight'
                                    className='rsAdd-input'
                                    value={maxWeight}
                                    onChange={handleInputChange}
                                  />
                                </TableCell>
                                <TableCell align="center">NORMS</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">
                                  <img src={ok} alt="ok" style={{ width: '25px', height: '25px' }} />
                                </TableCell>
                                <TableCell align="center"></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>


      <Modal open={open}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 0,
              top: 0,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" sx={{ fontSize: '16px' }}>
            Do you want PCOM to take over the receiving schedule?
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <BootstrapButton2 sx={{ backgroundColor: '#002150', '&:hover': { backgroundColor: '#4D6485', } }}
              onClick={handleClose}>
              No
            </BootstrapButton2>
            <BootstrapButton2 sx={{ backgroundColor: '#CC9600', '&:hover': { backgroundColor: '#DBB64D', } }}
              onClick={toggleStatus}>
              Yes
            </BootstrapButton2>
          </div>
        </Box>
      </Modal>
    </div >
  )
}

export default ReceivingSchedule