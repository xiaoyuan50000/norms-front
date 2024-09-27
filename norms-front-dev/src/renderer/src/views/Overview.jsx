import React, { useEffect } from 'react';

import initErrorLogTable from '../js/overview.js'

import UsageStatCard from '../components/overview/UsageStatCardComponent.jsx'
import SubSystemStatusCard from '../components/overview/SubSystemStatusComponent.jsx'

import OverviewIssuingPie from '../components/echarts/OverviewIssuingPie.jsx'
import OverviewReceivingPie from '../components/echarts/OverviewReceivingPie.jsx'

import '../stylesheets/css/overview.css'

function Overview() {
  useEffect(() => {
    initErrorLogTable()
  }, []);

  let usageDataList = [
    { name: 'SKU1', loadedNum: 32, emptyNum: 86, persent: 36 },
    { name: 'SKU2', loadedNum: 32, emptyNum: 86, persent: 36 },
    { name: 'SKU3', loadedNum: 65, emptyNum: 90, persent: 72 },
    { name: 'SKU3', loadedNum: 64, emptyNum: 89, persent: 71 },
    { name: 'PB1', loadedNum: 63, emptyNum: 89, persent: 70 },
    { name: 'PB2', loadedNum: 79, emptyNum: 92, persent: 86 },
    { name: 'Vault Crane 1', loadedNum: 80, emptyNum: 92, persent: 88 },
    { name: 'Vault Crane 2', loadedNum: 77, emptyNum: 93, persent: 83 },
    { name: 'Vault Crane 3', loadedNum: 75, emptyNum: 93, persent: 82 }
  ];

  let subSystemStatusList = [
    { name1: 'PB1', status1: 1, name2: 'PB2', status2: 0 },
    { name1: 'SKU1', status1: 1, name2: 'SKU2', status2: 1 },
    { name1: 'SKU3', status1: 1, name2: 'SKU4', status2: 1 },
    { name1: 'AGV1', status1: 1, name2: 'AGV2', status2: 1 },
    { name1: 'AGV3', status1: 1, name2: 'AGV4', status2: 1 },
    { name1: 'Conveyor L1', status1: 1, name2: 'Conveyor L2', status2: 1 },
    { name1: 'Robot 1', status1: 1, name2: 'Robot 2', status2: 1 },
    { name1: 'Vault Crane 1', status1: 1, name2: 'Vault Crane 2', status2: 1 },
    { name1: 'Vault Crane 3', status1: 1 },
  ];

  let usageStatCardList = [];
  usageDataList.forEach((usageData, index) => {
    usageStatCardList.push(
      <UsageStatCard key={index} UsageData={usageData} />
    );
  });
  return (
    <div className="content-wrapper">
      <div className="usage-stat-info-div">
        {usageStatCardList}
      </div>
      <SubSystemStatusCard SubSystemStatusDataList={subSystemStatusList} />
      <div className='row m-0 pt-2'></div>
      <div className="row transport-info-div p-0 m-0">
        <div className="col-xl-5 col-md-12 stat-chart-div p-0 m-0">
          <div className='row p-0 m-0'>
            <div className='col-md-6 col-xl-12 pl-0'>
              <div id="issuing-chart-div" className="chart issuing-chart" style={{ marginBottom: '10px' }}>
                <OverviewIssuingPie />
              </div>
            </div>
            <div className='col-md-6 col-xl-12 p-0'>
              <div id="receiveing-chart-div" className="chart receiveing-chart">
                <OverviewReceivingPie />
              </div>
            </div>
          </div>
        </div>


        <div className="col-xl-7 col-md-12 eror-log-div p-0">
          <div className="title">
            <span style={{ fontWeight: 'bold', color: '#303030' }}>Transport Log Error</span>
          </div>
          <div className="data-table-div">
            <table id="transport-error-log-table" className="table">
              <thead style={{ height: '40px' }}>
                <tr style={{ boxShadow: '0 5px 5px 0 #e8ecf5' }}>
                  <th scope="col">TU/TD Order</th>
                  <th scope="col">Current Status</th>
                  <th scope="col">Error Message</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destionation</th>
                  <th scope="col">Updated Time</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview