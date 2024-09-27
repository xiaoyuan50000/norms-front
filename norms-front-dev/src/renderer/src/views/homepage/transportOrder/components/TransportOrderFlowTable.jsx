import React, { useEffect, useRef } from 'react';
import moment from 'moment';

import search from '../../../../images/map/search.svg'
import drection from '../../../../images/map/Drection.svg'
import yes from '../../../../images/map/right.svg'
import s from '../../../../images/map/s.svg'
import wrong3 from '../../../../images/map/wrong3.svg'
import alert from '../../../../images/map/alert.svg'

function InitTable(tableRef, toId) {
  $(tableRef.current).DataTable({
    "ordering": false,
    "searching": false,
    "paging": true,
    "processing": false,
    "autoWidth": false,
    "responsive": false,
    "scrollCollapse": true,
    "language": PageHelper.language(),
    "lengthMenu": PageHelper.lengthMenu(),
    "dom": PageHelper.dom(),
    "pageLength": PageHelper.pageLength(),
    "serverSide": true,
    "destroy": true,
    "ajax": {
      url: "/api/getFlowStateTable",
      type: "POST",
      data: function (d) {
        return {
          start: d.start,
          page: d.length,
          toId: toId
        }
      }
    },
    "columns": [
      {
        "data": "lastUpdate",
        render: function (data) {
          return moment(data).format('DD.MM.YYYY <br/> HH:mm:ss.SS');
        }
      },
      {
        "data": "sourceDestination"
      },
      {
        "data": "nextDestination"
      },
      {
        "data": "drection",
        render: function (data) {
          if (data == 0) {
            return ''
          } else {
            return `<img src=${drection} style="width: 16px;height: 16px"/>`
          }
        }
      },
      {
        "data": "processingResult",
        render: function (data) {
          if (data == 0) {
            return `<img src=${alert} style="width: 20px;height: 20px"/>`
          } else {
            return `<img src=${yes} style="width: 16px;height: 16px"/>`
          }
        }
      },
      {
        "data": "error"
      },
      {
        "data": null, 
        render: function () {
          return `
            <img src=${s} style="width: 25px;height: 25px;margin-right: 13px;">
            <img src=${wrong3} style="width: 22px;height: 22px;margin-left: 13px;">
          `;
        }
      }
    ]
  })
}

function DataTableComponent({ toId }) {
  const tableRef = useRef(null);

  useEffect(() => {
    InitTable(tableRef, toId);
  }, [toId]);

  return (
    <div className="bark-div bark-table-div">
      <table aria-hidden="true" className="table bark-table text-center w-100" ref={tableRef} >
        <thead>
          <tr>
            <th className='colspan-1'>
              Last Updater<br />
              <div className="search-container">
                <input type="text" className="search-input" />
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
              <div className="search-container">
                <input type="text" className="search-input" />
                <span className="search-icon">
                  <img src={search} />
                </span>
              </div>
            </th>

            <th className='colspan-1'>
              Error<br />
              <div className="search-container">
                <input type="text" className="search-input" />
                <span className="search-icon">
                  <img src={search} />
                </span>
              </div>
            </th>

            <th className='colspan-1'>
              Action<br />
              <div className="search-container">
                <input type="text" className="search-input" />
                <span className="search-icon">
                  <img src={search} />
                </span>
              </div>
            </th>
          </tr>
        </thead>
      </table >
    </div>
  )
}

export default DataTableComponent