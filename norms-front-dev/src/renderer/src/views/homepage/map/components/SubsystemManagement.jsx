import React, { useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';

import l from '../../../../images/map/l.svg'
import r from '../../../../images/map/r.svg'
import unfold1 from '../../../../images/map/unfold1.svg'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function SubsystemManagement(props) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const [expandedTypes, setExpandedTypes] = useState([]);
  const [isSubsystemListOpen, setIsSubsystemListOpen] = useState(false);
  const [isSubsystemsListOpen, setIsSubsystemsListOpen] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isSwitchUpdate, setIsSwitchUpdate] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    getDrawerRight();
  }, [isSwitchUpdate]);

  async function getDrawerRight() {
    axios.post('/api/getMapDevices').then(res => {
      const agvs = res.data.data
      setData(res.data.data);
      props.getAgvStatus(agvs)

      const anyOnline = res.data.data.some(item => item.status === 'Online');
      setIsSwitchChecked(anyOnline);
    });
  }

  const toggleDrawer = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubsystemList = () => {
    setIsSubsystemListOpen(!isSubsystemListOpen);
  };

  const handleClick = (type) => {
    const isOnlineType = data.some(item => item.type === type && item.status === 'Online');

    if (isOnlineType) {
      setExpandedTypes(prevTypes => {
        const index = prevTypes.indexOf(type);
        if (index > -1) {
          return prevTypes.filter(t => t !== type);
        } else {
          return [...prevTypes, type];
        }
      });
    }
  };

  const toggleSubsystemsList = () => {
    setIsSubsystemsListOpen(!isSubsystemsListOpen);
  };

  const uniqueTypes = data ? Array.from(new Set(data.map(item => item.type))) : [];

  const getColorCircle = (error) => {
    const circleStyle = {
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '8px',
    };

    const color = error === 0 ? 'green' : error === 1 ? 'red' : 'grey';
    return <div style={{ borderBottom: '1px solid #D9D9D9' }}><span style={{ ...circleStyle, backgroundColor: color }} /></div>;
  };

  const handleSwitchChange = async (event) => {
    const status = event.target.checked
    setIsSwitchChecked(status);

    try {
      const response = await axios.post('/api/updateAllStatus', {
        status: status
      });

      if (response.data.code == 1) {
        setIsSwitchUpdate(!isSwitchUpdate)
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSwitchChangeAndUpdate = async (itemName) => {
    try {
      const { name, status: currentStatus, isError, operateStatus } = itemName;

      const newStatus = currentStatus === 'Online' ? 'Offline' : 'Online';

      const response = await axios.post('/api/updateMapDeviceStatus', {
        param: {
          name,
          status: newStatus,
          isError,
          operateStatus
        }
      });

      if (response.data.code == 1) {
        setIsSwitchUpdate(!isSwitchUpdate)
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating switch status:', error);
    }
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      border: '2px solid green',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
      color: "#00B050"
    },
    '.css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
      backgroundColor: '#DBFFEB'
    },
  }));

  const list = () => (
    <Box sx={{ width: 256 }}>
      <List
        style={{ backgroundColor: "#F2F2F2", color: '#020F50' }}
        subheader={
          <ListSubheader style={{ background: '#020F50', color: '#FFFF', fontSize: '15px', zIndex: '10', lineHeight: '40px' }}>
            <img src={unfold1} alt="#" style={{ width: '20.25px', height: "20.25px", marginRight: '12px', transform: 'scaleX(-1) ' }} />
            Subsystem Management
          </ListSubheader>}>

        <ListSubheader style={{
          fontWeight: 600,
          color: '#163F8F',
          marginBottom: '0',
          fontSize: '15px',
          lineHeight: 'normal',
          paddingTop: '20px',
          paddingRight: '5px',
          backgroundColor: '#F2F2F2',
          paddingLeft: '27px'
        }}>
          Subsystem Tree
          <hr style={{ marginTop: '0', marginBottom: '0', color: '#BABABA' }} />
        </ListSubheader>

        {uniqueTypes.map((type, index) => (
          <Fragment key={type}>
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(type)} style={{ paddingLeft: '18px', paddingBottom: '0', paddingRight: '5px', marginBottom: '-5px' }}>
                <ListItemIcon style={{ minWidth: '30px', color: '#313C6F' }}>
                  {expandedTypes.includes(type) ? <ArrowDropDown /> : <ArrowRight />}
                </ListItemIcon>
                <ListItemText primary={type} primaryTypographyProps={{ fontWeight: 600, fontSize: '15px', color: '#163F8F', borderBottom: '1px solid #D9D9D9' }} />
              </ListItemButton>
            </ListItem>

            {expandedTypes.includes(type) && (
              <List component="div" disablePadding>
                {data.filter(item => item.type === type && item.status === 'Online').map((itemName) => (
                  <ListItem key={itemName.id + index} style={{ paddingLeft: '49px', paddingBottom: '0', paddingRight: '5px' }}>
                    <ListItemText primary={itemName.name} primaryTypographyProps={{ borderBottom: '1px solid #D9D9D9', fontSize: '15px', color: '#163F8F', paddingBottom: '3px' }} />

                    {getColorCircle(itemName.isError)}
                  </ListItem>
                ))}
              </List>
            )}
          </Fragment>
        ))}



        <ListItem disablePadding>
          <ListItemButton onClick={toggleSubsystemList} style={{ paddingLeft: '18px', paddingBottom: '0', paddingRight: '5px', marginBottom: '-5px' }}>
            <ListItemIcon style={{ minWidth: '30px', color: '#313C6F' }}>
              {isSubsystemListOpen ? <ArrowDropDown /> : <ArrowRight />}
            </ListItemIcon>
            <ListItemText primary="Main Switch" primaryTypographyProps={{ fontWeight: 600, fontSize: '15px', color: '#163F8F', borderBottom: '1px solid #D9D9D9' }} />
          </ListItemButton>
        </ListItem>

        {isSubsystemListOpen && (
          <List component="div" disablePadding>
            <ListItem style={{
              padding: '0',
              marginLeft: '49px',
              height: '30px',
              marginRight: '10px',
              borderBottom: '1px solid #D9D9D9',
              width: '202px',
              marginTop: '3px'
            }}>
              <ListItemText primary='All Subsystems' primaryTypographyProps={{ fontSize: '15px', color: '#163F8F' }} />

              <FormControlLabel control={
                <Android12Switch
                  checked={isSwitchChecked}
                  onChange={handleSwitchChange}
                />} />
            </ListItem>
          </List>
        )}




        <ListItem disablePadding>
          <ListItemButton onClick={toggleSubsystemsList} style={{ paddingLeft: '18px', paddingBottom: '0', paddingRight: '5px', marginBottom: '-3px' }}>
            <ListItemIcon style={{ minWidth: '30px', color: '#313C6F' }}>
              {isSubsystemsListOpen ? <ArrowDropDown /> : <ArrowRight />}
            </ListItemIcon>
            <ListItemText primary="Subsystems Switch" primaryTypographyProps={{ fontWeight: 600, fontSize: '15px', color: '#163F8F', borderBottom: '1px solid #D9D9D9' }} />
          </ListItemButton>
        </ListItem>

        {isSubsystemsListOpen && (
          <List component="div" disablePadding>
            {data.map(itemName => (
              <ListItem key={itemName.id}
                style={{
                  padding: '0',
                  marginLeft: '49px',
                  height: '30px',
                  marginRight: '10px',
                  borderBottom: '1px solid #D9D9D9',
                  width: '202px',
                  marginTop: '4px'
                }}>
                <ListItemText primary={itemName.name} primaryTypographyProps={{ fontSize: '15px', color: '#163F8F' }} />

                <FormControlLabel control={
                  <Android12Switch
                    checked={itemName.status === 'Online'}
                    onChange={() => handleSwitchChangeAndUpdate(itemName)}
                  />} />
              </ListItem>
            ))}
          </List>
        )}
      </List>
      <Divider />
    </Box >
  );

  return (
    <>
      {!isSidebarOpen && (
        <div style={{ height: '100vh', backgroundColor: 'rgb(242, 247, 255)', position: 'absolute', zIndex: '9999', right: '0', top: '0', width: '33px' }}>
          <img src={l} alt="#"
            style={{
              position: 'absolute',
              top: '45.8%',
              color: '#163F8F',
              right: '0',
              cursor: 'pointer',
              zIndex: '9999'
            }}
            onClick={toggleDrawer}
          />
        </div>)}

      {isSidebarOpen && (
        <>
          <Drawer
            anchor="right"
            open={open}
            style={{ zIndex: 999, position: 'relative' }}
            variant="permanent"
          >
            {list()}
          </Drawer>

          <img src={r} alt="#"
            style={{
              position: 'absolute',
              top: '45.8%',
              color: '#163F8F',
              right: '230px',
              cursor: 'pointer',
              zIndex: '9999'
            }}
            onClick={toggleDrawer}
          />
        </>)}
    </>
  );
}

export default SubsystemManagement