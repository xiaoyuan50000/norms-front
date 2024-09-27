import { useState, useEffect, useRef,useImperativeHandle } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';

import { useMapEvents, useMap, Tooltip, useMapEvent, SVGOverlay, Marker, Popup } from 'react-leaflet'
import SvgElement from './SvgMap'
import deviceMapEleIds from '../../../../js/deviceIdObj'
import MoveMark from './MoveMark';
import Goods from './Goods';
import { line1, line2, line3, line4 } from '../../../../js/lines/line';


import axios from 'axios';


const svgBounds = [
    [51.49, -0.08],
    [51.502, -0.06],
];

const StyledWarningPop = styled(Popup)`
    left: 20px !important;
    margin-bottom: -30px;
    .leaflet-popup-content-wrapper {
        width: 150px;
        border-radius: 5px;
        background: ${props => {
        if (props.warning) {
            return '#FFF5F5'
        } else {
            return '#020951'
        }
    }
    };
        color: ${props => {
        if (props.warning) {
            return 'black'
        } else {
            return 'white'
        }
    }
    };
        
        border: 2px solid ${props => {
        if (props.warning) {
            return '#C40000'
        } else {
            return '#020951'
        }
    }
    };
    }
    .leaflet-popup-close-button {
        color: ${props => {
        if (props.warning) {
            return '#000000 !important'
        } else {
            return '#FFFFFF !important'
        }
    }};
    }
    .leaflet-popup-tip-container {
        left: 0;
        top: 50%;
        margin-left: -.79rem;
        margin-top: -8px;
        width: 15px;
        height: 15px;
    }
    .leaflet-popup-tip {
        height: 15px;
        width: 15px;
        box-shadow: none;
        margin: 0;
        padding: 0;
        margin-left: 8px;
        margin-top: 0px;
        background: ${props => {
        if (props.warning) {
            return '#FFF5F5'
        } else {
            return '#020951'
        }
    }};
        border-left: 2px solid ${props => {
        if (props.warning) {
            return '#C40000'
        } else {
            return '#020951'
        }
    }};
        border-bottom: 2px solid ${props => {
        if (props.warning) {
            return '#C40000'
        } else {
            return '#020951'
        }
    }
    };
    }
`;

