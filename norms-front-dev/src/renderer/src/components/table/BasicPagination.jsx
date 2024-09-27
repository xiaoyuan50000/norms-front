import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        height: '26px',
        padding: '2px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#A78337',
            boxShadow: '0 0 0 0.2rem rgba(167,131,55,.25)',
        },
    },
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
    '& .Mui-selected.MuiPaginationItem-page': {
        color: '#FFFFFF',
        border: '1px solid #A78337',
        backgroundColor: "#A78337",
    },
}));

export default function BasicPaginationComponent({ onRowsPerPageChange, rowsPerPage, count, rowsPerPageOptions, onPageChange, page }) {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Typography>A Total Of {count}</Typography>
            <FormControl sx={{ m: 1 }} variant="standard" size='small'>
                <NativeSelect
                    id="customized-select-native"
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                    input={<BootstrapInput />}
                >
                    {
                        rowsPerPageOptions.map((value, index) => {
                            return <option key={index} value={value}>{value} Items/Page</option>
                        })
                    }
                </NativeSelect>
            </FormControl>
            <CustomPagination count={Math.ceil(count / rowsPerPage)} variant="outlined" shape="rounded" onChange={onPageChange} page={page} />
        </Stack>
    );
}