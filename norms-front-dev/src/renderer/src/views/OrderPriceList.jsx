import '../stylesheets/css/orderPriceList.css'
import React, { useEffect, useState } from 'react'
import DataTableComponent from '../components/orderPriceList/table'
import OrderProductDetailsPieModel from '../components/echarts/OrderProductDetailsPieModel'
import OrderAnalyticsBarModel from '../components/echarts/OrderAnalyticsBarModel'
import OrderSalesDetailsLineModel from '../components/echarts/OrderSalesDetailsLineModel'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import box from '../images/total-order-box.svg'
import clock from '../images/total-pending-clock.svg'
import trend from '../images/total-sales-trend.svg'
import axios from 'axios';
import dayjs from 'dayjs';

function OrderPriceList() {
  const initialStatistics = [{
    total_order: 0,
    total_sales: 0,
    total_pending: 0
  }];

  const [statistics, setStatistics] = useState(initialStatistics);
  const [AnalyticsData, setAnalyticsData] = useState([]);
  const [salesDetails, setSalesDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [datepicker, setDatepicker] = useState('');

  useEffect(() => {
    getStatuses();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [datepicker]);

  async function getStatuses() {
    const [statRes, salesRes, analyticsRes] = await Promise.all([
      axios.post('/api/initStatisticsStatus'),
      axios.post('/api/initProductDetailsStatus'),
      axios.post('/api/iniAnalyticsDataStatus')
    ]);
    setStatistics(statRes.data.data);
    setProductDetails(salesRes.data.data);
    setAnalyticsData(analyticsRes.data.data);
  }

  async function getProductDetails() {
    axios.post('/api/initSalesDetailsStatus', { data: datepicker }).then(res => {
      let salesDetailsStatusList = res.data.data;
      setSalesDetails(salesDetailsStatusList);
    })
  }

  return (
    <div className='container-div'>
      <div className='left-div'>
        {statistics.map((item, index) => (
          <div className='title-div left-title-div' key={index}>
            <div className='viewstate'>
              <div className='viewstate-left'>
                <div className='viewstate-img'><img src={box} /></div>
              </div>
              <div className='viewstate-right'>
                <div className='viewstate-top'>Total Order</div>
                <div className='viewstate-bottom'>{item.total_order}</div>
              </div>
            </div>

            <div className='viewstate'>
              <div className='viewstate-left'>
                <div className='viewstate-img'><img src={trend} /></div>
              </div>
              <div className='viewstate-right'>
                <div className='viewstate-top'>Total Sales</div>
                <div className='viewstate-bottom'>￥{item.total_sales}</div>
              </div>
            </div>

            <div className='viewstate'>
              <div className='viewstate-left'>
                <div className='viewstate-img'><img src={clock} /></div>
              </div>
              <div className='viewstate-right'>
                <div className='viewstate-top'>Total Pending</div>
                <div className='viewstate-bottom'>{item.total_pending}</div>
              </div>
            </div>
          </div>
        ))}

        <div className='card left-top-div'>
          <div className='left-top-title'>
            <div className='title-text1'>
              Sales Details
            </div>
            <div className='left-top-title-date'>
              <div className="date-input-container">
                <DatePicker
                  className="right-input-date"
                  onChange={(e) => setDatepicker(dayjs(e).format('YYYY-MM-DD'))}
                />
              </div>
            </div>
          </div>
          <div className='OrderSalesDetailsLine'>
            <OrderSalesDetailsLineModel salesDetails={salesDetails} />
          </div>
        </div>

        <div className='card left-bottom-div'>
          <div className='title-text2'>
            Recent Orders
          </div>
          <div className='div-bottom-table'>
            <DataTableComponent />
          </div>
        </div>
      </div>

      <div className='right-div'>
        <div className='card right-top-div'>
          <div className='title-text3'>
            Product Details
          </div>
          <div className='OrderProductDetailsPie'>
            <OrderProductDetailsPieModel productDetails={productDetails} />
          </div>
        </div>

        <div className='card right-bottom-div'>
          <div className='title-text4'>
            Analytics
          </div>
          <div className='OrderAnalyticsBar'>
            <OrderAnalyticsBarModel AnalyticsData={AnalyticsData} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderPriceList