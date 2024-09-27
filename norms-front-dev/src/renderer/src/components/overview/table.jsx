import { useEffect, useRef } from 'react';
import moment from 'moment';

function InitTable(tableRef) {
  $(tableRef.current).DataTable({
    "ordering": false,
    "searching": false,
    "paging": false,
    "processing": false,
    "info": false,
    // "language": PageHelper.language(),
    // "lengthMenu": PageHelper.lengthMenu(),
    // "dom": PageHelper.dom(),
    // "pageLength": PageHelper.pageLength(),
    "serverSide": true,
    "destroy": true,
    "ajax": {
      url: "/api/initDrawTable",
      type: "POST"
    },
    "columns": [
      {
        "data": "tunr"
      },
      {
        "data": "errorMsg"
      },
      {
        "data": "source"
      },
      {
        "data": "dest"
      },
      {
        "data": "createdDate",
        render: function (data) {
          return moment(data).format('DD/MMM/YYYY HH:mm');
        }
      }
    ]
  })
}

function DataTableComponent() {
  const tableRef = useRef(null);

  useEffect(() => {
    InitTable(tableRef);
  }, [])

  return (
    <table className="table text-center w-100" ref={tableRef} >
      <thead>
        <tr className='col'>
          <th className="col-1" style={{ backgroundColor: "#D5CCB9", borderRadius: '14px' }}>TU</th>
          <th className="col-7" style={{ backgroundColor: "#D5CCB9", borderRadius: '14px' }}>Error Message</th>
          <th className="col-1" style={{ backgroundColor: "#D5CCB9", borderRadius: '14px' }}>Source</th>
          <th className="col-1" style={{ backgroundColor: "#D5CCB9", borderRadius: '14px' }}>Dest</th>
          <th className="col-2" style={{ backgroundColor: "#D5CCB9", borderRadius: '14px' }}>Date & Time</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table >
  )
}

export default DataTableComponent