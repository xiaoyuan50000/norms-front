function initErrorLogTable() {
  let transportErrorLogData = [
    { orderNO: 'O-0001', status: 'Status 1', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#ff8d20' },
    { orderNO: 'O-0002', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#4ab951' },
    { orderNO: 'O-0003', status: 'Status 3', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#d52323' },
    { orderNO: 'O-0004', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#d52323' },
    { orderNO: 'O-0005', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#ff8d20' },
    { orderNO: 'O-00063', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#d52323' },
    { orderNO: 'O-0007', status: 'Status T', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#4ab951' },
    { orderNO: 'O-00067', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#d52323' },
    { orderNO: 'O-0007', status: 'Status T', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#4ab951' },
    { orderNO: 'O-00067', status: 'Status C', errorMsg: 'Error Message adfadf', source: 'source', destionation: 'destionation', updateTime: '11.05.2024 14:27:33', color: '#d52323' }
  ];

  $('#transport-error-log-table').DataTable({
    "ordering": false,
    "searching": false,
    "paging": true,
    "processing": false,
    "language": PageHelper.language(),
    "lengthMenu": PageHelper.lengthMenu(),
    "dom": PageHelper.dom(),
    "pageLength": PageHelper.pageLength(),
    "serverSide": false,
    "data": transportErrorLogData,
    "columns": [
      {
        "title": "TU/TD Order",
        data: 'orderNO',
        render: function (data, type, row) {
          return data ?? '-';
        }
      },
      {
        "title": "Current Status",
        data: 'status',
        render: function (data, type, row) {
          if (data) {
            return `<span style='color:${row.color}'>${data}</span>`;
          }
          return '-';
        }
      },
      {
        "title": "Error Message",
        data: 'errorMsg',
        render: function (data, type, row) {
          return data ?? '-';
        }
      },
      {
        "title": "Source",
        data: 'source',
        render: function (data, type, row) {
          return data ?? '-';
        }
      },
      {
        "title": "Destionation",
        data: 'destionation',
        render: function (data, type, row) {
          return data ?? '-';
        }
      },
      {
        "title": "Updated Time",
        data: 'updateTime',
        render: function (data, type, row) {
          return data ?? '-';
        }
      },
    ]
  });
}

export default initErrorLogTable