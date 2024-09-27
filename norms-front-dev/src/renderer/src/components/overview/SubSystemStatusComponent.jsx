function SubSystemStatusCard({SubSystemStatusDataList}) {
  let itemList = [];
  SubSystemStatusDataList.forEach((data, index) => {
    itemList.push(
        <SubSystemStatusCardItem key = {index} SubSystemStatusData = {data}/>
      );
  });

  return (
    <div className='subsystem-info-div my-2'>
      <div className="title pt-2 pl-3"><span style={{fontWeight: 'bold'}}>Subsystem Status</span></div>
      <div className="item-list py-2 pl-3">
        {itemList}
      </div>
    </div>
  )
}

function SubSystemStatusCardItem({SubSystemStatusData}) {
  return (
    <div className="item">
      <div className="left">
        <div className="top"><span style={{fontWeight: 'bold'}}>{SubSystemStatusData.name1}</span></div>
        {SubSystemStatusData.name2 ? <div className="bottom"><span style={{fontWeight: 'bold'}}>{SubSystemStatusData.name2}</span></div> : ''}
      </div>
      <div className="right">
        <div className="top">
          <div className={SubSystemStatusData.status1 == 1 ? 'right-green' : 'wrong-red'} alt="" style={{width: '16px', height: '16px'}}></div>
        </div>
        <div className="bottom">
          {SubSystemStatusData.name2 ? <div className={SubSystemStatusData.status2 == 1 ? 'right-green' : 'wrong-red'} alt="" style={{width: '16px', height: '16px'}}></div> : ''}
        </div>
      </div>
    </div>
  )
}

export default SubSystemStatusCard