function SVGMapLayer({ svgLayerRef,agvOnline }) {

    const [popupInfo, setPopupInfo] = useState({ position: null, html: "", error: 0 });
    // const currentPointArr = useRef([]);




    const currentPoint = useRef(null);
    const goodsRef = useRef(null);
    const svgRef = useRef(null);
    useMapEvent('mousemove', (e) => {
        const p = e.latlng
        currentPoint.current = { lat: p.lat, lng: p.lng }
        // currentPointArr.current = [
        //     ...currentPointArr.current,
        //     currentPoint.current
        // ]
        // console.log(currentPointArr.current);

    })

    useEffect(() => {
        // Online:#0cb11f Offline:#585858   Error:#96262a 
        // initDeviceStatus()
        // handleSimpleDeviceStatus('COMPUTER 3','offline')
        const ids = [
            ['8404-26', 'Vault Crane 1'],
            ['8404-29', 'Vault Crane 2'],
            ['8404-32', 'Vault Crane 3'],
            ['14709', 'vault door'],
            ['a-12', 'SKU Crane 1'],
            ['a-22', 'SKU Crane 2'],
            ['a-32', 'SKU Crane 3'],
            ['a-42', 'SKU Crane 4'],
            ['a-11', 'SKU Crane 1'],
            ['a-21', 'SKU Crane 2'],
            ['a-31', 'SKU Crane 3'],
            ['a-41', 'SKU Crane 4'],
            ['8404-20', 'Pallet Buffer Crane 1'],
            ['8404-36', 'Pallet Buffer Crane 2'],
            ['a-275', 'Issuing Room 1'],
            ['8404-19', 'Issuing Room 1'],
            ['8404-42', 'Receiving Room 1'],
            ['8404-46', 'Receiving Room 2'],
            ['8404-49', 'Bulk Issuing/Receiving Room'],
            ['8404-48', 'Bulk Issuing/Receiving Room']
        ]
        if (svgRef.current) {
            ids.forEach((val) => {
                document.getElementById(val[0]).addEventListener('click', (e) => { handleSvgClick(e, val) });
            })
        }

        return () => {
            ids.forEach((val) => {
                const element = document.getElementById(val[0]);
                if (element) {
                  element.removeEventListener('click', (e) => handleSvgClick(e, val));
                }
            })
        }

    }, [])

    const handleSvgClick = (e, val) => {
        const fill = document.getElementById(val[0]).getAttribute("fill")
        console.log(fill);
        
        const name = val[1]
        const clickPosition = currentPoint.current

        setPopupInfo(
            {
                position: [clickPosition.lat, clickPosition.lng],
                html: name,
                error: "#96262a" == fill
            }
        )
        console.log('SVG clicked', currentPoint.current);
    };

    // online:#0cb11f offline:#585858   error:#96262a     #415fcb
    // const handleSimpleDeviceStatus = (name, status) => {
    //     const colourList = { 'Online': '#0cb11f', 'Offline': '#585858', 'Error': '#96262a', }
    //     const sku = { 'SKU 1': ['a-14'], 'SKU 2': ['a-24'], 'SKU 3': ['a-34'], 'SKU 4': ['a-44'], }
    //     const skuColourList = { 'Online': '#15ff30', 'Offline': '#989898', 'Error': '#ff4b52', }
    //     let mainColour = colourList[status];
    //     let deviceIds = deviceMapEleIds[name];
    //     // console.log('deviceIds',deviceIds)
    //     deviceIds && deviceIds.forEach((deviceId) => {
    //         let ele = document.getElementById(deviceId);
    //         ele.setAttribute("fill", mainColour)
    //         if (!(name.indexOf('SKU') > -1)) {
    //             ele.setAttribute("stroke", mainColour)
    //         }

    //     })
    //     if (name.indexOf('SKU') > -1) {
    //         let skuColour = skuColourList[status]
    //         let rects = sku[name]
    //         rects && rects.forEach((rectId) => {
    //             let ele = document.getElementById(rectId);
    //             ele.setAttribute("stroke", skuColour)
    //         })
    //     }
    // }
    // async function initDeviceStatus() {
    //     let { data } = await axios.post('/api/getMapDevices');
    //     let deviceList = data.data.map((e) => {
    //         let obg = { name: e.name }
    //         obg.status = e.isError ? 'Error' : e.status;
    //         return obg
    //     })
    //     deviceList && deviceList.forEach((device) => {
    //         handleSimpleDeviceStatus(device.name, device.status)
    //     })
    // }

    function stopAndStartGood(name,type){
        goodsRef.current.stopAndStartGood(name,type);
    }

    useImperativeHandle(svgLayerRef, () => {
        return {
            stopAndStartGood
        };
    });

    return (
        <>
            <SVGOverlay ref={svgRef} bounds={svgBounds} attributes={{ viewBox: '0 0 2131.471 1541' }}>
                {SvgElement}
            </SVGOverlay>

            {popupInfo.position && !popupInfo.error && (
                <>
                    <StyledWarningPop position={popupInfo.position} closeOnClick={false} offset={[0, 0]}>
                        <span>{popupInfo.html}</span>
                    </StyledWarningPop >
                </>
            )}
            {popupInfo.position && popupInfo.error && (
                <>
                    <StyledWarningPop position={popupInfo.position} closeOnClick={false} offset={[0, 0]} warning>
                        <span>{popupInfo.html}</span>
                    </StyledWarningPop >
                </>
            )}

            <Goods goodsRef={goodsRef}/>
            {/* <MoveMark line={line1} online={robot.robot1Online} name="AGV 1" />
            <MoveMark line={line2} online={robot.robot2Online} name="AGV 2" />
            <MoveMark line={line3} online={robot.robot3Online} name="AGV 3" />
            <MoveMark line={line4} online={robot.robot4Online} name="AGV 4" /> */}

            <MoveMark line={line1} online={agvOnline["AGV 1"]} name="AGV 1" />
            <MoveMark line={line2} online={agvOnline["AGV 2"]} name="AGV 2" />
            <MoveMark line={line3} online={agvOnline["AGV 3"]} name="AGV 3" />
            <MoveMark line={line4} online={agvOnline["AGV 4"]} name="AGV 4" />
        </>
    )
}

export default SVGMapLayer