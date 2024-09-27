import '../stylesheets/css/status-storage-condition.css'
import StatusStorageConditionlssuingBarModel from '../components/echarts/StatusStorageConditionlssuingBarModel'
import StatusStorageConditionReceivingBarModel from '../components/echarts/StatusStorageConditionReceivingBarModel'
import chatFrame from '../images/chatFrame.svg'
import yes from '../images/yes.svg'
import wrong from '../images/wrong.svg'

function StatusStorageCondition() {
  return (
    <div className="content-wrapper-div">
      <div className="wrapper-left">
        <div className="wrapper-left-top fillet-corner bg-color">
          <div className="wrapper-left-top-title">
            <div className="title-unification">
              Storage Capacity Status
            </div>
            <div className='wrapper-left-top-right'>
              Filled&nbsp; |&nbsp; Empty |&nbsp; Locked
            </div>
          </div>
        </div>


        <div className="wrapper-left-middle">
          <div className="wrapper-left-middle-left">
            <div className="middle-i-status fillet-corner bg-color">
              <div className="title-unification">
                lssuing Status
              </div>
              <div className="middle-i-status-bar">
                <StatusStorageConditionlssuingBarModel />
              </div>
            </div>
          </div>

          <div className="wrapper-left-middle-right">
            <div className="middle-np-status fillet-corner bg-color">
              <div className="title-unification">
                Note Processing Status
              </div>
            </div>
            <div className="middle-team-status fillet-corner bg-color-transparent">
              <div className="title-unification">
                Team 5 Status
              </div>

              <div className='middle-team-status-table'>
                <table className='w-100 h-100 text-center' style={{ borderCollapse: 'separate', borderSpacing: '0px 5px' }}>
                  <thead>
                    <tr style={{ height: '40px', background: 'white' }}>
                      <th className='col-1'></th>
                      <th className='col-1'>Status</th>
                      <th className='col-1'>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: 'white' }}>
                      <td className='col-1 text-left'>Team 5-1</td>
                      <td className='col-1' style={{ color: 'red' }}>In-operation</td>
                      <td className='col-1' style={{ color: 'red' }}><img src={wrong} style={{ width: '25px' }} /></td>
                    </tr>
                    <tr style={{ background: 'white' }}>
                      <td className='col-1 text-left'>Team 5-2</td>
                      <td className='col-1' style={{ color: '#03C84E' }}>Not-in-Operation</td>
                      <td className='col-1' style={{ color: '#03C84E' }}><img src={yes} style={{ width: '25px' }} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        <div className="wrapper-left-bottom">
          <div className="bottom-r-status fillet-corner bg-color">
            <div className="title-unification">
              Receiving Status
            </div>
            <div className="bottom-r-status-bar">
              <StatusStorageConditionReceivingBarModel />
            </div>
          </div>
          <div className="bottom-bls-status fillet-corner bg-color-transparent">
            <div className="title-unification">
              Bulk Lane Status
            </div>

            <div className='bottom-bls-status-table'>
              <table className='w-100 h-100 text-center' style={{ borderCollapse: 'separate', borderSpacing: '0px 5px' }}>
                <thead>
                  <tr style={{ height: '36px', background: 'white' }}>
                    <th className='col-1'></th>
                    <th className='col-2' style={{ color: '#00004B' }}>Issuing</th>
                    <th className='col-2' style={{ color: '#00004B' }}>Receiving</th>
                    <th className='col-1' style={{ color: '#00004B' }}>Audit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: 'white' }}>
                    <td className='col-1 text-left'>Status</td>
                    <td className='col-2' style={{ color: 'red' }}>No Activated Schedule</td>
                    <td className='col-2' style={{ color: 'red' }}>No Activated Schedule</td>
                    <td className='col-1' style={{ color: '#4383E3' }}>In-operation</td>
                  </tr>
                  <tr style={{ background: 'white' }}>
                    <td className='col-1 text-left'>Outstanding</td>
                    <td className='col-2'>0</td>
                    <td className='col-2'>1</td>
                    <td className='col-1'></td>
                  </tr>
                  <tr style={{ background: 'white' }}>
                    <td className='col-1 text-left'>Completed</td>
                    <td className='col-2'>0</td>
                    <td className='col-2'>1</td>
                    <td className='col-1'></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>


      <div className="wrapper-right">
        <div className="wrapper-right-top fillet-corner bg-color-transparent">
          <div className="title-unification">
            Subsystem Status
          </div>
          <div className="wrapper-right-right-title">
            Vault Door <div className='vd-center-span'>Aboutt to Close</div> <img src={chatFrame} alt="#" />
          </div>

          <div className="wrapper-right-top-bottom">
            <div className='ss-bottom-left'>
              <div className='ss-bottom-left-title fillet-corner2' >
                <div>In-progress</div>
                <div className='ss-title-text'>Remaining</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>RBT1</div>
                  <div className='ss-text-left-bottom'>Robot Picking</div>
                </div>
                <div className='ss-text-center'>Picking</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>RBT2</div>
                  <div className='ss-text-left-bottom'>Palletizing</div>
                </div>
                <div className='ss-text-center'>Palletizing</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>AGV1</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Transporting</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>AGV2</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Transportin</div>
                <div className='ss-text-right'>2</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>AGV3</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Charging</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>AGV4</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Charging</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>VLT1</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Shifting</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>VLT2</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>VLT3</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Output</div>
                <div className='ss-text-right'>1</div>
              </div>
            </div>

            <div className='ss-bottom-right'>
              <div className='ss-bottom-right-title fillet-corner2'>
                <div>In-progress</div>
                <div className='ss-title-text'>Remaining</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>RBT1</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>RBT2</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>SKU1</div>
                  <div className='ss-text-left-bottom'>Output</div>
                </div>
                <div className='ss-text-center'>Output</div>
                <div className='ss-text-right'>2</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>SKU2</div>
                  <div className='ss-text-left-bottom'>Input</div>
                </div>
                <div className='ss-text-center'>Input</div>
                <div className='ss-text-right'>1</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front' style={{ backgroundColor: 'red' }}></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>SKU3</div>
                  <div className='ss-text-left-bottom'>LTF</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>4</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>SKU4</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front'></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>BCL1</div>
                  <div className='ss-text-left-bottom'>Normal</div>
                </div>
                <div className='ss-text-center'>Transporting</div>
                <div className='ss-text-right'>0</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front' style={{ backgroundColor: 'red' }}></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>BCL2</div>
                  <div className='ss-text-left-bottom'>Error</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>4</div>
              </div>

              <div className='ss-bottom-text-div'>
                <div className='ss-bottom-text-front' style={{ backgroundColor: 'red' }}></div>
                <div className='ss-text-left'>
                  <div className='ss-text-left-top'>PCL1</div>
                  <div className='ss-text-left-bottom'>Error</div>
                </div>
                <div className='ss-text-center'>-</div>
                <div className='ss-text-right'>1</div>
              </div>
            </div>
          </div>
        </div>


        <div className="wrapper-right-bottom fillet-corner bg-color-transparent">
          <div className="wrapper-right-bottom-title">
            <div className="title-unification">
              Transport Order Errors
            </div>

            <div className='wrapper-bottom-title-right'>
              To Pending Completion:
              <span className='righht-span'>
                4
              </span>
            </div>
          </div>

          <div className='wrapper-right-bottom-table'>
            <table className='w-100 h-100 text-center' style={{ borderCollapse: 'separate', borderSpacing: '0px 5px' }}>
              <thead>
                <tr style={{ height: '36px', background: 'white' }}>
                  <th className='col-1' style={{ color: '#00004B', fontSize: '14px' }}>TU</th>
                  <th className='col-3' style={{ color: '#00004B', fontSize: '14px' }}>Error Msg</th>
                  <th className='col-1' style={{ color: '#00004B', fontSize: '14px' }}>Source</th>
                  <th className='col-1' style={{ color: '#00004B', fontSize: '14px' }}>Dest</th>
                  <th className='col-3' style={{ color: '#00004B', fontSize: '14px' }}>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '36px', background: 'white' }}>
                  <td className='col-1' style={{ fontWeight: 'bold' }}>1234567</td>
                  <td className='col-3' style={{ fontWeight: 'bold' }}>$[J]Tu rejected to...</td>
                  <td className='col-1' style={{ fontWeight: 'bold' }}>SKU1</td>
                  <td className='col-1' style={{ fontWeight: 'bold' }}>VLT1</td>
                  <td className='col-3' style={{ fontWeight: 'bold' }}>20/May/2021 13:50</td>
                </tr>
                <tr style={{ height: '36px', background: 'white' }}>
                  <td className='col-1'></td>
                  <td className='col-3'></td>
                  <td className='col-1'></td>
                  <td className='col-1'></td>
                  <td className='col-3'></td>
                </tr>
                <tr style={{ height: '36px', background: 'white' }}>
                  <td className='col-1'></td>
                  <td className='col-3'></td>
                  <td className='col-1'></td>
                  <td className='col-1'></td>
                  <td className='col-3'></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div >
  )
}

export default StatusStorageCondition;