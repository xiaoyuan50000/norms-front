import { useState, useEffect, useRef, useCallback } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Marker, Popup, Tooltip } from 'react-leaflet'

const robotOnlineUrl = '../src/images/map/agv.svg'
const robotOfflineUrl = '../src/images/map/agv-offline.svg'
const robotErrorUrl = '../src/images/map/agv-error.svg'

const StyledTooltip = styled(Tooltip)`
    background-color: #020951;
    border: 1px solid #020951;
    color: white;
    ::before {
        border-top-color: #020951;
    }
`

const StyledErrorTooltip = styled(Tooltip)`
    background-color: #96262A;
    border: 1px solid #96262A;
    color: white;
    ::before {
        border-top-color: #96262A;
    }
`

const MoveMark = React.memo((props) => {
    const { line, initializeLocation, online, name } = props
    const [markPosition, setMarkPosition] = useState({ position: line[0], index: 0, turns: 0 });


    const removeInterval = (interval) => {
        if (interval) {
            clearInterval(interval)
        }
    }

    useEffect(() => {
        // console.log(name, online);

        let interval = null
        if (!online || online == -1) {
            removeInterval(interval)
        } else {
            interval = setInterval(() => {
                let newMarkPosition = {
                    position: markPosition.position,
                    index: markPosition.index,
                    turns: markPosition.turns
                }
                let index = 0
                if (markPosition.turns % 2 === 0) {
                    index = markPosition.index + 1
                } else {
                    index = markPosition.index - 1
                }
                newMarkPosition.index = index
                newMarkPosition.position = line[index]
                if (index == 0 || index == line.length - 1) {
                    newMarkPosition.turns = markPosition.turns + 1
                }
                setMarkPosition(newMarkPosition)
            }, 100);
        }

        return () => {
            removeInterval(interval)
        }
    }, [markPosition, online])


    return (
        <>
            {
                markPosition.position && (
                    <Marker position={markPosition.position} icon={customIcon(getIconUrl(online))}>
                        {(online == -1) && (
                            <StyledErrorTooltip direction="top" offset={[-4, -10]}>{name}</StyledErrorTooltip>
                        )}
                        {(online != -1) && (
                            <StyledTooltip direction="top" offset={[-4, -10]}>{name}</StyledTooltip>
                        )}
                    </Marker>
                )
            }
        </>
    )
})

const getIconUrl = (online) => {
    if (online == -1) {
        return robotErrorUrl
    } else if (online == 1) {
        return robotOnlineUrl
    }
    return robotOfflineUrl
}

const customIcon = (iconUrl) => {
    return L.icon({
        iconUrl: iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    });
};

export default MoveMark