
import { useEffect } from 'react';
import initMonthContainer from '../../../js/UpcomingMaintenane.js'
import './css/UpcomingMaintenane.css'

function UpcomingMaintenane() {
  useEffect(() => {
    initMonthContainer(0)
  }, []);

  const calendarDate = (opt) => {
    initMonthContainer(opt)
  };
  return (
    <div className="content-wrapper">
      <div className="calender-container">
        <div className="container-fluid">
          <div className="row mx-0 justify-content-between rov-div">
            <div className="col-auto ms-3">
              <button type="button" className="btn today-btn" onClick={() => calendarDate(0)}>Today</button>
              <img className="calendar-left" src="src/images/calendar-left.svg" alt="" onClick={() => calendarDate(-1)} />
              <img className="calendar-right" src="src/images/calendar-right.svg" alt="" onClick={() => calendarDate(1)} />
              <span className="currendDate"></span>
            </div>
          </div>

          <div className="row mx-2 row-table">
            <table aria-hidden="true" className="monthTaskInfo"></table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingMaintenane