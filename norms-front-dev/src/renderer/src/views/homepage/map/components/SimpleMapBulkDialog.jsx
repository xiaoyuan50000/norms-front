import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import '../css/simpleMapBulkDialog.css'

function SimpleMapBulkDialog({ isOpen, onClose, data }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      sx={{zIndex:9999999}}
      PaperProps={{
        style: {
          borderRadius: '10px',
          margin: 0,
          maxWidth: '800px',
          minHeight: '100px'
        }
      }}
    >
      <DialogTitle id="simple-dialog-title" style={{ fontWeight: 'bold', marginRight: '30px', paddingBottom: '0px' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 11,
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px',
            zIndex:99,
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
        <span>&nbsp;</span>
      </DialogTitle>
      <div className='smd-container'>
        <div className="bulk-data">
          <div className='bulk-ioc-name  bulk-title' style={{ borderBottom: '2px solid #e9e9e9' }}>
            <span style={{ fontWeight: 'bolder' }}>{data.title}</span>
          </div>
        </div>
        <div className="bulk-data">
          <div className='bulk-ioc-name' style={{ border: 'unset', position: 'absolute', fontSize: '14px', top: '-35px',  right: '30px'}}>
            <span className="bulk-flex-long1"></span>
            <span className="bulk-flex-long2"></span>
            <span className="bulk-flex-long3" style={{ fontWeight: 'bolder' }}>Outstanding</span>
            <span className="bulk-flex-long4" style={{ fontWeight: 'bolder' }}>Completed</span>
          </div>
          {
            data.data.map((bulk,i)=>(
            <div className='bulk-ioc-name' key={i}>
              <span className="bulk-flex-long1">{bulk.name}</span>
              <span className="bulk-flex-long2"  style={{color: bulk.statusColor}}>{bulk.status}</span>
              <span className="bulk-flex-long3">{bulk.outstanding}</span>
              <span className="bulk-flex-long4">{bulk.completed}</span>
            </div>
            
            ))
          }
        </div>
      </div>
    </Dialog >
  );
}


export default SimpleMapBulkDialog;