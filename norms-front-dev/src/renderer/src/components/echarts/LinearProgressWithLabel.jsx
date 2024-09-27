import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import yes from '../../images/yes.svg'
import jg from '../../images/jg.svg'
import wrong from '../../images/wrong.svg'


function LinearProgressWithLabel({ headline, value, state }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '13px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="body2" style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {headline}
        </Typography>
        <Typography variant="body2" color="#1D1D1D" style={{ fontWeight: 'bold' }}>
          {`${value}%`}
        </Typography>
      </div>

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          width: '100%',
          borderRadius: '15px',
          height: '8px',
          bgcolor: '#ECEFF3',
          '& .MuiLinearProgress-bar': {
            borderRadius: '15px', 
            backgroundColor: '#2A3675', 
          }
        }}
      />

      <div style={{ display: 'flex', alignItems: 'left' }}>
        <Typography variant="body2" color="text.secondary" style={{ fontSize: '10px', color: '#747D8B', marginTop: '5px' }}>
          <img src={wrong} style={{ marginRight: '4px', width: '12px', height: '12px' }} />
          {state}
        </Typography>
      </div>
    </div>
  );
}

export default LinearProgressWithLabel;