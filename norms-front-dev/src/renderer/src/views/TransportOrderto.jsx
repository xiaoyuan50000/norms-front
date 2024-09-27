import { useState, useRef } from 'react';
import { actionTable } from '../js/transportOrderto.js'
import '../stylesheets/css/transportOrderto.css'

import edit from '../images/edit.svg'
import restart from '../images/restart.svg'
import complete from '../images/complete.svg'

import search from '../images/search.svg'
import j from '../images/j.svg'
import x from '../images/x.svg'
import d from '../images/d.svg'
import xia from '../images/xia.svg'
import s from '../images/s.svg'
import jg from '../images/jg.svg'

import legengX from '../images/legeng-x.svg'
import legengZ from '../images/legeng-z.svg'
import legengY from '../images/legeng-y.svg'

function TransportOrderto() {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const imgRef_show = useRef(null);
  const imgRef_hide = useRef(null);

  const dispTable = (opt) => {
    actionTable(opt)
  }

  const handleButtonClick = (index) => {
    if (selectedButtonIndex === index) {
      setSelectedButtonIndex(null);
    } else {
      setSelectedButtonIndex(index);
    }
  };

  const getFlowChartStyle = (index) => {
    return selectedButtonIndex === index ? { background: '#F9ECEC', border: '1px solid #FC6B6B' } : {};
  };

  const renderExtraContent = (index) => {
    if (index === selectedButtonIndex) {
      const fullClassName = `extra-content extra-content-index${index}`;

      return (
        <div className={fullClassName}>
          <div className='extra-content-top'><img src={edit} />Edit</div>
          <div className='extra-content-middle'><img src={restart} />Restart</div>
          <div className='extra-content-bottom'><img src={complete} />Complete</div>
        </div>
      )
    }
  }

  return (
    <div className="content-wrapper">
      <div className="bark-div flow-chart-div">
        <div className='legeng'>
          <div className='legeng-div1'>
            <div className='flow-chart1 Unified-div-style absolute-container' style={getFlowChartStyle(1)}>
              <button className={`btn ${selectedButtonIndex === 1 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(1)}
              >
                Vault Crane 1
              </button>
              {renderExtraContent(1)}
            </div>
            <div className='img-jt-y'>
              <img src={legengY} />
            </div>
            <div className='flow-chart2 Unified-div-style absolute-container' style={getFlowChartStyle(2)}>
              <button className={`btn ${selectedButtonIndex === 2 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(2)}
              >
                Vault Conveyor
              </button>
              {renderExtraContent(2)}
            </div>
          </div>


          <div className='img-jt-x1'>
            <img src={legengX} />
          </div>


          <div className='legeng-div2'>
            <div className='flow-chart3 Unified-div-style absolute-container' style={getFlowChartStyle(3)}>
              <button className={`btn ${selectedButtonIndex === 3 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(3)}
              >
                Pallet Buffer 1
              </button>
              {renderExtraContent(3)}
            </div>
            <div className='img-jt-z'>
              <img src={legengZ} />
            </div>
            <div className='flow-chart4 Unified-div-style absolute-container' style={getFlowChartStyle(4)}>
              <button className={`btn ${selectedButtonIndex === 4 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(4)}
              >
                Pb Conveyor
              </button>
              {renderExtraContent(4)}
            </div>
            <div className='img-jt-z'>
              <img src={legengZ} />
            </div>
            <div className='flow-chart5 Unified-div-style absolute-container' style={getFlowChartStyle(5)}>
              <button className={`btn ${selectedButtonIndex === 5 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(5)}
              >
                AGV2
              </button>
              {renderExtraContent(5)}
            </div>
          </div>


          <div className='img-jt-x2'>
            <img src={legengX} />
          </div>


          <div className='legeng-div3'>
            <div className='flow-chart6 Unified-div-style absolute-container' style={getFlowChartStyle(6)}>
              <button className={`btn ${selectedButtonIndex === 6 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(6)}
              >
                Vault Conveyor
              </button>
              {renderExtraContent(6)}
            </div>
          </div>


          <div className='img-jt-x3'>
            <img src={legengX} />
          </div>


          <div className='legeng-div4'>
            <div className='flow-chart7 Unified-div-style absolute-container' style={getFlowChartStyle(7)}>
              <button className={`btn ${selectedButtonIndex === 7 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(7)}
              >
                SKU Buffer 1
              </button>
              {renderExtraContent(7)}
            </div>
            <div className='img-jt-z'>
              <img src={legengZ} />
            </div>
            <div className='flow-chart8 Unified-div-style absolute-container' style={getFlowChartStyle(8)}>
              <button className={`btn ${selectedButtonIndex === 8 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(8)}
              >
                RobotConveyou
              </button>
              {renderExtraContent(8)}
            </div>
            <div className='img-jt-z'>
              <img src={legengZ} />
            </div>
            <div className='flow-chart9 Unified-div-style absolute-container' style={getFlowChartStyle(9)}>
              <button className={`btn ${selectedButtonIndex === 9 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(9)}
              >
                Robot 1
              </button>
              {renderExtraContent(9)}
            </div>
          </div>


          <div className='img-jt-x4'>
            <img src={legengX} />
          </div>


          <div className='legeng-div5'>
            <div className='flow-chart10 Unified-div-style absolute-container' style={getFlowChartStyle(10)}>
              <button className={`btn ${selectedButtonIndex === 10 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(10)}
              >
                L2 Conveyor
              </button>
              {renderExtraContent(10)}
            </div>
          </div>


          <div className='img-jt-x5'>
            <img src={legengX} />
          </div>


          <div className='legeng-div6'>
            <div className='flow-chart11 Unified-div-style absolute-container' style={getFlowChartStyle(11)}>
              <button className={`btn ${selectedButtonIndex === 11 ? 'btn-red' : ''}`}
                onClick={() => handleButtonClick(11)}
              >
                NPM
              </button>
              {renderExtraContent(11)}
            </div>
          </div>
        </div>
      </div>


      <img ref={imgRef_show} className="show-img" src="src/images/nfold.svg" alt="" onClick={() => dispTable('show')} />
      <img ref={imgRef_hide} className="hide-img" src="src/images/unfold.svg" alt="" onClick={() => dispTable('hide')} />
      <div className="bark-div bark-table-div">
        <table aria-hidden="true" className="table bark-table text-center">
          <thead>
            <tr>
              <th className='colspan-1'></th>

              <th className='colspan-1'>
                Last Updater<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>

              <th className='colspan-1'>
                Source Destination<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value=""></option>
                    <option value="sourceDestination">Pallet_Conveyor</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Next Destination<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value=""></option>
                    <option value="nextDestination">AV</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Drection<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value="0"></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Processing Result<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value="0"></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Error<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>

              <th className='colspan-1'>
                Action <img src={j} className='title-img-style' /><br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={jg} style={{ width: '25px', height: '25px' }} /></td>
              <td></td>
              <td>
                <img src={s} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                <img src={x} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={d} style={{ width: '20px', height: '20px' }} /></td>
              <td></td>
              <td>
                <img src={s} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                <img src={x} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={d} style={{ width: '20px', height: '20px' }} /></td>
              <td></td>
              <td>
                <img src={s} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                <img src={x} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={d} style={{ width: '20px', height: '20px' }} /></td>
              <td></td>
              <td>
                <img src={s} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
                <img src={x} style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  )
}


export default TransportOrderto;