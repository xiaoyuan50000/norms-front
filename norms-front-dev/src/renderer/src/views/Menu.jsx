import '../stylesheets/css/menu.css'
import React, { useState, useRef } from 'react';
import { actionTable } from '../js/transportOrderto.js'
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

import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import xYellow from '../images/x-yellow.svg'
import xRed from '../images/x-red.svg'
import xGreen from '../images/x-green.svg'
import search from '../images/search.svg'
import xia from '../images/xia.svg'
import wrong from '../images/wrong.svg'
import d from '../images/d.svg'
import menuImg from '../images/menu.png'

function Menu() {
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
    'subsystem': search,
    'sensor': wrong
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

            <div className='level-title-right'>
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
              <ShoppingCartCheckoutIcon className='menuMargin menuBackground' />
              <ListItemText primary="AGV" />
            </ListItemButton>
            {menuSolid()}

            <Collapse in={open1} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <ShoppingCartCheckoutIcon className='menuMarginRight' />
                <ListItemText primary="AGV 01" />
              </ListItemButton>

              {menuDashed()}
              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <ShoppingCartCheckoutIcon className='menuMarginRight' />
                <ListItemText primary="AGV 02" />
              </ListItemButton>

              {menuDashed()}
              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <ShoppingCartCheckoutIcon className='menuMarginRight' />
                <ListItemText primary="AGV 03" />
              </ListItemButton>
              {menuDashed()}
            </Collapse>



            <ListItemButton onClick={() => handleClick(2)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open2 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <ShoppingCartCheckoutIcon className='menuMargin menuBackground' />
              <ListItemText primary="Bin_Conveyor_Level_1" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(3)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open3 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <ShoppingCartCheckoutIcon className='menuMargin menuBackground' />
              <ListItemText primary="Bin_Conveyor_Level_2" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(4)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open4 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <ShoppingCartCheckoutIcon className='menuMargin menuBackground' />
              <ListItemText primary="Packaging_Machine" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(5)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open5 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <ShoppingCartCheckoutIcon className='menuMargin menuBackground' />
              <ListItemText primary="Note_Processing_Machine" />
            </ListItemButton>
            {menuSolid()}



            <ListItemButton onClick={() => handleClick(6)}>
              <ListItemIcon style={{ minWidth: '0px' }}>
                {open6 ? <ArrowDropDown /> : <ArrowRight />}
              </ListItemIcon>
              <PrecisionManufacturingRoundedIcon className='menuMargin menuBackground' />
              <ListItemText primary="Crane" />
              <img src={xRed} className='menuWH' />
            </ListItemButton>


            <Collapse in={open6} timeout="auto" unmountOnExit>
              {menuSolid()}
              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 01" />
                <img src={xGreen} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 02" />
                <img src={xRed} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 03" />
                <img src={xRed} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 04" />
                <img src={xGreen} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 05" />
                <img src={xGreen} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 06" />
                <img src={xGreen} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 07" />
                <img src={xGreen} className='menuWH' />
              </ListItemButton>
              {menuDashed()}

              <ListItemButton sx={{ pl: 9, height: '40px', borderRadius: '0px 0px 10px 10px' }}>
                <PrecisionManufacturingRoundedIcon className='menuMarginRight' />
                <ListItemText primary="Crane 08" />
                <img src={xYellow} className='menuWH' />
              </ListItemButton>
              {menuDashed()}
            </Collapse>
          </List>
        </div>
      </div>

      <img ref={imgRef_show} className="show-img" src="src/images/nfold.svg" alt="" onClick={() => dispTable('show')} />
      <img ref={imgRef_hide} className="hide-img" src="src/images/unfold.svg" alt="" onClick={() => dispTable('hide')} />

      <div className="bark-div bark-table-div">
        <table aria-hidden="true" className="table bark-table text-center">
          <thead>
            <tr>
              <th className='colspan-1'></th>

              <th className='colspan-1'>
                Transport Order<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>

              <th className='colspan-1'>
                Last Updater<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>

              <th className='colspan-1'>
                Source Destination<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value=""></option>
                    <option value="sourceDestination">Pallet_Conveyor</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Next Destination<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value=""></option>
                    <option value="nextDestination">AV</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Drection<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value="0"></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Processing Result<br />
                <div className='drop-down'>
                  <select className='drop-down-select'>
                    <option value="0"></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                  </select>
                </div>
              </th>

              <th className='colspan-1'>
                Error<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>

              <th className='colspan-1'>
                Description<br />
                <div className="search-container">
                  <input
                    type="text"
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={search} />
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td style={{ color: 'blue' }}>8,035</td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={wrong} style={{ width: '25px', height: '25px' }} /></td>
              <td></td>
              <td>PRQ [conveyorPosition <br />=10012...</td>
            </tr>

            <tr>
              <td></td>
              <td style={{ color: 'blue' }}>8,034</td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={d} style={{ width: '20px', height: '20px' }} /></td>
              <td></td>
              <td>PRQ [conveyorPosition <br />=10012...</td>
            </tr>

            <tr>
              <td></td>
              <td style={{ color: 'blue' }}>8,034</td>
              <td>
                06.01.2020<br />10:39:23.96
              </td>
              <td>Pallet_Conveyor</td>
              <td>AV</td>
              <td><img src={xia} style={{ width: '15px', height: '15px' }} /></td>
              <td><img src={d} style={{ width: '20px', height: '20px' }} /></td>
              <td></td>
              <td>PRQ [conveyorPosition <br />=10012...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu