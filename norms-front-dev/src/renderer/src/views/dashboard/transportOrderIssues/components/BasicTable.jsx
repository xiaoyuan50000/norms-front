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

export default function BasicTableComponent({ url }) {
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
        fetchData();
    }, [page, rowsPerPage]);

    return (
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Tu Nr</TableCell>
                        <TableCell align="center">St</TableCell>
                        <TableCell align="center">Ty</TableCell>
                        <TableCell align="center" colSpan={5}>Source</TableCell>
                        <TableCell align="center" colSpan={5}>Destination</TableCell>
                        <TableCell align="center" colSpan={4}>Image Information</TableCell>
                        <TableCell align="center">AGV</TableCell>
                        <TableCell align="center">Updated Time</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Mod</TableCell>
                        <TableCell align="center">Rack</TableCell>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="center">Y</TableCell>
                        <TableCell align="center">Dep</TableCell>
                        <TableCell align="center">Mod</TableCell>
                        <TableCell align="center">Rack</TableCell>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="center">Y</TableCell>
                        <TableCell align="center">Dep</TableCell>
                        <TableCell align="center">Last</TableCell>
                        <TableCell align="center">Current</TableCell>
                        <TableCell align="center">Inwait</TableCell>
                        <TableCell align="center">Next</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} >
                            <TableCell align="center">{row.tuNr}</TableCell>
                            <TableCell align="center">{row.st}</TableCell>
                            <TableCell align="center">{row.ty}</TableCell>
                            <TableCell align="center">{row.sourceMod}</TableCell>
                            <TableCell align="center">{row.sourceRack}</TableCell>
                            <TableCell align="center">{row.sourceX}</TableCell>
                            <TableCell align="center">{row.sourceY}</TableCell>
                            <TableCell align="center">{row.sourceDep}</TableCell>
                            <TableCell align="center">{row.destinationMod}</TableCell>
                            <TableCell align="center">{row.destinationRack}</TableCell>
                            <TableCell align="center">{row.destinationX}</TableCell>
                            <TableCell align="center">{row.destinationY}</TableCell>
                            <TableCell align="center">{row.destinationDep}</TableCell>
                            <TableCell align="center">{row.imageInfoLast}</TableCell>
                            <TableCell align="center">{row.imageInfoCurrent}</TableCell>
                            <TableCell align="center">{row.imageInfoInwait}</TableCell>
                            <TableCell align="center">{row.imageInfoNext}</TableCell>
                            <TableCell align="center">{row.agvName}</TableCell>
                            <TableCell align="center">{row.updatedTimeFormat}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={100} >
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