import { useState, useEffect, useRef } from 'react';
import * as React from 'react';

import { MapContainer } from 'react-leaflet/MapContainer'
import { useMapEvents, useMap, ImageOverlay, useMapEvent, SVGOverlay, LayerGroup, Marker, Popup } from 'react-leaflet'
import './css/map.css'
import 'leaflet/dist/leaflet.css'
import SubsystemManagement from './components/SubsystemManagement.jsx'

import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import SimpleMapIssDialog from './components/SimpleMapIssDialog.jsx';
import SimpleMapBulkDialog from './components/SimpleMapBulkDialog.jsx';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import SVGMapLayer from './components/SVGMapLayer.jsx'
import MapTopButton from './components/MapTopButton.jsx';
import deviceMapEleIds from '../../../js/deviceIdObj.js'


import axios from 'axios';

const ThumbnailSlider = styled(Slider)({
  color: '#163F8F',
  width: 2,
  '& .MuiSlider-rail': {
    opacity: 1,
    height: '150px',
    marginTop: '-25px',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-18px',
      left: '50%',
      marginLeft: '-10px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: 'transparent transparent #163F8F transparent'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-18px',
      left: '50%',
      marginLeft: '-10px',
      borderWidth: '10px',
      borderStyle: 'solid',
      borderColor: '#163F8F transparent transparent transparent'
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#FF0000',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-mark': {
    width: '38px !important',
    height: '2px',
    backgroundColor: '#163F8F !important',
  },
  '& .MuiSlider-mark::nth-of-type(1)': {
    '&::before': {
      display: 'none',
    },
  }
});

