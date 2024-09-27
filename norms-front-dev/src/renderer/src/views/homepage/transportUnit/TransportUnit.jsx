import './css/transportUnit.css'
import React, { useState, useRef } from 'react';
import { actionTable } from '../../../js/TransportUnit.js'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DataTableComponent from './components/TransportUnitTable.jsx';


import agv1 from '../../../images/map/agv1.svg'
import Crane from '../../../images/map/Crane.svg'
import CraneT from '../../../images/map/CraneT.svg'
import wrong1 from '../../../images/map/wrong1.svg'
import wrong3 from '../../../images/map/wrong3.svg'
import wrong2 from '../../../images/map/wrong2.svg'
import menuImg from '../../../images/map/menu.png'
import nfold from '../../../images/map/nfold.svg'
import unfold from '../../../images/map/unfold.svg'
import close from '../../../images/map/close.svg'

function TransportUnit() {
  const imgRef_show = useRef(null);
  const imgRef_hide = useRef(null);

  const [selectedValue, setSelectedValue] = useState('tu-to');

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);

  const dispTable = (opt) => {
    actionTable(opt)
  }

  const imageMap = {
    'tu-to': menuImg,
    'subsystem': menuImg,
    'sensor': menuImg
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClick = (index) => {
    if (index === 1) {
      setOpen1(!open1);
    } else if (index === 2) {
      setOpen2(!open2);
    } else if (index === 3) {
      setOpen3(!open3);
    } else if (index === 4) {
      setOpen4(!open4);
    } else if (index === 5) {
      setOpen5(!open5);
    } else if (index === 6) {
      setOpen6(!open6);
    }
  };


  const menuSolid = () => (
    <div style={{ borderBottom: '1px solid #D8D8D8', width: '84%', marginLeft: '16%' }} />
  )

  const menuDashed = () => (
    <div style={{ borderBottom: '1px dashed  #D8D8D8', width: '74%', marginLeft: '26%' }} />
  )

  return (
    <div className='content-wrapper-menu'>
      <div className='menu-div'>
        <div className='level-left'>
          <div className='level-title'>
            <div className='level-title-left'>
              <button className='button-style1'>Level 1</button>
              <button className='button-style2'>Level 2</button>
            </div>

            <div className='unit-level-title-right'>
              <RadioGroup
                row
                value={selectedValue}
                onChange={handleChange}
                aria-labelledby="demo-row-radio-buttons-group-label"
              >
                <FormControlLabel value="tu-to" control={<Radio />} label="TU/TO" />
                <FormControlLabel value="subsystem" control={<Radio />} label="Subsystem" />
                <FormControlLabel value="sensor" control={<Radio />} label="Sensor" />
              </RadioGroup>
            </div>
          </div>

          <div className='level-bottom-div'>
            <img src={imageMap[selectedValue]} />
          </div>
        </div>

        <div className='st-right'>
          <List
            style={{ backgroundColor: "#F2F2F2", color: '#020F50' }}
            subheader={
              <ListSubheader style={{ background: '#020F50', color: '#FFFF', fontSize: '17px', borderRadius: '10px 10px 0px 0px' }}>
                SUBSYSTEM TREE
              </ListSubheader>}
          >

            <ListItemButton onClick={() => handleClick(1)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open1 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={agv1} alt="#" className='menuMargin' />
              <ListItemText primary="AGV"/>
            </ListItemButton>
            {menuSolid()}

            <ListItemButton onClick={() => handleClick(2)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open2 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={agv1} alt="#" className='menuMargin' />
              <ListItemText primary="Bin_Conveyor_Level_1" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(3)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open3 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={agv1} alt="#" className='menuMargin' />
              <ListItemText primary="Bin_Conveyor_Level_2" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(4)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open4 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={agv1} alt="#" className='menuMargin' />
              <ListItemText primary="Packaging_Machine" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(5)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open5 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={agv1} alt="#" className='menuMargin' />
              <ListItemText primary="Note_Processing_Machine" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(6)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open6 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <img src={CraneT} alt="#" className='menuBackground crane-title' />
              <ListItemText primary="Crane" />
              <img src={wrong3} className='menuWH' />
            </ListItemButton>

            <Collapse in={open6} timeout="auto" unmountOnExit>
              {menuSolid()}
              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 01" />
                <img src={wrong2} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 02" />
                <img src={wrong3} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 03" />
                <img src={wrong3} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 04" />
                <img src={wrong2} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 05" />
                <img src={wrong2} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 06" />
                <img src={wrong2} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 07" />
                <img src={wrong2} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px', borderRadius: '0px 0px 10px 10px' }}>
                <img src={Crane} alt="#" className='menuMarginRight' />
                <ListItemText primary="Crane 08" />
                <img src={wrong1} className='menuWH' />
              </ListItemButton>
              {menuDashed()}
            </Collapse>
          </List>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <img ref={imgRef_show} className="show-img" src={nfold} alt="" onClick={() => dispTable('show')} />
          <img ref={imgRef_hide} className="hide-img" src={unfold} alt="" onClick={() => dispTable('hide')} />
        </div>
        <div>
          <img ref={imgRef_hide} className="right-hide-img" src={close} alt="" onClick={() => dispTable('hide')} />
        </div>
      </div>

      <div className="bark-div bark-table-div" >
        <DataTableComponent />
      </div>
    </div>
  );
};

export default TransportUnit