import { useState, useEffect, useRef } from 'react';
import * as React from 'react';


import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import moment from 'moment';

function ErrorList({ errorList }) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.white' }}>
            {
                // [
                //     { key: 1, msg: 'AGV1 stopped', time: '12:30:31' },
                //     { key: 2, msg: 'TU 898 something wrong...', time: '12:40:31' },
                //     { key: 3, msg: 'TU 898 error', time: '13:00:31' },
                //     { key: 4, msg: 'Trap door 1 is open', time: '13:10:11' },
                // ]
                errorList.map((value) => {
                    return (
                        <ListItem
                            key={value.key}
                            sx={{ py: 0, my: 1, minHeight: 20, background: '#F8F8F8' }}
                            secondaryAction={
                                <div>
                                    {value.time}
                                </div>
                            }
                        >
                            <ListItemText sx={{ color: 'red', fontWeight: 800 }} primary={`${value.msg}`} />
                        </ListItem>
                    );
                })}
        </List>
    );
}
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#ffffff',
        minWidth: '360px',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '2px solid #ff0000',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#ff0000',
    },
}));

function MapTopButton({ switchDatas }) {

    const errorList = switchDatas.current.filter(item => item.isError).map((item, index) => {
        return {
            key: index, msg: `${item.name} ${item.errorInfo || ""}`, time: item.errorDate ? moment(item.errorDate).format("HH:mm:ss") : ""
        }
    })
    const errorNumber = errorList.length


    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };


    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <Stack spacing={2} direction="row" sx={{
                position: 'absolute',
                top: '17px',
                left: 'calc(50% - 130px)',
                zIndex: 999,
                height: '45px',
            }}>
                <HtmlTooltip
                    placement="bottom-start"
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [120, -30],
                                    },
                                },
                            ],
                        },
                    }}

                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <React.Fragment>
                            <ErrorList errorList={errorList} />
                        </React.Fragment>
                    }>
                    <Badge badgeContent={errorNumber} color="error">
                        <Button
                            onClick={handleTooltipOpen}
                            style={{ background: '#020951', width: '130px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', fontSize: '18px', borderColor: 'transparent', textTransform: 'capitalize', borderRight: '0px', marginRight: '-1px', color: '#D0AD62', border: '2px solid #D0AD62' }}>
                            Level 1
                        </Button>
                    </Badge>
                </HtmlTooltip>
                <Button style={{ background: '#020951', width: '130px', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', fontSize: '18px', textTransform: 'capitalize', color: 'white', border: '2px solid #D0AD62' }}>
                    Level 2
                </Button>
            </Stack>
        </ClickAwayListener>
    )
}

export default MapTopButton