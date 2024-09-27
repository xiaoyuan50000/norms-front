// import React, { useEffect, useState } from 'react';
// import '../stylesheets/css/transport-order-issues.css'
// import DataTableComponent from '../components/transportOrderIssues/table.jsx';
// import TransportOrderIssuesPie from '../components/echarts/TransportOrderIssuesPie.jsx'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import axios from 'axios';
// import dayjs from 'dayjs';

// function TransportOrderIssues() {
//   const [Result, setResult] = useState([]);
//   const [tuNr, setTuNr] = useState('');
//   const [updatedTime, setUpdatedTime] = useState('');
//   const [agvName, setAgvName] = useState('');

//   const [isSubmit, setIsSubmit] = useState(0);

//   let pie = {
//     tuNr,
//     updatedTime,
//     agvName
//   }

//   useEffect(() => {
//     fetchData(pie)
//   }, [isSubmit]);

//   function fetchData(pie) {
//     axios.post('/api/initTransportOrderIssuesStatistic', { pie: pie }).then(res => {
//       let transportOrderIssuesDataList = res.data.data
//       setResult(transportOrderIssuesDataList)
//     })
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsSubmit(!isSubmit)
//   };

//   let transportPrderIssuesPie = Result.map((iteam, index) => {
//     return (
//       <TransportOrderIssuesPie key={index} agvName={iteam.agvName} activeNum={iteam.activeNum} pendingNum={iteam.pendingNum} completedNum={iteam.completedNum} Result={Result} />
//     )
//   });

//   return (
//     <div className="row pt-2">
//       <div className='col-md-12 transmit-info-div stretch-card p-0'>
//         <div className='Query-box'>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Tu Nr"
//               value={tuNr}
//               onChange={(e) => setTuNr(e.target.value)}
//             />

//             <DatePicker
//               onChange={(newValue) => setUpdatedTime(dayjs(newValue).format('YYYY-MM-DD'))}
//             />

//             <select
//               className="select-field"
//               value={agvName}
//               onChange={(e) => setAgvName(e.target.value)}
//             >
//               <option value="">AGV</option>
//               <option value="AGV 1">AGV1</option>
//               <option value="AGV 2">AGV2</option>
//               <option value="AGV 3">AGV3</option>
//               <option value="AGV 4">AGV4</option>
//             </select>

//             <button type='submit'>Submit</button>
//           </form>
//         </div>
//         <div className="pie-charts-container">
//           {transportPrderIssuesPie}
//           <div className='liColor'>
//             <ul>
//               <li>
//                 <span className="color1">
//                   <i className="icon-transport-order-issues"></i>Active</span>
//               </li>
//               <li>
//                 <span className="color2">
//                   <i className="icon-transport-order-issues"></i>Pending</span>
//               </li>
//               <li>
//                 <span className="color3">
//                   <i className="icon-transport-order-issues"></i>Completed</span>
//               </li>
//             </ul>
//           </div>
//           <div className="card open">
//             <div className="card-header">
//               <div className="card-header-title">item.agvName</div>
//             </div>
//             <ul>
//               <li className="d-flex justify-content-around align-items-center">
//                 <div>
//                   <span className="open-text">Open</span>
//                 </div>
//                 <span className="badge rounded-circle d-flex align-items-center justify-content-center">
//                   <i className="icon-open"></i>
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="row pt-2">
//         <div className="col-md-12 grid-margin stretch-card p-0">
//           <div className="card">
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <DataTableComponent tuNr={tuNr} updatedTime={updatedTime} agvName={agvName} isSubmit={isSubmit} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// }


// export default TransportOrderIssues;


import React, { useEffect, useState } from 'react';
import './css/transport-order-issues.css'
import DataTableComponent from './components/table.jsx';
import axios from 'axios';
import BasicTableComponent from './components/BasicTable.jsx';

function TransportOrderIssues() {
  const [Result, setResult] = useState([]);

  useEffect(() => {
    function fetchData() {
      axios.post('/api/initTransportOrderIssuesStatistic').then(res => {
        let transportOrderIssuesDataList = res.data.data
        setResult(transportOrderIssuesDataList)

      })
    }
    fetchData()
  }, []);

  let transportOrderIssuesCardList = Result.map((item, index) => {
    if (!item.open) {
      return (
        <div className="card" key={index}>
          <div className="card-header">
            <div className="card-header-title">{item.agvName}</div>
          </div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center active-status">
                <div className="d-flex align-items-center">
                  <span className="badge rounded-circle bg d-flex align-items-center justify-content-center">
                    <i className="icon-transport-order-issues"></i>
                  </span>
                  <span className="color">Active</span>
                </div>
                <span>
                  <span className="color fs-3">{item.activeNum}</span>
                  <span className="fs-6">/{item.total}</span>
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center pending-status">
                <div className="d-flex align-items-center">
                  <span className="badge rounded-circle bg d-flex align-items-center justify-content-center">
                    <i className="icon-transport-order-issues"></i>
                  </span>
                  <span className="color">Pending</span>
                </div>
                <span>
                  <span className="color fs-3">{item.pendingNum}</span>
                  <span className="fs-6">/{item.total}</span>
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center completed-status">
                <div className="d-flex align-items-center">
                  <span className="badge rounded-circle bg d-flex align-items-center justify-content-center">
                    <i className="icon-transport-order-issues"></i>
                  </span>
                  <span className="color">Completed</span>
                </div>
                <span>
                  <span className="color fs-3">{item.completedNum}</span>
                  <span className="fs-6">/{item.total}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card open" key={index}>
          <div className="card-header">
            <div className="card-header-title">{item.agvName}</div>
          </div>
          <div className="card-body d-flex align-items-center pt-0">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-around align-items-center">
                <div className="d-flex align-items-center">
                  <span className="open-text">Open</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-open"></i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  })

  return (
    <div className="content-wrapper">
      <div className="row row-header">
        {transportOrderIssuesCardList}
      </div>
      <div className="row pt-2">
        <div className="col-md-12 grid-margin stretch-card p-0">
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <BasicTableComponent url={'/api/initTransportOrderIssuesTable'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransportOrderIssues