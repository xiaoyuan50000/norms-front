import '../stylesheets/css/storageSystem.css';
import React, { useState } from 'react';
import LinearProgressWithLabel from '../components/echarts/LinearProgressWithLabel';
import StorageSystemBarModel from '../components/echarts/StorageSystemBarModel';
import StorageSystemISPieModel1 from '../components/echarts/StorageSystemISPieModel1';
import StorageSystemISPieModel2 from '../components/echarts/StorageSystemISPieModel2';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import niuko from '../images/niuko.svg';
import yun from '../images/yun.svg';
import yes from '../images/yes.svg';
import jg from '../images/jg.svg';

function StorageSystem() {
  const [value, setValue] = useState('0');
  const [isLeftActive, setIsLeftActive] = useState(true);

  const handleChange = (newValue) => {
    setValue(newValue);
    setIsLeftActive(newValue === '0');
  };


  function StatusSwitching() {
    return (
      <div className='issuing-status'>
        <TabContext value={value}>
          <div className='issuing-status-title'>
            <span
              className={`ist-left-span ${isLeftActive ? 'active' : ''}`}
              onClick={() => handleChange('0')}
            >
              Issuing Status
            </span>
            <span
              className={`ist-right-span ${!isLeftActive ? 'active' : ''}`}
              onClick={() => handleChange('1')}
            >
              Receiving Status
            </span>
          </div>

          {value === '0' && (
            <TabPanel value="0">
              <StorageSystemISPieModel1 />
            </TabPanel>
          )}
          {value === '1' && (
            <TabPanel value="1">
              <StorageSystemISPieModel2 />
            </TabPanel>
          )}
        </TabContext>
      </div>
    );
  }


  return (
    <div className='container-div'>
      <div className="container-left-div">
        <div className='left-top-title'>
          <div className='title-textStyle'>
            <img src={niuko} />
            <span className='strorage-system-span'>
              Strorage System
            </span>
          </div>
        </div>


        <div className='left-bottom-show'>
          <div className="left-div">
            <div className='left-div-top'>
              <div className='bulk-lane-status'>
                <div className='title-textStyle'>
                  Bulk Lane Status
                </div>
                <div className='bls-bottom'>
                  <div className='bls-bottom-div'>
                    <div className='bls-left'>
                      <img src={yun} />
                      <div className="text-container">
                        <div className="text-head">Issuing</div>
                        <div className="text-end">Outstanding 0,Completed 1</div>
                      </div>
                    </div>
                    <div className='condition'>
                      <div className='text-style1'>No Activeated Schedule</div>
                    </div>
                  </div>
                  <div className='bls-bottom-div'>
                    <div className='bls-left'>
                      <img src={yun} />
                      <div className="text-container">
                        <div className="text-head">Receiving</div>
                        <div className="text-end">Outstanding 0,Completed 1</div>
                      </div>
                    </div>
                    <div className='condition'>
                      <div className='text-style1'>No Activeated Schedule</div>
                    </div>
                  </div>
                  <div className='bls-bottom-div'>
                    <div className='bls-left'>
                      <img src={yun} />
                      <div className="text-container">
                        <div className="text-head">Audit</div>
                      </div>
                    </div>
                    <div className='condition'>
                      <div className='text-style2'>In-operation</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='team-status lucency'>
                <div className='title-textStyle'>
                  Team 5 Status
                </div>
                <div className="team-status-top">
                  <div className='sts-left-div'>
                    <div className="text-head" style={{ marginBottom: '8px' }}>Teams 5-1</div>
                    <div className='text-style2' style={{ marginTop: '10px' }}>In-operation</div>
                  </div>
                  <div className='sts-right-div'>
                    <img src={yes} />
                  </div>
                </div>
                <div className="team-status-bottom">
                  <div className='sts-left-div'>
                    <div className="text-head" style={{ marginBottom: '8px' }}>Teams 5-2</div>
                    <div className='text-style1' style={{ marginTop: '10px' }}>No Activeated Schedule</div>
                  </div>
                  <div className='sts-right-div'>
                    <img src={yes} />
                  </div>
                </div>
              </div>
            </div>

            <div className='left-div-bottom'>
              <div className='note-processing-status'>
                <div className='title-textStyle'>
                  Note Processing Status
                </div>

                <div className='nps-bottom'>
                  <div className='nps-bottom-module'>
                    <LinearProgressWithLabel headline={"NPM 1"} value={40} state={"10-Port-SGD"} />
                  </div>

                  <div className='nps-bottom-module'>
                    <LinearProgressWithLabel headline={"NPM 2"} value={0} state={"No Batch ready!"} />
                  </div>

                  <div className='nps-bottom-module'>
                    <LinearProgressWithLabel headline={"NPM 2"} value={0} state={"No Batch Activated!"} />
                  </div>

                  <div className='nps-bottom-module'>
                    <LinearProgressWithLabel headline={"NPM 1"} value={100} state={"All Batches Completed!"} />
                  </div>

                </div>
              </div>
              <StatusSwitching />
            </div>
          </div>


          <div className="right-div">
            <div className="storage-capacity-status">
              <div className="scs-title">
                <div className='scs-title-top'>
                  <div className='title-textStyle'>
                    Storage Capacity Status
                  </div>
                  <div className='title-textStyle-right'>
                    <div className="textStyle-right-line">
                      <span className="scs-circle" style={{ backgroundColor: '#D8DDE5' }}></span>
                      <span className="scs-right-instance-text">Empty</span>
                    </div>
                    <div className="textStyle-right-line">
                      <span className="scs-circle" style={{ backgroundColor: '#C0C8E4' }}></span>
                      <span className="scs-right-instance-text">Filled</span>
                    </div>
                    <div className="textStyle-right-line">
                      <span className="scs-circle" style={{ backgroundColor: '#C29C63' }}></span>
                      <span className="scs-right-instance-text">Locked</span>
                    </div>
                  </div>
                </div>
                <div className='title-subtitle'>
                  {'Safe capacity<40% | Early warning capacity 40~80 % | Burst capacity 80%<'}
                </div>
              </div>

              <div className='scs-bottom'>
                <StorageSystemBarModel />
              </div>
            </div>

            <div className="subsystem-status lucency">
              <div className='subsystem-status-title'>
                <div className='title-textStyle'>
                  Subsystem Status
                </div>
                <div className='title-subtitle'>
                  Vualt Door About to close
                </div>
              </div>
              <div className='subsystem-status-bottom'>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>RBT 1</div>
                    <div className='ssb-modules-title-right color-c'>Picking</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Picking</div>
                      <div className="text-end">Remaining 1</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>RBT 2</div>
                    <div className='ssb-modules-title-right color-z'>Palletizing</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Palletizing</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>AGV 1</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Tramsporting</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>AGV 2</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Tramsporting</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>AGV 3</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Chargin</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>AGV 4</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Chargin</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>VLT 1</div>
                    <div className='ssb-modules-title-right color-h'>Shifting</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Shifting</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>VLT 2</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>VLT 3</div>
                    <div className='ssb-modules-title-right color-lan'>Outout</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Charging</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>PB 1</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>PB 1</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>SKU 1</div>
                    <div className='ssb-modules-title-right color-lan'>Picking</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Picking</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>SKU 2</div>
                    <div className='ssb-modules-title-right color-lv'>Input</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Input</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>SUK 3</div>
                    <div className='ssb-modules-title-right color-f'>LTF</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>SKU 4</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>BCL 1</div>
                    <div className='ssb-modules-title-right'>Normal</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Transporting</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>BCL 2</div>
                    <div className='ssb-modules-title-right color-red'>Error</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">-</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
                <div className='ssb-modules'>
                  <div className='ssb-modules-title'>
                    <div className='ssb-modules-title-left'>PCL 2</div>
                    <div className='ssb-modules-title-right  color-red'>Error</div>
                  </div>
                  <div className='ssb-modules-bottom'>
                    <img src={yun} />
                    <div className="text-container">
                      <div className="text-head">Picking</div>
                      <div className="text-end">Remaining 2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-right-div lucency">
        <div className='container-right-title'>
          <div className='title-textStyle'>
            Transport Errors
          </div>
          <div className='title-subtitle'>
            To Pending Completion order errors: 12
          </div>
        </div>

        <div className="container-right-bottom">
          <div className='crb-modules'>
            <div className='crb-modules-title'>
              <span className='title-item tu-tp-title'>TU : TP2020070280426</span>
              <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '23px' }}>20/Mat/202334 12:00</span></span>
              <span className='title-item tu-tp-text'>Source: <span style={{ marginLeft: '10px' }}>SKU 1</span></span>
              <span className='title-item tu-tp-text'>Dest: <span style={{ marginLeft: '24px' }}>RBT1</span></span>
            </div>
            <div className='crb-modules-bottom'>
              <div className='crb-modules-bottom-title'>
                <img src={jg} />
                Error Message
              </div>
              <div className='crb-modules-bottom-bottom'>
                JJ TU rejected to areject station during the transport
              </div>
            </div>
          </div>
          <div className='crb-modules'>
            <div className='crb-modules-title'>
              <span className='title-item tu-tp-title'>TU : TP2020070280426</span>
              <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '23px' }}>20/Mat/202334 12:00</span></span>
              <span className='title-item tu-tp-text'>Source: <span style={{ marginLeft: '10px' }}>SKU 1</span></span>
              <span className='title-item tu-tp-text'>Dest: <span style={{ marginLeft: '24px' }}>RBT1</span></span>
            </div>
            <div className='crb-modules-bottom'>
              <div className='crb-modules-bottom-title'>
                <img src={jg} />
                Error Message
              </div>
              <div className='crb-modules-bottom-bottom'>
                JJ TU rejected to areject station during the transport
              </div>
            </div>
          </div>
          <div className='crb-modules'>
            <div className='crb-modules-title'>
              <span className='title-item tu-tp-title'>TU : TP2020070280426</span>
              <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '23px' }}>20/Mat/202334 12:00</span></span>
              <span className='title-item tu-tp-text'>Source: <span style={{ marginLeft: '10px' }}>SKU 1</span></span>
              <span className='title-item tu-tp-text'>Dest: <span style={{ marginLeft: '24px' }}>RBT1</span></span>
            </div>
            <div className='crb-modules-bottom'>
              <div className='crb-modules-bottom-title'>
                <img src={jg} />
                Error Message
              </div>
              <div className='crb-modules-bottom-bottom'>
                JJ TU rejected to areject station during the transport
              </div>
            </div>
          </div>
          <div className='crb-modules'>
            <div className='crb-modules-title'>
              <span className='title-item tu-tp-title'>TU : TP2020070280426</span>
              <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '23px' }}>20/Mat/202334 12:00</span></span>
              <span className='title-item tu-tp-text'>Source: <span style={{ marginLeft: '10px' }}>SKU 1</span></span>
              <span className='title-item tu-tp-text'>Dest: <span style={{ marginLeft: '24px' }}>RBT1</span></span>
            </div>
            <div className='crb-modules-bottom'>
              <div className='crb-modules-bottom-title'>
                <img src={jg} />
                Error Message
              </div>
              <div className='crb-modules-bottom-bottom'>
                JJ TU rejected to areject station during the transport
              </div>
            </div>
          </div>
          <div className='crb-modules'>
            <div className='crb-modules-title'>
              <span className='title-item tu-tp-title'>TU : TP2020070280426</span>
              <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '23px' }}>20/Mat/202334 12:00</span></span>
              <span className='title-item tu-tp-text'>Source: <span style={{ marginLeft: '10px' }}>SKU 1</span></span>
              <span className='title-item tu-tp-text'>Dest: <span style={{ marginLeft: '24px' }}>RBT1</span></span>
            </div>
            <div className='crb-modules-bottom'>
              <div className='crb-modules-bottom-title'>
                <img src={jg} />
                Error Message
              </div>
              <div className='crb-modules-bottom-bottom'>
                JJ TU rejected to areject station during the transport
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default StorageSystem