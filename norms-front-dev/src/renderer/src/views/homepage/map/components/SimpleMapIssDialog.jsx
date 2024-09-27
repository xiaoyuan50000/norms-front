import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import '../css/simpleMapIssDialog.css'

function SimpleMapIssDialog({ isOpen, onClose, data }) {
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
          minHeight: '100px',
          position: 'relative'
        }
      }}
    >
      <DialogTitle id="simple-dialog-title" style={{ fontWeight: 'bold', marginRight: '30px' ,paddingBottom: '0px'}}>
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
        <span style={{fontWeight: 'bold',marginLeft: '30px',color: '#a17004'}}>
          {/* uadsd */}
        </span>
        {/* {data.title} */}
      </DialogTitle>
      <div className='smd-container'>
        <div className="iss-data">
          <div className='iss-ioc-name  iss-title' style={{borderBottom:'2px solid #e9e9e9'}}>
              <span style={{fontWeight: 'bolder'}}>{data.title}</span>
          </div>
        </div>
        {
          data.data.map((iss,i)=>(
        <div className="iss-data" key={i}>
          <div className='iss-ioc-name'>
          <span className="status-circle-iss" style={{ backgroundColor: iss.bgColor }}></span>
            <span>{iss.name}</span>
          </div>
          <span className="iss-ioc-num" >{iss.num}</span>
        </div>
          ))
        }
      </div>
    </Dialog >
  );
}


export default SimpleMapIssDialog;