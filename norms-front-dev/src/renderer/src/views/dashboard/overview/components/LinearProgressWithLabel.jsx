import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

function LinearProgressWithLabel({ onAddTask, text, headline, value, state, color, imgs, details }) {
  let tableHeaders = [];
  let formattedData = [];
  const title = 'Note Processing Schedules - ' + text;
  const showImage = imgs && imgs.trim() !== '';

  if (Array.isArray(details) && details.length > 0) {
    const firstDetail = details[0];
    tableHeaders = Object.keys(firstDetail).filter(key => typeof key === 'string');
    formattedData = details.map(item => tableHeaders.map(header => item[header]));
  }

  const handleClick = () => {
    onAddTask({ title: title, tableHeaders: tableHeaders, data: formattedData });
  };

  return (
    <div className='nps-bottom-module' onClick={handleClick}>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="body2" style={{ fontSize: '0.9375rem', fontWeight: 'bold' }}>
            {headline}
          </Typography>
          <Typography variant="body2" color={color} style={{ fontWeight: 'bold' }}>
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
              backgroundColor: '#BE965A'
            }
          }}
        />

        <div style={{ display: 'flex', alignItems: 'left' }}>
          <Typography variant="body2" color="text.secondary" style={{ fontSize: '10px', color: '#5C5C5C', marginTop: '5px', fontWeight: 'bold' }}>
            {showImage && (
              <img src={imgs} style={{ marginRight: '4px', width: '12px', height: '12px' }} />
            )}
            {state}
          </Typography>
        </div>
      </div >
    </div >
  );
}

export default LinearProgressWithLabel;