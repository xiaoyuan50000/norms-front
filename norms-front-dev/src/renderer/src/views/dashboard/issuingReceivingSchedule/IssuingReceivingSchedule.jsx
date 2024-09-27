import { useEffect, useRef, useState } from 'react';
import './css/IssuingReceivingSchedule.css'
import { actionTable } from '../../../js/IssuingReceivingSchedule.js'
import IssuingReceivingScheduleModel from './components/IssuingReceivingScheduleModel.jsx';

import BasicTableComponent from './components/BasicTable.jsx'


function IssuingReceivingSchedule() {
  const imgRef_show = useRef(null);
  const imgRef_hide = useRef(null);

  const dispTable = (opt) => {
    actionTable(opt)
  }

  const [scheduleBySelectedValue, setscheduleBySelectedValue] = useState('');
  const handleScheduleByChange = (event) => {
    const scheduleByVal = event.target.value
    setscheduleBySelectedValue(scheduleByVal);
  };

  const columns = [
    { title: '' },
    { title: 'Bank' },
    { title: 'Product' },
    { title: 'New Notes (pcs)' },
    { title: 'Amount' },
    { title: 'Processed Notes (pcs)' },
    { title: 'Amount' },
    { title: 'lssue Date' },
    { title: 'Schedule Status' },
    { title: 'Location' }
  ]

  return (
    <div className="content-wrapper">
      <div className="bark-div bark-chart-div">
        <div className="bark-body-div">
          <div className="scheduled-chebox">
            Scheduled By:
            <label className="radio-scheduled-label1">
              <input
                type="radio"
                name="radio"
                value="Completed"
                checked={scheduleBySelectedValue === 'Completed'}
                onChange={handleScheduleByChange}
              />
              Completed
            </label>

            <label className="radio-scheduled-label">
              <input
                type="radio"
                name="radio"
                value="Ready for issuing"
                checked={scheduleBySelectedValue === 'Ready for issuing'}
                onChange={handleScheduleByChange}
              />
              Ready for issuing
            </label>

            <label className="radio-scheduled-label" >
              <input
                type="radio"
                name="radio"
                value="Picking activated"
                checked={scheduleBySelectedValue === 'Picking activated'}
                onChange={handleScheduleByChange}
              />
              Picking activated
            </label>

            <label >
              <input className="radio-scheduled-label"
                type="radio"
                name="radio"
                value=""
                checked={scheduleBySelectedValue === ''}
                onChange={handleScheduleByChange}
              />
              All
            </label>
          </div>
          <IssuingReceivingScheduleModel />
        </div>
      </div>
      <img ref={imgRef_show} className="show-img" src="src/images/nfold.svg" alt="" onClick={() => dispTable('show')} />
      <img ref={imgRef_hide} className="hide-img" src="src/images/unfold.svg" alt="" onClick={() => dispTable('hide')} />
      <div className="bark-div bark-table-div">
        <BasicTableComponent
          columns={columns}
          url={"/api/initIssuingReveivingScheduleTable"}
          params={{ scheduledBy: scheduleBySelectedValue }}
        />
      </div>
    </div>
  )
}

export default IssuingReceivingSchedule