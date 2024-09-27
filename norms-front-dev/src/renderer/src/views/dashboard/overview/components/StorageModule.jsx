import React, { useState, useRef, useEffect } from 'react';

const IsStatus = ({ onAddTask, text, number, bgColor, details }) => {
  let tableHeaders = [];
  let formattedData = [];

  if (Array.isArray(details) && details.length > 0) {
    const firstDetail = details[0];
    tableHeaders = Object.keys(firstDetail).filter(key => typeof key === 'string');
    formattedData = details.map(item => tableHeaders.map(header => item[header]));
  }

  let title = 'Issuing Status - ';
  if (text === 'Notification') {
    title = 'Issuing Notification Pending Schedule Generation';
  } else {
    title += text;
  }

  const handleClick = () => {
    onAddTask({ title: title, tableHeaders: tableHeaders, data: formattedData });
  };

  return (
    <div className="status-line" onClick={handleClick}>
      <span className="status-circle" style={{ backgroundColor: bgColor }}></span>
      <span className="instance-text">{text}</span>
      <span className="instance-number">{number}</span>
    </div>
  );
};


const SubsystemStatus = ({ module, HtmlTooltip }) => {
  const getTitleRightClassName = () => {
    let baseClassName = 'ssb-modules-title-right';

    if (module.status == 'Robot Picking') {
      baseClassName += '  color-h';
    } else if (module.status == 'Picking') {
      baseClassName += '  color-c';
    } else if (module.status == 'Output') {
      baseClassName += '  color-lan';
    } else if (module.status == 'Palletizing') {
      baseClassName += '  color-z';
    } else if (module.status == 'Input') {
      baseClassName += '  color-lv';
    } else if (module.status == 'LTF') {
      baseClassName += '  color-f';
    } else if (module.status == 'Error') {
      baseClassName += '  color-red';
    }
    return baseClassName;
  };

  const getPopperText = () => {
    let newPopperText = 'Status: ';
    if (module.status) {
      if (module.status == 'LTF') {
        newPopperText += 'Long Term Failure';
      } else if (module.status == 'Error') {
        newPopperText += 'Abnormal Load Profile';
      } else {
        newPopperText += module.status;
      }
    }
    return newPopperText;
  }

  return (
    <div className='ssb-modules'>
      <HtmlTooltip title={getPopperText()}>
        <div>
          <div className='ssb-modules-title'>
            <div className='ssb-modules-title-left'>{module.name}</div>
            <div className={getTitleRightClassName()}>{module.status}</div>
          </div>
          <div className='ssb-modules-bottom'>
            <img src={module.imageSrc} className='bgcl' />
            <div className="text-container">
              <div className="text-head">{module.operation}</div>
              <div className="text-end">Remaining<span className='bb'>{module.num}</span></div>
            </div>
          </div>
        </div>
      </HtmlTooltip>
    </div>
  );
};


const TransportErrors = ({ module, MoreImg, errorImg, HtmlTooltip }) => {
  const [popperVisible, setPopperVisible] = useState(false);
  const myRef = React.useRef();

  const checkOverflow = () => {
    const element = myRef.current?.querySelector('.crb-modules-bottom-bottom');
    if (element) {
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      if (scrollHeight > clientHeight) {
        setPopperVisible(true);
      } else {
        setPopperVisible(false);
      }
    }
  };

  return (
    <div className='crb-modules'>
      <div className='crb-modules-title'>
        <span className='title-item tu-tp-title'>TU : {module.tu}</span>
        <span className='title-item tu-tp-text'>Date: <span style={{ marginLeft: '15px' }}>{module.date}</span></span>
        <div className='title-item tu-tp-text tu-tp-text-cdiv'>
          <div>
            Source: <span style={{ marginLeft: '5px' }}>{module.source}</span>
          </div>
          <div>
            Dest: <span style={{ marginLeft: '5px', marginRight: '2px' }}>{module.dest}</span>
          </div>
        </div>
      </div>
      <img src={MoreImg} alt="#" className='img-you' />

      <div className='crb-modules-bottom' ref={myRef} onMouseEnter={checkOverflow} onMouseLeave={() => setPopperVisible(false)}>
        <div className='crb-modules-bottom-title'>
          <img src={errorImg} />
          Error Message
        </div>
        <HtmlTooltip placement="left" title={popperVisible ? module.errorStr : null}>
          <div className="crb-modules-bottom-bottom" >
            {module.errorStr}
          </div>
        </HtmlTooltip>
      </div>
    </div >
  )
};

export { IsStatus, SubsystemStatus, TransportErrors };  