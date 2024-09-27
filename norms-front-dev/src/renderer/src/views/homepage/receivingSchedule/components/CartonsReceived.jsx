import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/cartonsReceived.css'
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

import uploadBlue from '../../../../images/map/upload-blue.svg'
import uploadGreen from '../../../../images/map/upload-green.svg'


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

const styleFeature = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: '#F2F2F2',
  borderRadius: '0 0 7px 7px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};


function CartonsReceived() {
  const [rsId, setRsId] = useState(parseInt(useParams().rsId));
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [showNewRecordRow, setShowNewRecordRow] = useState(false);
  const [toSKUOpen, setToSKUOpen] = useState(false);
  const [cartonsReceivedDatas, setCartonsReceivedDatas] = useState([])
  const [dialog, setDialog] = useState([]);
  const [newRecord, setNewRecord] = useState({
    barcode: '',
    minWeight: '',
    maxWeight: '',
    weightCheck: '',
    createdBy: 'NORMS',
    craneID: 1,
    locationX: 'X',
    locationY: 'Y',
    locationZ: 'Z',
    lastUpdatedDate: new Date()
  });
  const [inputs, setInputs] = useState({
    barcode: '',
    minWeight: '',
    maxWeight: '',
    X: '',
    Y: '',
    Z: '',
  });
  const [newNumber, setNewNumber] = useState('');
  const [oldTuNumber, setOldTuNumber] = useState('');
  const [binNumber, setBinNumber] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [labelPrinter, setLabelPrinter] = useState('');
  const [irtMember1, setIrtMember1] = useState('');
  const [irtMember2, setIrtMember2] = useState('');
  const today = new Date();

  console.log(rsId);

  useEffect(() => {
    getCartonsReceivedData(rsId);
  }, []);


  function getCartonsReceivedData(rsId) {
    axios.post('/api/getCartonsReceivedData', { rsId: rsId }).then(res => {
      let data = res.data.data;
      setCartonsReceivedDatas(data);
    })
  }


  // async function saveData(newDates) {
  //   try {
  //     const response = await axios.post('/api/saveReceivingScheduleData', newDates);
  //     if (response.status === 200) {
  //       getCartonsReceivedData(rsId);
  //     }
  //   } catch (error) {
  //     console.error('Error saving data', error);
  //   }
  // }


  const toggleStatus = () => {
    setStatus(!status);
    setOpen(!open);
    setShowNewRecordRow(false);
  }
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }


  const handleActionOpen = (barcode, name, id, oldTuNumber) => {
    setOldTuNumber(oldTuNumber);
    setDialog([barcode, name, id]);
    setNewNumber(generateAndSetNewTuNumber());
    setActionOpen(true);
  }
  const handleActionClose = () => {
    clearData();
    setActionOpen(false);
  }
  const handleAddTuNamber = async (id, newTuNumber) => {
    try {
      const response = await axios.post('/api/receivingScheduleAddTuNamber', { id, newTuNumber, labelPrinter, irtMember1, irtMember2 });
      if (response.status === 200) {
        handleActionClose();
        getCartonsReceivedData(rsId);
      }
    } catch (error) {
      console.error('Error adding TU number.', error);
    }
  };


  const handleAddNewData = async () => {
    let newData = {
      'rsId': rsId,
      'createdBy': 'NORMS',
      'barcode': binNumber,
      'minWeight': minWeight,
      'maxWeight': maxWeight,
      'tuNumber': newNumber,
      'craneID': 1,
      'labelPrinter': labelPrinter,
      'irtMember1': irtMember1,
      'irtMember2': irtMember2,
    }

    try {
      const response = await axios.post('/api/receivingScheduleAddNewData', newData);
      if (response.status === 200) {
        handleActionClose();
        getCartonsReceivedData(rsId);
      }
    } catch (error) {
      console.error('Error adding New Data.', error);
    }
  }


  const clearData = () => {
    setDialog(['', '', '']);
    setBinNumber('');
    setMinWeight('');
    setMaxWeight('');
    setOldTuNumber('');
    setNewNumber('');
    setLabelPrinter('');
    setIrtMember1('');
    setIrtMember2('');
  }


  const handleAddNewRecordClick = () => {
    setActionOpen(true);

    setDialog(['', 'Add New Carton/Bin', '']);
    setNewNumber(generateAndSetNewTuNumber());
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


  // Unique random code.
  const generateUniqueTuNumber = (existingNumbers) => {
    let newNumber;
    do {
      newNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
    } while (existingNumbers.includes(newNumber));
    return newNumber;
  };
  const generateAndSetNewTuNumber = () => {
    const existingNumbers = cartonsReceivedDatas.map(item => item.tuNumber);
    const uniqueTuNumber = generateUniqueTuNumber(existingNumbers);
    return uniqueTuNumber
  };


  // const handleInputBlur = () => {
  //   const newData = {
  // 'rsId': rsId,
  // 'action': 'Completed',
  // 'createdBy': 'NORMS',
  // 'lastUpdatedDate': newRecord.lastUpdatedDate,
  // 'barcode': inputs.barcode,
  // 'minWeight': inputs.minWeight,
  // 'maxWeight': inputs.maxWeight,
  // 'craneID': 1,
  //   }

  //   if (inputs.barcode && inputs.minWeight && inputs.maxWeight) {
  //     saveData(newData);
  //   }
  // };


  // const handleToSKUOpen = (name) => {
  //   setDialog(['', name, '']);
  //   setInputs({ ...inputs, X: '', Y: '', Z: '', });
  //   setToSKUOpen(true);
  // }


  // const handleToSKUClose = () => {
  //   setToSKUOpen(false);
  // }


  // const coordinateUpdating = async (TuNumber, X, Y, Z) => {
  //   let locationX = X === '' ? null : X;
  //   let locationY = Y === '' ? null : Y;
  //   let locationZ = Z === '' ? null : Z;
  //   try {
  //     const response = await axios.post('/api/receivingScheduleCoordinateUpdating', { TuNumber, locationX, locationY, locationZ });
  //     if (response.status === 200) {
  //       console.log('Coordinates updated successfully', response.data);
  //       handleToSKUClose();
  //       getCartonsReceivedData(rsId);
  //     }
  //   } catch (error) {
  //     console.error('Error updating coordinates', error);
  //   }
  // }


  return (
    <div className='outer-div'>
      <div className="receivingSchedule-container-div">
        <div className='page-container-top schedule' >
          <div className='page-container-left-title'>Cartons Schedule</div>
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
                <button className={`receivingSchedule-button ` + (status ? 'rs-inactive-state' : 'rs-activated-state')} style={{ backgroundColor: '#002455' }} onClick={handleAddNewRecordClick}>
                  + Add New Record
                </button>
              </>
            ) : (
              <>
                <div className='rs-topRightCorner' onClick={handleOpen} >
                  GCC
                  <img className='rs-topRightCorner-img' src={uploadBlue} alt="#" />
                </div>
                <button className={`receivingSchedule-button ` + (status ? 'rs-inactive-state' : 'rs-activated-state')}>+ Add New Record</button>
              </>
            )}
          </div>
        </div>


        <div className='receivingSchedule-container'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#F2F6FC' }}>
                <TableRow sx={{ 'th': { color: 'rgb(22, 63, 143)' } }}>
                  <TableCell></TableCell>
                  <TableCell align="center">Barcode</TableCell>
                  <TableCell align="center">Min Weight</TableCell>
                  <TableCell align="center">Max Weight</TableCell>
                  <TableCell align="center">Weight Check</TableCell>
                  <TableCell align="center">Created By</TableCell>
                  <TableCell align="center">TU Number</TableCell>
                  <TableCell align="center">Crane ID</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Last Updated Date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ 'td': { padding: '5px', backgroundColor: '#F2F2F2', fontSize: '13px !important', fontWeight: 'bold' } }}>
                {/* {showNewRecordRow && status && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                      <input
                        type="text"
                        name="barcode"
                        className='rs-pageInput'
                        value={inputs.barcode}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="text"
                        name="minWeight"
                        className='rs-pageInput'
                        value={inputs.minWeight}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="text"
                        name="maxWeight"
                        className='rs-pageInput'
                        value={inputs.maxWeight}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                      />
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{newRecord.createdBy}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{newRecord.craneID}</TableCell>
                    <TableCell align="center">X<br />Y<br />Z</TableCell>
                    <TableCell align="center">
                      {inputs.barcode && (
                        <button
                          style={{ width: '85px' }}
                          className={`receivingSchedule-button ` + (status ? 'colorBlue' : 'rs-activated-state')}
                        // onClick={() => handleActionOpen(inputs.barcode, "Print Label")}
                        >
                          Print Label
                        </button>
                      )}
                    </TableCell>
                    <TableCell align="center">{moment(today).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )} */}


                {cartonsReceivedDatas.length > 0 && cartonsReceivedDatas.map(item => (
                  <TableRow key={item.id}>
                    <TableCell></TableCell>
                    <TableCell align="center">{item.barcode}</TableCell>
                    <TableCell align="center">{item.minWeight}</TableCell>
                    <TableCell align="center">{item.maxWeight}</TableCell>
                    <TableCell align="center" sx={{ color: item.weightCheck === 'Pass' ? 'green' : item.weightCheck === 'Fail' ? 'red' : '' }}>
                      {item.weightCheck}
                    </TableCell>
                    <TableCell align="center">{item.createdBy}</TableCell>
                    <TableCell align="center">
                      {item.tuNumber && (
                        <>
                          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.tuNumber}</span><br />
                          <button
                            className={`receivingSchedule-button ` + (status ? 'colorBlue' : 'rs-activated-state')}
                            onClick={status ? () => handleActionOpen(item.barcode, "Re-print Label", item.id, item.tuNumber) : () => { }}>
                            Re-print Label
                          </button>
                        </>
                      )}
                    </TableCell>
                    <TableCell align="center">{item.craneID}</TableCell>
                    <TableCell align="center">
                      X {item.locationX}
                      <br />
                      Y {item.locationY}
                      <br />
                      Z {item.locationZ}
                    </TableCell>
                    <TableCell align="center">
                      {!item.tuNumber ? (
                        <button
                          className={`receivingSchedule-button ${status ? 'colorBlue' : 'rs-activated-state'}`}
                          style={{ width: '85px' }}
                          onClick={status ? () => handleActionOpen(item.barcode, "Print Label", item.id, '') : () => { }}>
                          Print Label
                        </button>
                      ) : (
                        <button
                          className={`receivingSchedule-button ${status ? 'colorBlue2' : 'rs-activated-state'}`}
                          style={{ width: '85px' }}
                        // onClick={status ? () => handleToSKUOpen(item.tuNumber) : () => { }}
                        >
                          Stored
                        </button>
                      )}
                    </TableCell>
                    <TableCell align="center">{moment(item.lastUpdatedDate).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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


        <Modal open={actionOpen}>
          <Box sx={styleFeature}>
            <div className='modelTitle' id="customized-dialog-title">
              {dialog[1]}
              <IconButton
                onClick={handleActionClose}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 3,
                  top: 3,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <div className='modelContent'>
              <div className='printLabelContainer'>
                {dialog[0] ? (
                  <div className='printLabel-leftDiv'>
                    <span className='printLabel-left'>Carton Barcode</span>
                    <span className='printLabel-fontBold'>{dialog[0]}</span>
                  </div>
                ) : (
                  <>
                    <div className='printLabel-leftDiv'>
                      <span className='printLabel-left' style={{ lineHeight: '15px' }}>Bin Number :<br />(Optional)</span>
                      <span className='printLabel-fontBold'>
                        <input
                          type="text"
                          name='binNumber'
                          className='toSKU-input'
                          value={binNumber}
                          onChange={handleInputChange}
                        />
                      </span>
                    </div>

                    <div className='printLabel-leftDiv'>
                      <span className='printLabel-left'>Min Weight</span>
                      <span className='printLabel-fontBold'>
                        <input
                          type="text"
                          name='minWeight'
                          className='toSKU-input'
                          value={minWeight}
                          onChange={handleInputChange}
                        />
                      </span>
                    </div>

                    <div className='printLabel-leftDiv'>
                      <span className='printLabel-left'>Max Weight</span>
                      <span className='printLabel-fontBold'>
                        <input
                          type="text"
                          name='maxWeight'
                          className='toSKU-input'
                          value={maxWeight}
                          onChange={handleInputChange}
                        />
                      </span>
                    </div>
                  </>
                )}
                {oldTuNumber && (
                  <div className='printLabel-leftDiv'>
                    <span className='printLabel-left'>Old TU Number</span>
                    <span className='printLabel-fontBold'>{oldTuNumber}</span>
                  </div>
                )}
                <div className='printLabel-leftDiv'>
                  <span className='printLabel-left'>New TU Number</span>
                  <span className='printLabel-fontBold'>{newNumber}</span>
                </div>
                <div className='printLabel-leftDiv printLabel-bottomDiv'>
                  <span className='printLabel-left printLabel-bottom'>Label Printer</span>
                  <div className='printLabel-fontBold'>
                    <select className='action-select-style' onChange={(e) => setLabelPrinter(e.target.value)}>
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <ArrowDropDownIcon style={{ position: 'absolute', right: 5, top: 1 }} />
                  </div>
                </div>
                <div className='printLabel-leftDiv'>
                  <span className='printLabel-left printLabel-bottom'>IRT Member 1</span>
                  <span className='printLabel-fontBold'>
                    <input
                      type="text"
                      name='irtMember1'
                      className='toSKU-input'
                      onChange={(e) => setIrtMember1(e.target.value)}
                    />
                  </span>
                </div>
                <div className='printLabel-leftDiv'>
                  <span className='printLabel-left printLabel-bottom'>IRT Member 2</span>
                  <span className='printLabel-fontBold'>
                    <input
                      type="text"
                      name='irtMember2'
                      className='toSKU-input'
                      onChange={(e) => setIrtMember2(e.target.value)}
                    />
                  </span>
                </div>
              </div>

              <div className='dialog-bottom-buttomDiv'>
                <BootstrapButton2 sx={{ backgroundColor: '#002150', '&:hover': { backgroundColor: '#4D6485' }, marginRight: '15px' }}
                  onClick={handleActionClose}>
                  Cancel
                </BootstrapButton2>
                <BootstrapButton2 sx={{ backgroundColor: '#CC9600', '&:hover': { backgroundColor: '#DBB64D', }, marginLeft: '15px' }}
                  onClick={dialog[0] ? () => handleAddTuNamber(dialog[2], newNumber) : () => handleAddNewData()}>
                  Print
                </BootstrapButton2>
              </div>
            </div>
          </Box>
        </Modal>


        {/* <Modal open={toSKUOpen}>
          <Box sx={styleFeature}>
            <div className='modelTitle' id="customized-dialog-title">
              Send Carton Intl SKU
              <IconButton
                onClick={handleToSKUClose}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 3,
                  top: 3,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
            </div>


            <div className='modelContent'>
              <div className='printLabelContainer' style={{ height: '160px' }}>
                <div className='printLabel-leftDiv'>
                  <span className='toSKU-left'>TU Number</span>
                  <span className='printLabel-fontBold'>{dialog[1]}</span>
                </div>
                <div className='printLabel-leftDiv printLabel-bottomDiv'>
                  <span className='toSKU-left printLabel-bottom' >Select Crane</span>
                  <div className='printLabel-fontBold'>
                    <select className='action-select-style' style={{ width: '180px' }}>
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <ArrowDropDownIcon style={{ position: 'absolute', right: 5 }} />
                  </div>
                </div>
                <div className='printLabel-leftDiv'>
                  <span className='toSKU-left printLabel-bottom'>X</span>
                  <span className='printLabel-fontBold'>
                    <input
                      type="text"
                      name='X'
                      className='toSKU-input'
                      value={inputs.X}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className='printLabel-leftDiv'>
                  <span className='toSKU-left printLabel-bottom'>Y</span>
                  <span className='printLabel-fontBold'>
                    <input
                      type="text"
                      name='Y'
                      className='toSKU-input'
                      value={inputs.Y}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
                <div className='printLabel-leftDiv'>
                  <span className='toSKU-left printLabel-bottom'>Z</span>
                  <span className='printLabel-fontBold'>
                    <input
                      type="text"
                      name='Z'
                      className='toSKU-input'
                      value={inputs.Z}
                      onChange={handleInputChange}
                    />
                  </span>
                </div>
              </div>

              <div className='dialog-bottom-buttomDiv'>
                <BootstrapButton2 sx={{ backgroundColor: '#002150', '&:hover': { backgroundColor: '#4D6485' }, marginRight: '15px' }}
                  onClick={handleToSKUClose}>
                  Cancel
                </BootstrapButton2>
                <BootstrapButton2 sx={{ backgroundColor: '#CC9600', '&:hover': { backgroundColor: '#DBB64D', }, marginLeft: '15px' }}
                  onClick={() => coordinateUpdating(dialog[1], inputs.X, inputs.Y, inputs.Z)}>
                  Confirm
                </BootstrapButton2>
              </div>
            </div>
          </Box>
        </Modal> */}
      </div >
    </div >
  )
}

export default CartonsReceived