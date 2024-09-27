import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function ApiKeyView() {
  const [rows, setRows] = useState([])
  const [alertInfoList, setAlertInfoList] = useState([])

  useEffect(() => {
    reViewList()
    setInterval(function () {
      removeAlert()
    }, 1000)
  }, []);

  function updateApiKey(id) {
    axios.post('/api/updateApiKey', { id }).then(res => {
      reViewList();
      if (res.data && res.data.code == 1) {
        alertMag({ msg: 'update apiKey successfully', type: 'success' })
      } else {
        alertMag({ msg: res.data.msg, type: 'error' })
      }
    })
  }

  function alertMag({ msg, type }) {
    setAlertInfoList(pre => [...pre, { time: new Date().getTime(), msg, type }])
  }

  function removeAlert() {
    let now = new Date().getTime();
    setAlertInfoList(pre => [...pre.filter((x, i) => (x.time * 1 + 2000) > now)])
  }

  function reViewList() {
    axios.post('/api/getApiKeyList').then(res => {
      let data = res.data.data
      setRows(data)
    })
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f2f6fc',
      color: '#163f8f',
      fontSize: '16px !important',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <>
      <div>
        <Stack sx={{ minWidth: '20%', maxWidth: '30%', position: 'fixed', left: '40%', top: '35px', display: 'flex', zIndex: '999' }} spacing={2}>
          {
            alertInfoList.map((item) => (
              <Alert key={item.time} severity={item.type}>{item.msg}</Alert>
            ))
          }
        </Stack>
        <Paper sx={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
          <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px 0 20px', borderBottom: '2px solid #163f8f', fontSize: '18px' }}>
            <div style={{ fontWeight: 'bold', color: '#163f8f' }}>
              API Key List
            </div>
            <div>
              {/* <CloseIcon style={{ cursor: 'pointer', width: '30px', height: '30px' }} onClick={()=>{navigate('/map')}}/> */}
            </div>
          </div>
          <TableContainer  >
            <Table sx={{ minWidth: 650, marginTop: '0px', padding: '0px' }} style={{ minHeight: 'calc(100vh+60px' }} aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">OT Gateway</StyledTableCell>
                  <StyledTableCell align="center">API Key Last Updated</StyledTableCell>
                  <StyledTableCell align="center">API Key Expiry Date</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" scope="row"></TableCell>
                    <TableCell align="left" scope="row"></TableCell>
                    <TableCell align="left" component="th" scope="row">
                      {row.otGateway}
                    </TableCell>
                    <TableCell align="center">{row.updateDate ? new Date(Number(row.updateDate)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</TableCell>
                    <TableCell align="center">{row.oplDate ? new Date(Number(row.oplDate)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</TableCell>
                    <TableCell align="left">
                      <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => updateApiKey(row.id)}>
                        <img style={{ marginRight: '10px', width: '20px', height: '20px', position: 'relative', bottom: '1px' }} src="/src/images/renewAPIKey.svg" />
                        <span>Renew API Key</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  )
}

export default ApiKeyView;
