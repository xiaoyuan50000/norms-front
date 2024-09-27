import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import BasicPaginationComponent from '../../../../components/table/BasicPagination';
import Paper from '@mui/material/Paper';

export default function BasicTableComponent({ columns, url, params }) {
    const [data, setData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [recordsTotal, setRecordsTotal] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(Number(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number(event.target.value));
        setPage(1);
    };

    const fetchData = (params = {}) => {
        params.start = (page - 1) * rowsPerPage
        params.page = rowsPerPage
        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((res) => {
                setData(res.data);
                setRecordsTotal(res.recordsTotal)
            })
    };

    useEffect(() => {
        fetchData(params);
    }, [page, rowsPerPage, params]);


    const renderScheduleStatus = (data) => {
        let style = { fontWeight: 'bolder' }
        if (data == 'Completed') {
            style.color = '#87A3E3'
        } else if (data == 'Ready for issuing') {
            style.color = '#85D582'
        } else if (data == 'Picking activated') {
            style.color = '#FFBD7E'
        }
        return <span style={style}>{data}</span>
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((row, index) => {
                                return <TableCell key={index} align="center">{row.title}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} >
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">{row.bank}</TableCell>
                            <TableCell align="center">{row.product}</TableCell>
                            <TableCell align="center">{row.newNotesFormat}</TableCell>
                            <TableCell align="center">{row.newNotesAmountFormat}</TableCell>
                            <TableCell align="center">{row.processedNotesFormat}</TableCell>
                            <TableCell align="center">{row.processedNotesAmountFormat}</TableCell>
                            <TableCell align="center">{row.issueDateFormat}</TableCell>
                            <TableCell align="center">{renderScheduleStatus(row.scheduleStatus)}</TableCell>
                            <TableCell align="center">{row.location}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={10} >
                            <BasicPaginationComponent
                                rowsPerPageOptions={[10, 25, 50]}
                                count={recordsTotal}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}