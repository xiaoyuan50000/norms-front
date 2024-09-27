import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import search from '../../../images/map/search.svg'
import drection from '../../../images/map/Drection.svg'
import yes from '../../../images/map/right.svg'
import no from '../../../images/map/cancel.svg'

function InitTable(tableRef) {
  $(tableRef.current).DataTable({
    "ordering": false,
    "searching": false,
    "paging": true,
    "processing": false,
    "autoWidth": false,
    "responsive": false,
    "scrollCollapse": true,
    "createdRow": function (row, data, dataIndex) {
      if (data.hasOwnProperty('flowId') && data.hasOwnProperty('transportOrder')) {
        $(row).attr('flowId', data.flowId);
        $(row).attr('toId', data.transportOrder);
      } else {
        console.error('Data missing flowId property', data);
      }
    },
    "language": PageHelper.language(),
    "lengthMenu": PageHelper.lengthMenu(),
    "dom": PageHelper.dom(),
    "pageLength": PageHelper.pageLength(),
    "serverSide": true,
    "destroy": true,
    "ajax": {
      url: "/api/initTransportOrderListTable",
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
      }
    ]
  })
}

function DataTableComponent() {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    InitTable(tableRef);

    const tableBody = tableRef.current.querySelector('tbody');
    tableBody.addEventListener('click', handleRowClick);

    return () => {
      tableBody.removeEventListener('click', handleRowClick);
    };
  }, []);

  const handleRowClick = (event) => {
    const targetRow = event.target.closest('tr');
    if (targetRow) {
      const flowId = targetRow.getAttribute('flowId');
      const toId = targetRow.getAttribute('toId');

      if (!flowId) {
        console.error('Row ID is undefined', targetRow);
        return;
      }

      navigate(`/homepage/transportOrder/${flowId}?toId=${toId}`);
    }
  };

  return (
    <div className="bark-div bark-table-div" style={{ marginTop: '0' }} >
      <table aria-hidden="true" className="table bark-table text-center w-100 hover-background" ref={tableRef} >
        <thead>
          <tr>
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
          </tr>
        </thead>
      </table >
    </div>
  )
}

export default DataTableComponent