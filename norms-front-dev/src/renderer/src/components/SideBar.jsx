
const sidebarList = [
  {
    title: 'Overview',
    url: '/overview',
    icon: 'icon-overview',
    disabled: 0
  },
  {
    title: 'Issuing/ Receiving Schedule',
    url: '/issuing-receiving-schedule',
    icon: 'icon-issuing--receiving-schedule',
    disabled: 0
  },
  {
    title: 'Subsystem Availability',
    url: '#',
    icon: 'icon-subsystem-availability',
    disabled: 1
  },
  {
    title: 'Upcoming Maintenane',
    url: '/upcoming-maintenane',
    icon: 'icon-upcoming-maintenance',
    disabled: 0
  },
  {
    title: 'Throughput',
    url: '#',
    icon: 'icon-throughput',
    disabled: 1
  },
  {
    title: 'Transport Order Issues',
    url: '/transport-Order-Issues',
    icon: 'icon-transport-order-issues',
    disabled: 0
  },
  {
    title: 'Inventory Status',
    url: '/inventory-status',
    icon: 'icon-inventory-status',
    disabled: 0
  },
  {
    title: 'Daily Report',
    url: '#',
    icon: 'icon-daily-report',
    disabled: 1
  },
  {
    title: 'Graphical Reports',
    url: '/graphicalReports',
    icon: 'icon-daily-report',
    disabled: 0
  }
]


function Sidebar() {

  let sidebarMenu = sidebarList.map((item, index) => {
    const style = {
      color: item.disabled ? '#e3e3e3' : '',
    }
    return (
      <li className="nav-item" key={index}>
        <a className="nav-link" href={item.url} style={style}>
          <i className={`nav-icon ${item.icon}`}></i>
          <span className="menu-title">{item.title}</span>
        </a>
      </li>
    )
  })

  return (
    <nav style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute',
      boxShadow: '2px 2px 7.7px 0px rgba(146, 159, 202, 0.59), 0px 0px 1px 1px rgba(255, 255, 255, 0.75) inset'
    }} className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        {sidebarMenu}
      </ul>
      <div style={{ marginBottom: '30px', display: 'flex' }} className="logoutAndSettings">
        <a className="dropdown-item">
          <i className="icon-settings text-gold"></i>
          Settings
        </a>
        <a className="dropdown-item">
          <i className="icon-logout text-gold"></i>
          Logout
        </a>
      </div>
    </nav>
  )
}

export default Sidebar
