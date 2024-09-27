import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";


import Nav from './components/Nav'
import SideBar from './components/SideBar'

import Storage from './views/dashboard/overview/Storage'
import IssuingReceivingSchedule from './views/dashboard/issuingReceivingSchedule/IssuingReceivingSchedule'
import TransportOrderIssues from './views/dashboard/transportOrderIssues/TransportOrderIssues'
import UpcomingMaintenane from './views/dashboard/upcomingMaintenane/UpcomingMaintenane'
import InventoryStatus from './views/dashboard/inventoryStatus/InventoryStatus'
import GraphicalReports from './views/dashboard/graphicalReports/GraphicalReports'


import SecondApp from '../src/components/second/SecondApp'

import Map from './views/homepage/map/MapMenu'
import TransportUnit from './views/homepage/transportUnit/TransportUnit'
import TransportOrder from './views/homepage/transportOrder/TransportOrder'
import TransportOrderFlow from './views/homepage/transportOrder/components/TransportOrderFlow'
import Toggling from './views/homepage/toggling/Toggling'
import ApiKeyView from './views/homepage/apikey/ApiKeyView'
import ReceivingSchedule from './views/homepage/receivingSchedule/ReceivingSchedule'
import CartonsReceived from './views/homepage/receivingSchedule/components/CartonsReceived'

// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
// import Test from './views/Test'
// import Map from './views/Map'
// import TransportUnit from './views/TransportUnit';
// import OrderPriceList from './views/OrderPriceList';
// import StorageSystem from './views/StorageSystem';
// import StatusStorageCondition from './views/StatusStorageCondition';
// import TransportOrderto from './views/TransportOrderto';
// import Menu from './views/Menu';
// import Draw from './views/Draw';


function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const [isTestPage, setIsTestPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTestPage(location.pathname.includes('/homepage'));
  }, [location]);

  if (!isTestPage) {
    $('body').addClass('sidebar-icon-only');
  } else {
    $('body').removeClass('sidebar-icon-only');
  }
  return (
    <>
      {isTestPage ? "" : <Nav />}
      <div className="container-fluid page-body-wrapper">
        {isTestPage ? <SecondApp /> : <SideBar />}
        <div className={isTestPage ? "main-panel-none" : "main-panel"}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/overview" />} index={true} />
            <Route path="/homepage" element={<Navigate replace to="/homepage/map" />} index={true} />


            <Route path="/homepage/map" element={<Map />} />
            <Route path="/homepage/transportUnit" element={<TransportUnit />} />
            <Route path="/homepage/transportOrder" element={<TransportOrder />} />
            <Route path="/homepage/transportOrder/:flowId" element={<TransportOrderFlow />} />
            <Route path="/homepage/toggling" element={<Toggling />} />
            <Route path="/homepage/apiKey" element={<ApiKeyView />} />
            <Route path="/homepage/receivingSchedule" element={<ReceivingSchedule />} />
            <Route path="/homepage/cartonsReceived/:rsId" element={<CartonsReceived />} />


            <Route path="/overview" element={<Storage />} />
            <Route path="/issuing-receiving-schedule" element={<IssuingReceivingSchedule />} />
            <Route path="/transport-order-issues" element={<TransportOrderIssues />} />
            <Route path="/upcoming-maintenane" element={<UpcomingMaintenane />} />
            <Route path="/inventory-status" element={<InventoryStatus />} />
            <Route path="/graphicalReports" element={<GraphicalReports />} />

            {/* <Route path="/transport-unit" element={<TransportUnit />} />
              <Route path="/draw" element={<Draw />} />
              <Route path="/orderPriceList" element={<OrderPriceList />} />
              <Route path="/storageSystem" element={<StorageSystem />} />
              <Route path="/status-storage-condition" element={<StatusStorageCondition />} />
              <Route path="/transport-orderto" element={<TransportOrderto />} />
              <Route path="/menu" element={<Menu />} /> */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App