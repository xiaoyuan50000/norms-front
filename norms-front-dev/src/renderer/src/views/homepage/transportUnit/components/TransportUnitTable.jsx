import React, { useEffect, useRef } from 'react';
import moment from 'moment';

import search from '../../../../images/map/search.svg'
import drection from '../../../../images/map/Drection.svg'
import yes from '../../../../images/map/right.svg'
import no from '../../../../images/map/cancel.svg'

function InitTable(tableRef) {
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
      url: "/api/initTransportUnitListTable",
      type: "POST",
      data: function (d) {
        return {
          start: d.start,
          page: d.length
        }
      }
    },
    "columns": [
      {
        "data": ''
      },
      {
        "data": "transportOrder",
        render: function (data) {
          let newHtml = ""
          if (data) newHtml = `<span style="color: #007BFF">${data}</span>`
          return newHtml;
        }
      },
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
            return `<img src=${no} style="width: 16px;height: 16px"/>`
          } else {
            return `<img src=${yes} style="width: 16px;height: 16px"/>`
          }
        }
      },
      {
        "data": "error"
      },
      {
        "data": "description",
        "render": function (data) {
          if (data && typeof data === 'string' && data.length > 22) {
            return data.slice(0, 22) + '<br/>' + data.slice(22);
          }
          return data;
        }
      },
      {
        "data": "action",
        render: function (data) {
          if (data == "Rectify") {
            return `<div style="background-color: red;width: 111px;height: 30px;line-height: 30px;color: white; border-radius: 4px;margin: auto;">${data}</div>`
          } else {
            return `<div style="background-color: green;width: 111px;height: 30px;line-height: 30px;color: white; border-radius: 4px;margin: auto;">${data}</div>`
          }
        }
      },
      {
        "data": ''
      }
    ]
  })
}

function DataTableComponent() {
  const tableRef = useRef(null);

  useEffect(() => {
    InitTable(tableRef);
  }, []);

  return (
    <table aria-hidden="true" className="table bark-table text-center w-100" ref={tableRef} >
      <thead>
        <tr>
          <th className='colspan-1'></th>

          <th className='colspan-1'>
            Transport Order<br />
            <div className="search-container">
              <input type="text" className="search-input" />
              <span className="search-icon">
                <img src={search} />
              </span>
            </div>
          </th>

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
            Description<br />
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

          <th className='colspan-1'></th>
        </tr>
      </thead>
    </table >
  )
}

export default DataTableComponent