import React, { useEffect, useState } from 'react';
import './css/toggling.css'
import axios from 'axios';
import moment from 'moment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';


const BootstrapButton1 = styled(Button)({
  width: '120px',
  height: '32px',
  fontSize: '13px',
  textTransform: 'none',
  color: '#FFFFFF',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: 'green',
  }
})

const BootstrapButton2 = styled(Button)({
  width: '120px',
  height: '35px',
  textTransform: 'none',
  color: '#FFFFFF',
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 363,
  minHeight: 185,
  maxHeight: 300,
  bgcolor: '#F2F2F2',
  border: '1px solid #ccc',
  borderRadius: '7px',
  p: 4,
  paddingTop: 5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};


function Toggling() {
  const [togglingPageDatas, setTogglingPageDatas] = useState([])
  const [changedName, setChangedName] = useState('')
  const [retrieveCodeName, setRetrieveCodeName] = useState('')
  const [activationCodeValue, setActivationCodeValue] = useState('')
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  useEffect(() => {
    getTogglingPageData();
  }, []);


  function getTogglingPageData() {
    axios.post('/api/getTogglingPageData').then(res => {
      let data = res.data.data;
      setTogglingPageDatas(data);
    })
  }

  function updateTogglingPage(name, value, type, setOpenFunction) {
    axios.post('/api/updateTogglingPage', { name: name, [type]: value }).then(res => {
      if (res.status === 200) {
        setOpenFunction(false);
        getTogglingPageData();
      } else {
        console.error('Update failed with status:', res.status);
        alert('Failed to update. Please try again.');
      }
    }).catch(error => {
      console.error('Error updating:', error);
      alert('An error occurred while updating. Please try again.');
    });
  }


  const handleOpen = (value) => {
    setChangedName(value);
    setOpen(true);
  }
  const handleClose = () => {
    setChangedName('');
    setOpen(false);
  }
  const handleConfirm = () => {
    if (changedName) {
      updateTogglingPage(changedName, 'Offline', 'newStatus', setOpen);
    }
  }


  const handleOpen1 = (value) => {
    setRetrieveCodeName(value);
    setOpen1(true);
  }
  const handleClose1 = () => {
    setRetrieveCodeName('');
    setActivationCodeValue('');
    setOpen1(false);
  }
  const handleActivationCode = () => {
    if (retrieveCodeName && activationCodeValue) {
      updateTogglingPage(retrieveCodeName, activationCodeValue, 'activationCode', setOpen1);
      setActivationCodeValue('');
    }
  }


  return (
    <div className="toggling-container-div">
      <div className='page-container-top'>
        <div className='page-container-left-title'>Toggling Page</div>
        <div><CloseIcon style={{ cursor: 'pointer', width: '30px', height: '30px' }} /></div>
      </div>

      <div className='toggling-container'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#F2F6FC' }}>
              <TableRow sx={{ 'th': { color: 'rgb(22, 63, 143)' } }}>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell>OT Gateway</TableCell>
                <TableCell align="center">Current Status</TableCell>
                <TableCell align="center">Activation Code</TableCell>
                <TableCell align="center">Last Updated Date</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {togglingPageDatas.length > 0 && togglingPageDatas.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    <BootstrapButton1
                      sx={{
                        backgroundColor: item.status === 'Online' ? '#00B050' : item.status === 'Offline' ? '#7F7F7F' : '#FFC000',
                        '&:disabled': {
                          color: 'white'
                        },
                      }}
                      disabled={item.status !== 'Online'}
                      onClick={() => handleOpen(item.name)}
                    >
                      {item.status}
                    </BootstrapButton1>
                  </TableCell>
                  <TableCell align="center">
                    {item.status === 'Offline' && (
                      <BootstrapButton1 sx={{ backgroundColor: '#7F7F7F' }} onClick={() => handleOpen1(item.name)}>
                        Retrieve Code
                      </BootstrapButton1>
                    )}
                  </TableCell>
                  <TableCell align="center">{moment(item.updateDate).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
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
          <Typography id="modal-modal-title">
            Are you sure you want to shutdown {changedName ? <b>{changedName}</b> : ''}?
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <BootstrapButton2 sx={{ backgroundColor: '#002150', '&:hover': { backgroundColor: '#4D6485', } }}
              onClick={handleClose}>
              Cancel
            </BootstrapButton2>
            <BootstrapButton2 sx={{ backgroundColor: '#CC9600', '&:hover': { backgroundColor: '#DBB64D', } }}
              onClick={handleConfirm}>
              Confirm
            </BootstrapButton2>
          </div>
        </Box>
      </Modal>


      {/* Retrieve Code Model */}
      <Modal
        open={open1}
        // onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose1}
            sx={(theme) => ({
              position: 'absolute',
              right: 0,
              top: 0,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title">
            Paste the code into the box below to startup <b>{retrieveCodeName}</b>:
          </Typography>

          <textarea style={{ height: '86px', marginBottom: '15px', borderRadius: '3px', border: '1px solid #bbb' }}
            value={activationCodeValue}
            onChange={(e) => setActivationCodeValue(e.target.value)} />

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <BootstrapButton2 sx={{ backgroundColor: '#002150', '&:hover': { backgroundColor: '#4D6485', } }}
              onClick={handleClose1}>
              Cancel
            </BootstrapButton2>
            <BootstrapButton2 sx={{ backgroundColor: '#CC9600', '&:hover': { backgroundColor: '#DBB64D', } }}
              onClick={handleActivationCode}>
              Confirm
            </BootstrapButton2>
          </div>
        </Box>
      </Modal>
    </div >
  )
}

export default Toggling