function MapMenu() {
  const [isDialogIssOpen, setIsDialogIssOpen] = useState(false);
  const [dialogIssData, setDialogIssData] = useState({});
  const [isDialogBulkOpen, setIsDialogBulkOpen] = useState(false);
  const [dialogBulkData, setDialogBulkData] = useState({});
  const [sliderVal, setSliderVal] = useState(1);
  const mapRef = useRef(null);
  const svgLayerRef = useRef(null);
  const position = [51.49778376965537, -0.07882555819034077]

  const [changeOnline, setChangeOnline] = useState(0);


  const agvOnline = useRef({
    "AGV 1": 0,
    "AGV 2": 0,
    "AGV 3": 0,
    "AGV 4": 0,
  })

  const switchDatas = useRef([])

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    initDeviceStatus(switchDatas.current)
    return () => {

    }

  }, [changeOnline])

  const getAgvStatus = (datas) => {
    let agvDatas = datas.filter(item => item.type == 'AGV')
    agvDatas.forEach((val) => {
      const name = val.name
      let online = val.status == "Online" ? 1 : 0
      if (val.isError) {
        online = -1
      }
      agvOnline[name] = online
    })
    switchDatas.current = datas
    setChangeOnline(!changeOnline)

    datas.filter(item => item.type == 'SKU').forEach((e) => {
      stopAndStartGood(e.name, e.isError ? 0 : e.status == "Online" ? 1 : 0);
    })
  }

  const stopAndStartGood = (name, type) => {
    if (svgLayerRef.current) {
      svgLayerRef.current.stopAndStartGood(name, type);
    }
  }

  function initDeviceStatus(data) {
    console.log(data);

    let deviceList = data.map((e) => {
      let obg = { name: e.name }
      obg.status = e.isError ? 'Error' : e.status;
      return obg
    })
    deviceList && deviceList.forEach((device) => {
      handleSimpleDeviceStatus(device.name, device.status)
    })
  }
  const handleSimpleDeviceStatus = (name, status) => {
    const colourList = { 'Online': '#0cb11f', 'Offline': '#585858', 'Error': '#96262a', }
    const sku = { 'SKU 1': ['a-14'], 'SKU 2': ['a-24'], 'SKU 3': ['a-34'], 'SKU 4': ['a-46'], }
    const skuColourList = { 'Online': '#15ff30', 'Offline': '#989898', 'Error': '#ff4b52', }
    let mainColour = colourList[status];
    let deviceIds = deviceMapEleIds[name];
    // console.log('deviceIds',deviceIds)
    deviceIds && deviceIds.forEach((deviceId) => {
      let ele = document.getElementById(deviceId);
      ele.setAttribute("fill", mainColour)
      if (!(name.indexOf('SKU') > -1)) {
        ele.setAttribute("stroke", mainColour)
      }

    })
    if (name.indexOf('SKU') > -1) {
      let skuColour = skuColourList[status]
      let rects = sku[name]
      rects && rects.forEach((rectId) => {
        let ele = document.getElementById(rectId);
        ele.setAttribute("stroke", skuColour)
      })
    }
  }

  const center_position = [51.4965, -0.068]

  function FilterCheckboxMenu() {
    function BpCheckbox({ bg }) {
      return (
        <>
          <Checkbox
            defaultChecked
            sx={{
              color: '#153873',
              '&.Mui-checked': {
                color: '#153873',
              },
            }}
          />
          <div style={{ width: '18px', height: '18px', marginRight: '5px', borderRadius: '5px', background: bg }}></div>
        </>
      );
    }
    return (
      <Box sx={{ display: 'flex', position: 'absolute', left: '30px', top: '65px', zIndex: 9999, color: 'black', marginLeft: '-11px' }}>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel control={<BpCheckbox bg="#15FF30" />} label="Online" />
            <FormControlLabel control={<BpCheckbox bg="#FFBA00" />} label="Toggling" />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel control={<BpCheckbox bg="#989898" />} label="Offline" />
            <FormControlLabel control={<BpCheckbox bg="#FF4B52" />} label="Error" />
          </FormGroup>
        </FormControl>
      </Box>
    )
  }


  function LeftIconMenu() {
    return (
      <>
        <Stack direction="column" alignItems="center" spacing={5} sx={{ position: 'absolute', left: '30px', top: '40%', zIndex: 9999 }}>
          <Avatar onClick={() => handleOpenIssDialog()} alt="" src="/src/images/menu/icon1.svg" sx={{ width: 56, height: 56 }} />
          <Avatar onClick={() => handleOpenReDialog()} alt="" src="/src/images/menu/icon2.svg" sx={{ width: 56, height: 56 }} />
          <Avatar onClick={() => handleOpenBulkDialog()} alt="" src="/src/images/menu/icon3.svg" sx={{ width: 56, height: 56 }} />
        </Stack>
      </>
    )
  }

  function showOrHideLevel4(opacity) {
    document.getElementById("14620").style.opacity = opacity
    document.getElementById("14623").style.opacity = opacity
    document.getElementById("14624").style.opacity = opacity
    document.getElementById("14625").style.opacity = opacity
    document.getElementById("14649").style.opacity = opacity
    document.getElementById("14631").style.opacity = opacity
    document.getElementById("14622").style.opacity = opacity
    document.getElementById("14635").style.opacity = opacity
    document.getElementById("14636").style.opacity = opacity
    document.getElementById("14634").style.opacity = opacity
    document.getElementById("14632").style.opacity = opacity
    document.getElementById("14633").style.opacity = opacity
    document.getElementById("14626").style.opacity = opacity
    document.getElementById("14629").style.opacity = opacity
    document.getElementById("14628").style.opacity = opacity
    document.getElementById("14627").style.opacity = opacity
    document.getElementById("14630").style.opacity = opacity
    document.getElementById("14647").style.opacity = opacity
    document.getElementById("14648").style.opacity = opacity
    document.getElementById("14361").style.opacity = opacity
  }

  function showOrHideLevel3(opacity) {
    document.getElementById("14601").style.opacity = opacity
    document.getElementById("14705").style.opacity = opacity
    document.getElementById("14605").style.opacity = opacity
    document.getElementById("14615").style.opacity = opacity
    document.getElementById("14614").style.opacity = opacity
    document.getElementById("14646").style.opacity = opacity
    document.getElementById("14604").style.opacity = opacity
    document.getElementById("14640").style.opacity = opacity
    document.getElementById("14641").style.opacity = opacity
    document.getElementById("14552").style.opacity = opacity
    document.getElementById("14550-9").style.opacity = opacity
    document.getElementById("11727-7").style.opacity = opacity
    document.getElementById("14550-7").style.opacity = opacity
    document.getElementById("14551-7").style.opacity = opacity
    document.getElementById("_892").style.opacity = opacity
    document.getElementById("14566").style.opacity = opacity
    document.getElementById("14567").style.opacity = opacity
    document.getElementById("14555").style.opacity = opacity
    document.getElementById("14554").style.opacity = opacity
    document.getElementById("14752").style.opacity = opacity
    document.getElementById("14606").style.opacity = opacity
    document.getElementById("14609").style.opacity = opacity
    document.getElementById("14642").style.opacity = opacity
    document.getElementById("shutterdoor").style.opacity = opacity
    document.getElementById("Trapdoor").style.opacity = opacity
  }

  function showOrHideLevel2(opacity) {
    document.getElementById("8810").style.opacity = opacity
    document.getElementById("_889").style.opacity = opacity
    document.getElementById("14547").style.opacity = opacity
    document.getElementById("14546").style.opacity = opacity
    document.getElementById("14537").style.opacity = opacity
    document.getElementById("14538").style.opacity = opacity

  }
  function showOrhideElem(zoom) {
    // 4
    showOrHideLevel4(0)
    //3
    showOrHideLevel3(0)
    showOrHideLevel2(0)

    if (zoom == 4) {
      showOrHideLevel4(1)
      showOrHideLevel3(1)
      showOrHideLevel2(1)

      return
    } else if (zoom == 3) {
      showOrHideLevel3(1)
      showOrHideLevel2(1)

      return
    } else if (zoom == 2) {
      showOrHideLevel2(1)
      return
    } else {
    }
  }

  function ZoomControlLevel() {
    const defaultVal = 15
    const map = useMap(mapRef.current);

    const handleChange = (event, newValue) => {
      map.setZoom(defaultVal + newValue)
      setSliderVal(newValue)
    }

    if (mapRef.current) {
      console.log(map.getZoom() - defaultVal)
      showOrhideElem(map.getZoom() - defaultVal)
    }
    useMapEvent('click', (e) => {
      console.log(e.latlng);
      console.log(map.getBounds());
    })

    useMapEvent('zoomend', () => {
      // console.log(map.getZoom() - defaultVal);
      // showOrhideElem(map.getZoom() - defaultVal)
      setSliderVal(map.getZoom() - defaultVal)
    });

    return (
      <Stack direction="column" alignItems="center" spacing={5} sx={{ position: 'absolute', left: '45px', top: '70%', zIndex: 9999 }}>
        <Box position='relative' marginTop="70px !important">
          <div className='thumb-number-label'>
            <div>4</div>
            <div>3</div>
            <div>2</div>
            <div>1</div>
          </div>
          <ThumbnailSlider sx={{ height: 100 }} onChange={handleChange}
            defaultValue={sliderVal}
            orientation="vertical"
            shiftStep={1}
            step={1}
            marks
            min={1}
            max={4}
          />
        </Box>
      </Stack>
    )
  }

  // function ZoomControlMenu() {
  //   const map = useMap(mapRef.current);
  //   useMapEvent('click', (e) => {
  //     console.log(e.latlng);
  //     console.log(map.getBounds());
  //   })
  //   const handleZoomIn = () => map.zoomIn();
  //   const handleZoomOut = () => map.zoomOut();

  //   useMapEvent('zoomend', () => {
  //     const bounds1 = map.getBounds();
  //     const nw = bounds1.getNorthWest();
  //     const se = bounds1.getSouthEast();
  //     const width = se.lng - nw.lng;
  //     const height = se.lat - nw.lat;

  //   });

  //   useMapEvent('moveend ', () => {
  //     // map.invalidateSize()
  //   });

  //   return (
  //     <>
  //       <ButtonGroup variant="contained" orientation="vertical" sx={{
  //         position: 'absolute',
  //         right: '45px',
  //         bottom: '45px',
  //         zIndex: 999,
  //         border: '2px solid #D0AD62',
  //         background: '#fff',
  //       }}>
  //         <IconButton style={{ width: '40px' }} onClick={handleZoomIn}>
  //           <AddIcon />
  //         </IconButton >
  //         <Divider variant="middle" flexItem style={{ background: 'white', zIndex: 10 }} />
  //         <IconButton style={{ width: '40px', }} onClick={handleZoomOut}>
  //           <RemoveIcon />
  //         </IconButton >
  //       </ButtonGroup>
  //     </>
  //   )
  // }

  const handleMapClick = (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    console.log(`Clicked coordinates: Latitude ${lat}, Longitude ${lng}`);
  };

  const handleOpenIssDialog = async () => {
    let data = await gettingIssData('issuingStatus');
    setIsDialogIssOpen(true);
    setDialogIssData({ title: 'Issuing Status', data: data });
  };

  const handleOpenReDialog = async () => {
    let data = await gettingIssData('receivingStatus');
    setIsDialogIssOpen(true);
    setDialogIssData({ title: 'Receiving Status', data: data });
  };

  const handleCloseIssDialog = () => {
    setIsDialogIssOpen(false);
  };

  const handleOpenBulkDialog = async () => {
    let data = await gettingIssData('bulkLaneStatus');
    setIsDialogBulkOpen(true);
    setDialogBulkData({ title: 'Bulk Lane Status', data: data });
  };

  const handleCloseBulkDialog = () => {
    setIsDialogBulkOpen(false);
  };

  async function gettingIssData(type) {
    let issuingStatus = []
    let receivingStatus = []
    let bulkLaneStatus = []
    let { data } = await axios.post('/api/initStorageStatus');
    data.data.forEach(data => {
      switch (data.key) {
        case 'issuingStatus':
          issuingStatus = data.value;
          break;
        case 'receivingStatus':
          receivingStatus = data.value;
          break;
        case 'bulkLaneStatus':
          bulkLaneStatus = data.value;
          break;
        default:
          console.log('Data null.');
          break;
      }
    })

    if (type === 'issuingStatus') {
      if (Array.isArray(issuingStatus) && issuingStatus.length > 0) {
        const isBgColors = [
          '#3B92B9',
          '#46B1C0',
          '#68CDA2',
          '#92C181',
          '#ABD07D',
          '#D1D78E',
          '#CFC77D'
        ];

        issuingStatus = issuingStatus.map((item, index) => {
          const colorIndex = index % isBgColors.length;
          return {
            ...item,
            bgColor: isBgColors[colorIndex],
          };
        });
      }
      return issuingStatus;
    } else if (type === 'receivingStatus') {
      if (Array.isArray(receivingStatus) && receivingStatus.length > 0) {
        const rsBgColors = [
          '#F76816',
          '#F7A416',
          '#EFC019',
          '#EAD921',
          '#C6D41E',
          '#3B92B9',
          '#46B1C0'
        ];

        receivingStatus = receivingStatus.map((item, index) => {
          const colorIndex = index % rsBgColors.length;
          return {
            ...item,
            bgColor: rsBgColors[colorIndex],
          };
        });
      }
      return receivingStatus;
    } else {
      bulkLaneStatus = bulkLaneStatus.map((bulk) => {
        if (bulk.status === 'No Activeated Schedule') {
          bulk.statusColor = '#70c3ba'
        } else {
          bulk.statusColor = '#af920f'
        }
        return bulk
      })
      return bulkLaneStatus;
    }
  }

  return (
    <>
      <React.Fragment>
        {isDialogIssOpen && (
          <SimpleMapIssDialog
            isOpen={isDialogIssOpen}
            onClose={handleCloseIssDialog}
            data={dialogIssData}
          />
        )}
        {isDialogBulkOpen && (
          <SimpleMapBulkDialog
            isOpen={isDialogBulkOpen}
            onClose={handleCloseBulkDialog}
            data={dialogBulkData}
          />
        )}

      </React.Fragment >

      <div style={{ position: 'relative', height: '100vh', alignContent: 'center', background: '#FFFFFF', overflow: 'hidden' }}>
        <MapTopButton switchDatas={switchDatas} />
        <FilterCheckboxMenu />
        <LeftIconMenu />
        <MapContainer
          attributionControl={false}
          zoomControl={false}
          center={center_position}
          zoom={16}
          minZoom={16}
          maxZoom={19}
          scrollWheelZoom={true}
          ref={mapRef}
          style={{ height: '100vh' }}
          onLeafletClick={handleMapClick}>
          <ZoomControlLevel />

          <SVGMapLayer svgLayerRef={svgLayerRef} agvOnline={agvOnline} />

        </MapContainer>
      </div>

      <SubsystemManagement getAgvStatus={getAgvStatus} />
    </>
  )
}
export default MapMenu
