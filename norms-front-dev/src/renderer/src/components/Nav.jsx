import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const getTitle = (pathname) => {
  switch (pathname) {
    case '/overview':
      return 'Overview';
    case '/issuing-receiving-schedule':
      return 'Issuing/ Receiving Schedule';
    case '/upcoming-maintenane':
      return 'Upcoming Maintenane';
    case '/transport-order-Issues':
      return 'Transport Order Issues';
    case '/inventory-status':
      return 'Inventory Status';
    case '/transport-unit':
      return 'Transport Unit';
    case '/draw':
      return 'Draw';
    case '/orderPriceList':
      return 'OrderPriceList';
    case '/storageSystem':
      return 'StorageSystem';
    case '/status-storage-condition':
      return 'Status Storage Condition';
    case '/transport-orderto':
      return 'Transport Orderto';
    case '/menu':
      return 'Menu';
    case '/graphicalReports':
      return 'Graphical Reports';
    default:
      return 'Overview';
  }
};

function Nav() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    setPageTitle(getTitle(location.pathname));
  }, [location]);

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex justify-content-center">
        <div className="navbar-brand-inner-wrapper">
          <a className="navbar-brand brand-logo" href="/">
            <div className="brand-logo-abbr">
              <span>MAS</span>
            </div>
          </a>
        </div>
        <div className="navbar-brand-inner-wrapper d-flex align-items-center w-100 m-0">
          <a className="navbar-brand brand-logo" href="/">
            <div className="brand-logo-fullname">
              <span><span className="more-big">M</span>onetary <span className="more-big">A</span>uthority OF <span className="more-big">S</span>ingapore</span>
            </div>
          </a>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">

        <ul className="navbar-nav w-100">
          <li className="nav-item nav-search d-none d-lg-block">
            <button className="navbar-toggler align-self-center" type="button" data-toggle="minimize">
              <span className="mdi mdi-menu"></span>
            </button>
          </li>
          <li className="nav-item nav-sidebar d-flex d-none">
            <div className="align-self-center">
              <span className="nav-sidebar-name">{pageTitle}</span>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
          data-toggle="offcanvas">
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  )
}

export default Nav
