import React, { useState } from 'react';
import './css/inventory-status.css'

import SubSystemStatusEchartsModel from './components/SubSystemStatusEchartsModel'
import DetailStockEchartsModel from './components/DetailStockEchartsModel'
import StorageLocationEchartsModel from './components/StorageLocationEchartsModel'

function InventoryStatus() {
  const [inputValue, setInputValue] = useState('21 Jun 2024 - Today');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-xl-7 col-md-12 p-0">
          <div className="row">
            <div className="col-md-12 p-0 grid-margin stretch-card">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    <span>Sub System Status/Efficiency (From WMS162)</span>
                  </div>
                </div>
                <div className="card-header d-flex justify-content-end align-items-center">
                  <div className="d-flex">
                    <input type="text" className="form-control" placeholder="21 Jun 2024 - Today"
                      aria-label="date"
                      aria-describedby="date"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="icon-date"></i>
                        </span>
                      </div>
                  </div>
                </div>
                <div className="card-body">
                  <SubSystemStatusEchartsModel />
                </div>
              </div>
            </div>
            
            <div className="col-md-12 p-0 grid-margin stretch-card">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    <span>Detail Stock List</span>
                  </div>
                </div>
                <div className="card-body">
                  <DetailStockEchartsModel />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5 col-md-12 p-0 pl-2 pr-2">
          <div className="row h-100">
            <div className="col-md-12 p-0 grid-margin stretch-card">
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    <span>Storage Location</span>
                  </div>
                </div>
                <div className="card-body">
                  <StorageLocationEchartsModel />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default InventoryStatus
