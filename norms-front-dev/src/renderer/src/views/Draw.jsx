import '../stylesheets/css/draw.css'
import React, { useEffect, useState } from 'react';
import DrawIssuingStatusModel from '../components/echarts/DrawIssuingStatusModel'
import DrawReceivingStatusModel from '../components/echarts/DrawReceivingStatusModel'
import DataTableComponent from "../components/overview/table";
import DrawNpmModel from '../components/echarts/DrawNpmModel'
import DrawStorageCapacityStatusModel from '../components/echarts/DrawStorageCapacityStatusModel'
import chatFrame from '../images/chatFrame.svg'
import axios from 'axios';

function Draw() {
  const [Result1, setResult1] = useState([]);
  const [Result2, setResult2] = useState([]);
  const [npm1, setNpm1] = useState([]);
  const [npm2, setNpm2] = useState([]);
  const [npm3, setNpm3] = useState([]);
  const [npm4, setNpm4] = useState([]);
  const [sorageCapacityStatus, setSorageCapacityStatus] = useState([]);

  useEffect(() => {
    getBothStatuses();
    getNpmStatuses();
    getStorageCapacityStatus();
  }, []);

  async function getBothStatuses() {
    const [issuingResponse, receivingResponse] = await Promise.all([
      axios.post('/api/initIssuingStatus'),
      axios.post('/api/initReceivingStatus')
    ]);
    setResult1(issuingResponse.data.data);
    setResult2(receivingResponse.data.data);
  }

  async function getNpmStatuses() {
    const [NPM1Response, NPM2Response, NPM3Response, NPM4Response] = await Promise.all([
      axios.post('/api/initNpm1Status'),
      axios.post('/api/initNpm2Status'),
      axios.post('/api/initNpm3Status'),
      axios.post('/api/initNpm4Status')
    ]);
    setNpm1(NPM1Response.data.data);
    setNpm2(NPM2Response.data.data);
    setNpm3(NPM3Response.data.data);
    setNpm4(NPM4Response.data.data);
  }

  async function getStorageCapacityStatus() {
    axios.post('/api/initStorageCapacityStatus').then(res => {
      let sorageCapacityStatusList = res.data.data
      setSorageCapacityStatus(sorageCapacityStatusList)
    })
  }

  return (
    <div className="draw-div">
      <div className="title-div">
        <div className="scs card">
          <div className='card-title'>
            <div className='card-title-left'></div>
            <div className='card-title-bottom  card-title-kind1'>Storage Capacity Status</div>
          </div>

          <DrawStorageCapacityStatusModel sorageCapacityStatus={sorageCapacityStatus} />
        </div>
        <div className="sss card">
          <div className='card-title'>
            <div className='card-title-left'></div>
            <div className='card-title-bottom text-bold card-title-kind2'>Subsystem Status</div>
            <div className='card-title-right'>
              <div className='text-bold'>Vault Door</div>
              <div className='card-title-left-div text-bold'>About to Close</div>
              <img src={chatFrame} />
            </div>
          </div>
          <div className='sss-bottom'>
            <div className='sss1'>
              <div className="bottom-text">PB1</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">SKU1</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">SKU3</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">AGV1</div>
            </div>
            <div className='sss1'>
              <span className="sss1-title">RP</span>
              <div className="bottom-text">AGV3</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">RBT1</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">CL1</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">VLT1</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">VLT3</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">PB2</div>
            </div>
            <div className='sss1'>
              <span className="sss1-title">OUT</span>
              <div className="bottom-text">SKU2</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">SKU4</div>
            </div>
            <div className='sss1 red-agv2'>
              <div className="bottom-text">AGV2</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">AGV4</div>
            </div>
            <div className='sss1'>
              <span className="sss1-title">RP</span>
              <div className="bottom-text">RBT2</div>
            </div>
            <div className='sss1'>
              <div className="bottom-text">CL2</div>
            </div>
            <div className='sss1'>
              <span className="sss1-title">OUT</span>
              <div className="bottom-text">VLT2</div>
            </div>
          </div>
        </div>
      </div>

      <div className="thead-div">
        <div className='left-div card'>
          <div className='card-title'>
            <div className='card-title-left'></div>
            <div className='card-title-bottom'>Issuing Status</div>
          </div>
          {/* <div className='card-title-right'>
            <DrawRadioModel />
          </div> */}
          <DrawIssuingStatusModel data={Result1} />
        </div>
        <div className='right-div'>
          <div className="npm-top card">
            <div className='card-title'>
              <div className='card-title-left'></div>
              <div className='card-title-bottom'>NPM1</div>
            </div>
            <DrawNpmModel data={npm1} />
          </div>
          <div className="npm-top card">
            <div className='card-title'>
              <div className='card-title-left'></div>
              <div className='card-title-bottom'>NPM3</div>
            </div>
            <DrawNpmModel data={npm3} />
          </div>
          <div className="npm-bottom card">
            <div className='card-title'>
              <div className='card-title-left'></div>
              <div className='card-title-bottom'>NPM2</div>
            </div>
            <DrawNpmModel data={npm2} />
          </div>
          <div className="npm-bottom card">
            <div className='card-title'>
              <div className='card-title-left'></div>
              <div className='card-title-bottom'>NPM4</div>
            </div>
            <DrawNpmModel data={npm4} />
          </div>
        </div>
      </div>

      <div className="tbody-div">
        <div className="rs card">
          <div className='card-title'>
            <div className='card-title-left'></div>
            <div className='card-title-bottom'>Receiving Status</div>
          </div>
          <DrawReceivingStatusModel data={Result2} />
        </div>
        <div className="te card">
          <div className='card-title'>
            <div className='card-title-left'></div>
            <div className='card-title-bottom'>Transport Errors</div>
          </div>
          <div className='table-div'>
            <DataTableComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Draw