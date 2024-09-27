import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import '../css/simpleCustomDialog.css';

function SimpleCustomDialog({ isOpen, onClose, data }) {
  return (
    <Dialog
      open={isOpen}
      // onClose={onClose}
      aria-labelledby="simple-dialog-title"
      PaperProps={{
        style: {
          border: '10px solid #343E6B',
          borderRadius: '10px',
          margin: 0,
          maxWidth: '800px',
          minHeight: '100px'
        }
      }}
    >
      <DialogTitle id="simple-dialog-title" style={{ fontWeight: 'bold', marginRight: '30px' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 11,
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px'
          }}
        >
          <KeyboardDoubleArrowRightSharpIcon />
        </IconButton>
        {data.title}
      </DialogTitle>
      <div className='scd-container'>
        {data.tableHeaders && data.data && (
          <table>
            <thead>
              <tr>
                {data.tableHeaders.map((header, index) => (
                  <th key={index} className='col-2'>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => {
                    const isLastCell = cellIndex === row.length - 1;
                    let statusClass = '';
                    if (isLastCell) {
                      if (cell === 'Batch Activated') {
                        statusClass = 'BatchActivated';
                      } else if (cell === 'Batch Ready' || cell == 'Ready to Receive' || cell == '×') {
                        statusClass = 'BatchReady';
                      } else if (cell === 'Batch Completed' || cell == 'Receuvung Cimpleted' || cell == '√') {
                        statusClass = 'BatchCompleted';
                      }
                    }

                    return (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={`${isLastCell ? `${statusClass}` : ''} simpleCustomDialogFont col-2`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Dialog >
  );
}


export default SimpleCustomDialog;