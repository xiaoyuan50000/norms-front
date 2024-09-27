import React, { useEffect, useRef } from 'react';

function DrawStorageCapacityStatusModel({ sorageCapacityStatus }) {
  const source = [
    { source: 'SKU1', source_count: 0 },
    { source: 'SKU2', source_count: 0 },
    { source: 'SKU3', source_count: 0 },
    { source: 'SKU4', source_count: 0 },
    { source: 'PB1', source_count: 0 },
    { source: 'PB2', source_count: 0 },
    { source: 'VLT1', source_count: 0 },
    { source: 'VLT2', source_count: 0 },
    { source: 'VLT3', source_count: 0 }
  ]

  source.forEach((item, index) => {
    let source = item.source
    const row = sorageCapacityStatus.find(i => i.source === source);
    if (row) {
      item.source_count = row.source_count;
    }
  });

  const SOME_MAX_VALUE = 10;

  return (
    <div className='scs-bottom-div'>
      {source.map((item, index) => (
        <div className='flex-container' key={index}>
          <div className='flex-div-title'>
            <div className='flex-left'>
              <span className='text-top'>{SOME_MAX_VALUE - item.source_count}</span>
              <span className='text-bottom'>{item.source_count}</span>
            </div>
            <div className='flex-right'>
              <div className='div-in-div' style={{
                height: `${(item.source_count / SOME_MAX_VALUE) * 100}%`
              }}>
                {(item.source_count / SOME_MAX_VALUE) * 100 + '%'}
              </div>
            </div>
          </div>
          <div className='flex-div-bottom'>
            <span className='flex-div-text'>{item.source}</span>
          </div>
        </div>
      ))}
      {/* <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "73%" }}>
                  73%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>SKU1</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "27%" }}>
                  27%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>SKU2</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "27%" }}>
                  27%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>SKU3</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "73%" }}>
                  73%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>SKU4</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "73%" }}>
                  73%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>PB1</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "73%" }}>
                  73%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>PB2</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "100%" }}>
                  100%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>VLT1</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "0%" }}>
                  0%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>VLT2</span>
            </div>
          </div>

          <div className='flex-container'>
            <div className='flex-div-title'>
              <div className='flex-left'>
                <span className='text-top'>8</span>
                <span className='text-bottom'>8</span>
              </div>
              <div className='flex-right'>
                <div className='div-in-div' style={{ height: "73%" }}>
                  73%
                </div>
              </div>
            </div>
            <div className='flex-div-bottom'>
              <span className='flex-div-text'>VLT3</span>
            </div>
          </div> */}
    </div>
  )
}

export default DrawStorageCapacityStatusModel