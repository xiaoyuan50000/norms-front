import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import map from '../../images/map/map.svg'
import transportUnit from '../../images/map/transportUnit.svg'
import transportOrder from '../../images/map/transportOrder.svg'
import toggling from '../../images/map/toggling.svg'
import apikeyImg from '../../images/map/apikeyImg.svg'
import auditTrail from '../../images/map/auditTrail.svg'
import errorLogs from '../../images/map/errorLogs.svg'
import gatewayLogs from '../../images/map/gatewayLogs.svg'
import userHistory from '../../images/map/userHistory.svg'

import l from '../../images/map/l.svg'
import r from '../../images/map/r.svg'

const notActiveColor = "#0e1a5a"
const activeColor = "#ffffff"

const getSVG = (isActive, src) => {
  return <SVG src={src} fill={isActive ? activeColor : notActiveColor} width={20} height={20}></SVG>
}

const sidebarList = [
  {
    title: 'Map',
    url: '/homepage/map',
    img: (isActive) => { return getSVG(isActive, map) },
    disabled: 0
  },
  {
    title: 'Transport Unit',
    url: '/homepage/transportUnit',
    img: (isActive) => { return getSVG(isActive, transportUnit) },
    disabled: 0
  },
  {
    title: 'Transport Order',
    url: '/homepage/transportOrder',
    img: (isActive) => { return getSVG(isActive, transportOrder) },
    disabled: 0
  },
  {
    title: 'Toggling',
    url: '/homepage/toggling',
    img: (isActive) => { return getSVG(isActive, toggling) },
    disabled: 0
  },
  {
    title: 'ApiKey',
    url: '/homepage/apiKey',
    img: (isActive) => { return getSVG(isActive, apikeyImg) },
    disabled: 0
  },
  {
    title: 'Audit Trail',
    url: '#',
    img: (isActive) => { return getSVG(isActive, auditTrail) },
    disabled: 0
  },
  {
    title: 'Error Logs',
    url: '#',
    img: (isActive) => { return getSVG(isActive, errorLogs) },
    disabled: 0
  },
  {
    title: 'Gateway Logs',
    url: '#',
    img: (isActive) => { return getSVG(isActive, gatewayLogs) },
    disabled: 0
  },
  {
    title: 'User History',
    url: '#',
    img: (isActive) => { return getSVG(isActive, userHistory) },
    disabled: 0
  },
  {
    title: 'Receiving Schedule',
    url: '/homepage/receivingSchedule',
    img: (isActive) => { return getSVG(isActive, userHistory) },
    disabled: 0
  },
]

function SecondApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    $('body').toggleClass('sidebar-icon-only map');
  };


  let sidebarMenu = sidebarList.map((item, index) => {
    const isActive = location.pathname.startsWith(item.url);
    return (
      <li className={`nav-item nav-itemh ${isActive ? 'active' : ''}`} key={index}>
        <a className="nav-link" href={item.url} style={{ color: item.disabled ? '#e3e3e3' : '#14205c' }}>
          {item.img(isActive)}
          <span className="menu-title">{item.title}</span>
        </a>
      </li>
    )
  })

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#F2F7FF', position: 'relative' }} className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <nav className="navbar p-0 fixed-top d-flex flex-row" style={{ position: 'absolute', top: '-60px' }}>
          <div className="navbar-brand-wrapper d-flex justify-content-center" style={{ backgroundColor: '#F2F7FF' }}>
            <div className="navbar-brand-inner-wrapper" style={{ marginLeft: '0.375rem', marginRight: '0.375rem' }}>
              <a className="navbar-brand brand-logo" href="/homepage">
                <div className="brand-logo-abbr">
                  <span>MAS</span>
                </div>
              </a>
            </div>
            <div className="navbar-brand-inner-wrapper d-flex align-items-center m-0">
              <a className="navbar-brand brand-logo" href="/homepage">
                <div className="brand-logo-fullname">
                  <span><span className="more-big">M</span>onetary <span className="more-big">A</span>uthority OF <span className="more-big">S</span>ingapore</span>
                </div>
              </a>
            </div>
          </div>
        </nav>
        {sidebarMenu}

      </ul>

      <img src={isSidebarOpen ? l : r} alt="#"
        style={{
          position: 'absolute',
          bottom: '52%',
          right: '-3px',
          color: '#163F8F',
          cursor: 'pointer'
        }}
        onClick={toggleSidebar}
      />
    </nav>
  )
}

export default SecondApp