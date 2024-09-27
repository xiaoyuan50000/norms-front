import React, { useState, useEffect } from 'react';
import '../css/transportOrderFlow.css'
import TransportOrderFlowModel from '../components/TransportOrderFlowModel.jsx'
import TransportOrderFlowTable from '../components/TransportOrderFlowTable.jsx'
import { useParams, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TransportOrderFlow() {
  const params = useParams();
  const [flowId, setFlowId] = useState(params.flowId)
  const [data, setData] = useState(null);
  const [toId, setToId] = useState(new URLSearchParams(useLocation().search).get('toId'))
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const response = await axios.post('/api/initTransportOrderFlowListTable', { flowId });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="content-wrapper" style={{ position: 'relative' }}>
      <div className='page-container-top'>
        <div className='page-container-left-title'>Transport Order</div>
        <div>
          <CloseIcon
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
            onClick={() => { navigate('/homepage/transportOrder') }} />
        </div>
      </div>

      <TransportOrderFlowModel data={data} flowId={flowId} toId={toId} />

      <TransportOrderFlowTable toId={toId} />
    </div>
  )
}


export default TransportOrderFlow;