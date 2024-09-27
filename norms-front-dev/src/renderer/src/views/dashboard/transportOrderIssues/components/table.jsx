import { useEffect, useRef } from 'react';

function InitTable(tableRef, tuNr, updatedTime, agvName) {
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
      url: "/api/initTransportOrderIssuesTable",
      type: "POST",
      data: function (d) {
        return {
          tuNr,
          updatedTime,
          agvName,
          start: d.start,
          page: d.length
        }
      }
    },
    "columns": [
      {
        "title": "",
        "class": "col-tunr",
        "data": "tuNr",
      },
      {
        "title": "",
        "data": "st",
      },
      {
        "title": "",
        "data": "ty",
      },
      {
        "title": "Mod",
        "data": "sourceMod",
      },
      {
        "title": "Rack",
        "data": "sourceRack",
      },
      {
        "title": "X",
        "data": "sourceX",
      },
      {
        "title": "Y",
        "data": "sourceY",
      },
      {
        "title": "Dep",
        "data": "sourceDep",
      },
      {
        "title": "Mod",
        "data": "destinationMod",
      },
      {
        "title": "Rack",
        "data": "destinationRack",
      },
      {
        "title": "X",
        "data": "destinationX",
      },
      {
        "title": "Y",
        "data": "destinationY",
      },
      {
        "title": "Dep",
        "data": "destinationDep",
      },
      {
        "title": "Last",
        "data": "imageInfoLast",
      },
      {
        "title": "Current",
        "data": "imageInfoCurrent",
      },
      {
        "title": "Inwait",
        "data": "imageInfoInwait",
      },
      {
        "title": "Next",
        "data": "imageInfoNext",
      },
      {
        "title": "",
        "data": "agvName",
      },
      {
        "title": "",
        "data": "updatedTimeFormat",
      },
    ]
  });
}

function DataTableComponent({ tuNr, updatedTime, agvName, isSubmit }) {
  const tableRef = useRef(null);

  useEffect(() => {
    InitTable(tableRef, tuNr, updatedTime, agvName)
  }, [isSubmit])

  return (
    <table className="table table-hover text-center w-100" ref={tableRef} aria-hidden='true'>
      <thead>
        <tr>
          <th>Tu Nr</th>
          <th>St</th>
          <th>Ty</th>
          <th colSpan="5">Source</th>
          <th colSpan="5">Destination</th>
          <th colSpan="4">Image Information</th>
          <th>AGV</th>
          <th>Updated Time</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  )
}
export default DataTableComponent