import { useEffect, useRef } from 'react';
import moment from 'moment';
import no from '../../assets/no.svg'
import yes from '../../assets/yes.svg'
import up from '../../assets/up.svg'
import down from '../../assets/down.svg'



function InitTable(tableRef, transportOrder, lastUpdate, sourceDestination, nextDestination, error, description) {
  $(tableRef.current).DataTable({
    "ordering": false,
    "searching": false,
    "paging": true,
    "processing": false,
    "language": PageHelper.language(),
    "lengthMenu": PageHelper.lengthMenu(),
    "dom": PageHelper.dom(),
    "pageLength": PageHelper.pageLength(),
    "serverSide": true,
    "destroy": true,
    "ajax": {
      url: "/api/initTransportUnitTable",
      type: "POST",
      data: function (d) {
        return {
          transportOrder,
          lastUpdate,
          sourceDestination,
          nextDestination,
          error,
          description,
          start: d.start,
          page: d.length
        }
      }
    },
    "columns": [
      {
        "title": "Transport<br>Order",
        "data": "transportOrder",
        render: function (data) {
          let newHtml = ""
          if (data) newHtml = `<span style="color: blue">${data}</span>`
          return newHtml;
        }
      },
      {
        "title": "Last<br>Update",
        "data": "lastUpdate",
        render: function (data) {
          return moment(data).format('DD.MM.YYYY <br> HH:mm:ss');
        }
      },
      {
        "title": "Source<br>Destination",
        "data": "sourceDestination"
      },
      {
        "title": "Next<br>Destination",
        "data": "nextDestination"
      },
      {
        "title": "Drection",
        "data": "drection",
        render: function (data) {
          if (data == 1) {
            return `<img src=${up} style="width: 17px"/>`
          } else {
            return `<img src=${down} style="width: 17px"/>`
          }
        }
      },
      {
        "title": "Processing<br>Result",
        "data": "processingResult",
        render: function (data) {
          if (data == 0) {
            return `<img src=${no} style="width: 17px"/>`
          } else {
            return `<img src=${yes} style="width: 17px"/>`
          }
        }
      },
      {
        "title": "Error",
        "data": "error"
      },
      {
        "title": "Description",
        "data": "description"
      },
      {
        "title": "Action",
        "data": "action",
        render: function (data) {
          if (data == "Rectify") {
            return `<div style="background-color: red;width: 111px;height: 30px;line-height: 30px;color: white; border-radius: 5px;margin: auto;">${data}</div>`
          } else {
            return `<div style="background-color: green;width: 111px;height: 30px;line-height: 30px;color: white; border-radius: 5px;margin: auto;">${data}</div>`
          }
        }
      }
    ]
  })
}

function DataTableComponent({ transportOrder, lastUpdate, sourceDestination, nextDestination, error, description, onSubmit }) {
  const tableRef = useRef(null);

  useEffect(() => {
    InitTable(tableRef, transportOrder, lastUpdate, sourceDestination, nextDestination, error, description);
  }, [onSubmit])

  return (
    <table className="table text-center" ref={tableRef} />
  )
}

export default DataTableComponent