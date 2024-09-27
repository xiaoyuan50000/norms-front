import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Test() {
    const navigate = useNavigate()
    function sendToken() {
        axios.post('/api/sendTokenInfo', { token: '9834876dcfb05cb167a5c24953eba58c4ac89b1adf57f28f2f9d09af107ee8f01721890478029111111' }).then(res => {
            navigate('/Overview')
        })

    }


    return (
        <div style={{ margin: '20px' }}>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => sendToken()}>Send Token</Button>
            </Stack>
        </div>
    )
}
