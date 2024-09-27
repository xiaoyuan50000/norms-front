import { useEffect, useRef } from 'react';

function InitTable(tableRef, scheduledBy) {
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
            url: "/api/initIssuingReveivingScheduleTable",
            type: "POST",
            data: function (d) {
                return {
                    scheduledBy: scheduledBy,
                    start: d.start,
                    page: d.length
                }
            }
        },
        "columns": [
            {
                "title": "",
                "data": ""
            },
            {
                "title": "Bank",
                "data": "bank"
            },
            {
                "title": "Product",
                "data": "product"
            },
            {
                "title": "New Notes (pcs)",
                "data": "newNotesFormat"
            },
            {
                "title": "Amount",
                "data": "newNotesAmountFormat"
            },
            {
                "title": "Processed Notes (pcs)",
                "data": "processedNotesFormat"
            },
            {
                "title": "Amount",
                "data": "processedNotesAmountFormat"
            },
            {
                "title": "lssue Date",
                "data": "issueDateFormat"
            },
            {
                "title": "Schedule Status",
                "data": "scheduleStatus",
                render: function (data) {
                    let statueHtml = ''
                    if (data == 'Completed') {
                        statueHtml = `<span style="color: #87A3E3;font-weight: bolder;">${data}</span>`
                    } else if (data == 'Ready for issuing') {
                        statueHtml = `<span style="color: #85D582;font-weight: bolder;">${data}</span>`
                    } else if (data == 'Picking activated') {
                        statueHtml = `<span style="color: #FFBD7E;font-weight: bolder;">${data}</span>`
                    }
                    return statueHtml
                }
            },
            {
                "title": "Location",
                "data": "location"
            }
        ]
    });
}

function DataTableComponent({ scheduledBy }) {
    const tableRef = useRef(null);

    useEffect(() => {
        InitTable(tableRef, scheduledBy)
    }, [scheduledBy]);

    return (
        <table ref={tableRef} aria-hidden="true" className="table bark-table irs-table" />
    );
}

export default DataTableComponent;