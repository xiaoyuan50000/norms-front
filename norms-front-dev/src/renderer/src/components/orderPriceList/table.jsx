import { useEffect, useRef } from 'react';
import moment from 'moment';

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
      url: "/api/initOrderPriceListTable",
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
        "data": "trackingId"
      },
      {
        "data": "productName"
      },
      {
        "data": "address"
      },
      {
        "data": "oplDate",
        render: function (data) {
          return moment(data).format('DD-MM-YYYY');
        }
      },
      {
        "data": "status",
        render: function (data) {
          let statueHtml = ''
          if (data == "Pending") {
            statueHtml = `<span style="color: #E28451;font-weight: bolder;">${data}</span>`
          } else if (data == "Delivered") {
            statueHtml = `<span style="color: #F8D53F;font-weight: bolder;">${data}</span>`
          } else if (data == "New") {
            statueHtml = `<span style="color: #5D67E5;font-weight: bolder;">${data}</span>`
          }
          return statueHtml
        }
      },
      {
        "data": "price"
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
    <table className="table w-100" ref={tableRef} >
      <thead>
        <tr>
          <td style={{ color: '#828282', fontSize: '13px' }}>Tracking Id</td>
          <td style={{ color: '#828282', fontSize: '13px' }}>Product Name</td>
          <td style={{ color: '#828282', fontSize: '13px' }}>Address</td>
          <td style={{ color: '#828282', fontSize: '13px' }}>Date</td>
          <td style={{ color: '#828282', fontSize: '13px' }}>Status</td>
          <td style={{ color: '#828282', fontSize: '13px' }}>Price</td>
        </tr>
      </thead >
      <tbody></tbody>
    </table >
  )
}

export default DataTableComponent