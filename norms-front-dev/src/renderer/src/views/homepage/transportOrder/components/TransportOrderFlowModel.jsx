import React, { useRef, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import axios from 'axios';

import add from '../../../../images/map/add.svg'
import arrow from '../../../../images/map/arrow.svg'
import Edit from '../../../../images/map/edit.svg'
import Restart from '../../../../images/map/restart.svg'
import Complete from '../../../../images/map/complete.svg'

function TransportOrderFlowModel({ data, flowId, toId }) {
  const diagramRef = useRef(null);
  const myDiagramRef = useRef(null);
  const [alertInfoList, setAlertInfoList] = useState([]);

  // if(data){
  //   console.log(data);
  //   console.log(typeof data);
  //   console.log(data[0].detail);
  //   console.log(typeof data[0].detail);
  // }

  let sum = 0;

  const addErrorAlert = (msg, type) => {
    const newAlert = {
      id: Math.random().toString(36).slice(2, 11),
      time: new Date().getTime(),
      msg: msg,
      type: type
    };
    setAlertInfoList(prev => [...prev, newAlert]);

    setTimeout(() => {
      setAlertInfoList(prev => { return addErrorAlertSetTimeOut(prev, newAlert) });
    }, 3000);
  };

  const addErrorAlertSetTimeOut = (prev, newAlert) => {
    return prev.filter(alert => alert.id !== newAlert.id)
  }

  const saveDiagramData = async () => {
    try {
      const datas = myDiagramRef.current.model.toJson();
      const isValid = validateGraphData(datas);

      if (isValid) {
        const response = await axios.post('/api/saveDiagramData', {
          jsonData: datas,
          flowId: flowId,
          toId: toId
        });

        if (response.data.code === 404) {
          addErrorAlert('One or more node names do not have corresponding name in the database.', 'error');
        }

        if (response.data.code === 1) {
          addErrorAlert('Succeed.', 'success');
        } else {
          console.error('Failed to save diagram data:', response.status);
        }
      } else {
        addErrorAlert('Have at least one node. Or multiple nodes are connected. Do not link nodes repeatedly. The nodes are unique.', 'error');
      }
    } catch (error) {
      console.error('Error saving diagram data:', error);
      addErrorAlert('Error saving diagram data!', 'error');
    }
  };

  const validateKey = function (nodeNameSet, key) {
    return !key || typeof key !== 'string' || nodeNameSet.has(key)
  }
  const validateLink = function (from, to, nodeNameSet, nodeAsFromSet, nodeAsToSet) {
    return !from || !to
      || !nodeNameSet.has(from) || !nodeNameSet.has(to)
      || nodeAsFromSet.has(from) || nodeAsToSet.has(to)
  }

  // stipulate.
  function validateGraphData(datas) {
    let datasObject = JSON.parse(datas);

    const nodeNameSet = new Set();
    const nodeAsFromSet = new Set();
    const nodeAsToSet = new Set();

    if (datasObject.nodeDataArray.length === 0) {
      return true;
    }

    for (const node of datasObject.nodeDataArray) {
      const { key } = node;
      if (validateKey(nodeNameSet, key)) {
        return false;
      }
      nodeNameSet.add(key);
    }

    if (datasObject.nodeDataArray.length === 1) {
      return true;
    }

    if (datasObject.nodeDataArray.length !== datasObject.linkDataArray.length + 1) {
      return false;
    }

    for (const link of datasObject.linkDataArray) {
      const { from, to } = link;
      if (validateLink(from, to, nodeNameSet, nodeAsFromSet, nodeAsToSet)) {
        return false;
      }

      nodeAsFromSet.add(from);
      nodeAsToSet.add(to);
    }

    if (nodeAsFromSet.size + nodeAsToSet.size < nodeNameSet.size) {
      return false;
    }

    return true;
  }

  // Add node.
  function addNewNode() {
    const uniqueKey = `node-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

    const newNodeData = {
      key: uniqueKey,
      name: "New Node" + sum,
      location: "-300 -130"
    };

    myDiagramRef.current.model.addNodeData(newNodeData);
    sum++;
  }

  function setNodeLocations(nodes) {
    const xSpacing = 207;
    const ySpacing = 90;
    let currentX = 0;
    let currentY = 0;
    let columns = 2;

    function getNewRowStartX(prevNode) {
      return prevNode.location.split(',')[0] | 0;
    }

    nodes.forEach((node, index) => {
      if (index === 0) {
        node.location = `${currentX} ${currentY}`;
      } else {
        if (index % columns === 0) {
          currentX = getNewRowStartX(nodes[index - columns]) + xSpacing;
        } else {
          currentX += xSpacing;
        }
        node.location = `${currentX} ${currentY}`;
      }
      if (index % columns === columns - 1) {
        currentY += ySpacing;
      }
    });
  }

  function parseFlowDetailsToGoJS(data) {
    if (!Array.isArray(data)) {
      console.error('Input data must be an array');
      return { nodes: [], links: [] };
    }

    let nodes = [];
    let links = [];

    if (data.length > 0 && typeof data[0].path === 'string') {
      const stepString = data[0].path;
      const steps = stepString.split(',').map(step => step.trim());

      steps.forEach((step, index) => {
        const trimmedStep = step.trim();
        if (!trimmedStep) return;

        const nodeId = `step-${index}`;
        nodes.push({
          key: nodeId,
          name: trimmedStep,
          // location: '' 
        });
      });

      for (let i = 0; i < steps.length - 1; i++) {
        const fromNode = `step-${i}`;
        const toNode = `step-${(i + 1)}`;
        links.push({ from: fromNode, to: toNode });
      }
      setNodeLocations(nodes);
    }
    return { nodes, links };
  }

  useEffect(() => {
    if (diagramRef.current && Array.isArray(data) && data.length > 0) {
      const $ = go.GraphObject.make;
      myDiagramRef.current = $(go.Diagram, "myDiagram", { "undoManager.isEnabled": true });
      const cxElement = document.getElementById("contextMenu");
      cxElement.style.display = 'none';
      const myContextMenu = $(go.HTMLInfo, {
        show: showContextMenu,
        hide: hideContextMenu
      });

      myDiagramRef.current.nodeTemplate =
        $(go.Node, "Auto",
          {
            minSize: new go.Size(130, 35),
            padding: 8,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
            fromLinkable: true,
            toLinkable: true,
            locationSpot: go.Spot.Center,
            contextMenu: myContextMenu,
            selectionAdornmentTemplate:
              $(go.Adornment, $(go.Shape, { fill: null, stroke: null, strokeWidth: null }), $(go.Placeholder))
          },
          new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape, "RoundedRectangle", { name: "shapeName", fill: "#EBECF8", stroke: "#323EBD", strokeWidth: 1 }),
          $(go.TextBlock, { name: "textBlockName", margin: 10, stroke: "#2B38BC", font: "bold 13px sans-serif" },
            { fromLinkable: false, toLinkable: false, editable: true },
            new go.Binding("text", "name").makeTwoWay())
        );

      myDiagramRef.current.linkTemplate =
        $(go.Link,
          {
            routing: go.Link.Orthogonal,
            reshapable: true,
            resegmentable: true,
            relinkableFrom: true,
            relinkableTo: true,
            adjusting: go.Link.Stretch
          },
          $(go.Shape, { stroke: "#D1D1D1", strokeWidth: 3 }),
          $(go.Shape, { toArrow: "Standard", stroke: "#D1D1D1", fill: "#D1D1D1", strokeWidth: 6 })
        );

      if (data[0].detail) {
        const modelData = JSON.parse(data[0].detail);
        myDiagramRef.current.model = new go.GraphLinksModel(modelData.nodeDataArray, modelData.linkDataArray)
      } else {
        const { nodes, links } = parseFlowDetailsToGoJS(data);
        myDiagramRef.current.model = new go.GraphLinksModel(nodes, links);
      }

      myDiagramRef.current.addDiagramListener("ChangedSelection", function (e) {
        myDiagramRef.current.nodes.each(function (node) {
          if (node.isSelected) {
            node.findObject("shapeName").fill = "#F8EBEB";
            node.findObject("shapeName").stroke = "#FC3333";
            node.findObject("textBlockName").stroke = "red";
          } else {
            node.findObject("shapeName").fill = "#EBECF8";
            node.findObject("shapeName").stroke = "#323EBD";
            node.findObject("textBlockName").stroke = "#2B38BC";
          }
        });
      });

      cxElement.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);

      function hideCX() {
        if (myDiagramRef.current.currentTool instanceof go.ContextMenuTool) {
          myDiagramRef.currentTool.doCancel();
        }
      }

      function showContextMenu(obj, diagram, tool) {
        const mousePt = diagram.lastInput.viewPoint;
        const containerWidth = document.getElementById('myDiagram').offsetWidth;
        const containerHeight = document.getElementById('myDiagram').offsetHeight;
        const pctHeight = document.getElementsByClassName('page-container-top')[0].offsetHeight;

        const position = calculateMenuPosition(mousePt, containerWidth, containerHeight, pctHeight)

        cxElement.style.left = position.left;
        cxElement.style.top = position.top;
        cxElement.style.display = 'block';

        window.addEventListener("click", hideCX, true);
      }

      function calculateMenuPosition(mousePt, containerWidth, containerHeight, pctHeight) {
        let left = mousePt.x
        let top = mousePt.y + pctHeight

        console.log(pctHeight);


        left = left <= containerWidth - left ? left + 80 : left - 196;

        if (top < pctHeight + 80) {
          top = pctHeight + 30
        } else if (containerHeight - top < 80) {
          top = containerHeight + pctHeight - 128
        } else {
          top -= 47.5
        }

        return { left: left + 'px', top: top + 'px' };
      }

      function hideContextMenu() {
        cxElement.style.display = 'none';
        window.removeEventListener("click", hideCX, true);
      }

      // Data printing.
      myDiagramRef.current.addModelChangedListener(function (evt) {
        if (evt.isTransactionFinished) {
          const jsonModel = myDiagramRef.current.model.toJson();
          console.log('=================================================================================')
          console.log('Data storage: ' + jsonModel)
        }
      })
    }
  }, [data])

  return (
    <>
      <Stack sx={{ minWidth: '20%', maxWidth: '30%', position: 'fixed', left: '40%', top: '35px', display: 'flex', zIndex: '999' }} spacing={2}>
        {
          alertInfoList.map((item) => (
            <Alert key={item.time} severity={item.type}>{item.msg}</Alert>
          ))
        }
      </Stack>
      <img src={arrow} className='arrow-img' onClick={saveDiagramData} />
      <img src={add} className='add-img' onClick={addNewNode} />
      <div ref={diagramRef} id='myDiagram' className="bark-div flow-chart-div" />
      <div id="contextMenu">
        <div className='contextMenu-son'><img src={Edit} style={{ width: '22px', marginRight: '10px' }} />Edit</div>
        <div className='contextMenu-son'><img src={Restart} style={{ width: '25px', marginRight: '7px' }} />Restart</div>
        <div className='contextMenu-son'><img src={Complete} style={{ width: '25px', height: '25px', marginLeft: '1px', marginRight: '7px' }} />Complete</div>
      </div >
    </>
  );
}

export default TransportOrderFlowModel
