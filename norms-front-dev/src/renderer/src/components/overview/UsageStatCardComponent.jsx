function UsageStatCard({UsageData}) {
  let persentColor = UsageData.persent > 80 ? '#ff5050' : UsageData.persent > 60 ? '#f4a500' : '#38cd02';
  return (
    <div className="usage-card">
        <div className="title">
          <div className="left"></div>
          <div className="content">{UsageData.name}</div>
        </div>
        <div className="data">
          <div className="top">
            <div style={{width: "50%", height: '100%'}}>
              <div className="num"><span style={{color: '#218ae4', fontSize: '26px', fontWeight: 'bold'}}>{UsageData.loadedNum}</span></div>
              <div className="label"><span style={{fontSize: '12px'}}>Loaded</span></div>
            </div>
            <div style={{width: "50%", height: '100%'}}>
              <div className="num"><span style={{color: '#08901c', fontSize: '26px', fontWeight: 'bold'}}>{UsageData.emptyNum}</span></div>
              <div className="label"><span style={{fontSize: '12px'}}>Empty</span></div>
            </div>
          </div>
          <div className="bottom">
            <span style={{fontSize: '12px', paddingRight: '2px'}}>Usage</span>
            <span style={{color: persentColor, fontSize: '26px', fontWeight: 'bold'}}>{UsageData.persent}%</span>
          </div>
        </div>
      </div>
  )
}

export default UsageStatCard
