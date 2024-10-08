import { useState, useEffect, useRef, useImperativeHandle } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Marker, Popup } from 'react-leaflet'


// function OneGoods() {
//     return (
//         <div style={{ display: 'none' }}>
//             {/* <svg id='goods-1' t="1724060724852" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35330" width="26" height="26"><path d="M42.053388 42.053388h939.893224v939.893224H42.053388z" fill="#F5CB93" p-id="35331"></path><path d="M21.026694 42.053388v939.893224a21.026694 21.026694 0 0 0 21.026694 21.026694h939.893224a21.026694 21.026694 0 0 0 21.026694-21.026694V42.053388a21.026694 21.026694 0 0 0-21.026694-21.026694H42.053388a21.026694 21.026694 0 0 0-21.026694 21.026694z m939.893224 0v939.893224a21.026694 21.026694 0 0 1 21.026694-21.026694H42.053388a21.026694 21.026694 0 0 1 21.026694 21.026694V42.053388a21.026694 21.026694 0 0 1-21.026694 21.026694h939.893224a21.026694 21.026694 0 0 1-21.026694-21.026694z" fill="#6E6E96" p-id="35332"></path><path d="M194.49692 202.907598h503.034218L194.49692 705.941815zM814.784394 823.195072H319.223064L814.784394 327.633741z" fill="#DFAC67" p-id="35333"></path><path d="M272.295688 272.295688h364.258037l69.38809-69.38809H202.907598v503.034217l69.38809-69.38809z" fill="#6E6E96" opacity=".2" p-id="35334"></path><path d="M194.49692 223.934292h503.034218a21.018283 21.018283 0 0 1-14.865873-35.892567L179.626842 691.075943a21.018283 21.018283 0 0 1 35.892567 14.865872V202.907598a21.022489 21.022489 0 0 1-21.022489 21.026694z m14.870078 496.869191L712.392805 217.777676a21.005667 21.005667 0 0 0 4.558587-22.914892 21.009873 21.009873 0 0 0-19.420254-12.977675H194.49692a21.026694 21.026694 0 0 0-21.026694 21.026694v503.034218a21.026694 21.026694 0 0 0 35.896772 14.857462z" fill="#6E6E96" p-id="35335"></path><path d="M821.088197 447.473281V325.526867L325.526867 821.088197h121.946414z" fill="#6E6E96" opacity=".2" p-id="35336"></path><path d="M814.784394 802.168378H319.223064a21.026694 21.026694 0 1 1 14.870078 35.892567l495.557125-495.557126a21.018283 21.018283 0 0 1-35.892567-14.870078V823.195072a21.026694 21.026694 0 0 1 21.026694-21.026694z m-14.865872-489.400509L304.357191 808.329199a21.018283 21.018283 0 0 0 14.870078 35.892567h495.557125a21.026694 21.026694 0 0 0 21.026694-21.026694V327.633741a21.018283 21.018283 0 0 0-35.892566-14.865872z" fill="#6E6E96" p-id="35337"></path><path d="M910.455852 37.848049v876.813142H37.848049v63.080082h939.893224V37.848049z" fill="#6E6E96" opacity=".15" p-id="35338"></path><path d="M63.080082 63.080082h847.37577v51.515401H63.080082zM63.080082 114.595483h47.310062V914.661191H63.080082z" fill="#FFFFFF" opacity=".19" p-id="35339"></path></svg> */}
//             {/* <svg id='goods-1' t="1724060724852" className="icon" viewBox="0 0 1416 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1892" width="26" height="26"><path d="M1199.66137861 1168.59917294h-969.82517608c-66.84866958 0-121.22812154-54.37945156-121.22812063-121.22812053v-1039.09844957c0-66.84866958 54.37945156-121.22812154 121.22812063-121.22812045h969.82517608c66.84866958 0 121.22812154 54.37945156 121.22822726 121.22812045v1039.09844957c0 66.84866958-54.37945156 121.22812154-121.22822726 121.22812053z" fill="#00B050" p-id="1893" data-spm-anchor-id="a313x.icontype_uploads.0.i7.2fea3a81inolpa" class="selected"></path><path d="M229.83620253-95.63720055c-57.28891068 0-103.90980305 46.62089157-103.90980267 103.90980339v1039.09844957c0 57.28891068 46.62089157 103.90980305 103.90980267 103.90980387h969.82517608c57.28891068 0 103.90980305-46.62089157 103.90990826-103.90980387v-1039.09844957c0-57.28891068-46.62089157-103.90980305-103.90990826-103.90980339h-969.82517608m0-34.63663451h969.82517608a138.54643801 138.54643801 0 0 1 138.54654293 138.5464379v1039.09844957a138.54643801 138.54643801 0 0 1-138.54654293 138.54644h-969.82517608a138.54643801 138.54643801 0 0 1-138.54644017-138.54644v-1039.09844957a138.54643801 138.54643801 0 0 1 138.54644017-138.5464379z" fill="#FFFFFF" p-id="1894"></path><path d="M995.23609125 493.11597129v-310.34405658l-11.91493127-43.78075638-59.78283896-69.9658965h-503.68558551l-56.18064812 69.9658965v345.05001777l13.85467519 21.68245493z" fill="#FFC400" p-id="1895"></path><path d="M927.00196453 69.02526183a42.25665137 42.25665137 0 0 1 33.32050314 17.11044743l58.32805699 75.16141301v315.53957311a48.07556973 48.07556973 0 0 1-44.54270691 50.98513408h-588.26820992a48.07556973 48.07556973 0 0 1-44.54270556-50.98513408v-315.53957311l58.32805911-75.16141301a42.25665137 42.25665137 0 0 1 33.32039776-17.11044743z m47.10585322 152.95529724h-588.19898829v254.92546083h588.26821066z m-44.54270633 127.4626791v50.98513438h-499.18289986v-50.98513438z m-2.56314689-229.43294549h-494.05660539l-39.55506117 50.98513331h573.16672574z" fill="#231815" p-id="1896"></path></svg> */}

//             <svg xmlns="http://www.w3.org/2000/svg" id='goods-1' width="26" height="26" viewBox="0 0 58.543 61.795" >
//                 <g id="dected_has_load_" transform="translate(-1964.271 -1135)">
//                     <g id="a" transform="translate(1964.271 1135)" fill="#00b050">
//                         <path d="M 52.03819274902344 61.54535675048828 L 6.504774570465088 61.54535675048828 C 3.05588436126709 61.54535675048828 0.250004380941391 58.73947525024414 0.250004380941391 55.29058456420898 L 0.250004380941391 6.504776477813721 C 0.250004380941391 3.055876493453979 3.05588436126709 0.2499964684247971 6.504774570465088 0.2499964684247971 L 52.03819274902344 0.2499964684247971 C 55.48709487915039 0.2499964684247971 58.29297256469727 3.055876493453979 58.29297256469727 6.504776477813721 L 58.29297256469727 55.29058456420898 C 58.29297256469727 58.73947525024414 55.48709487915039 61.54535675048828 52.03819274902344 61.54535675048828 Z" stroke="none" />
//                         <path d="M 6.504776000976562 0.4999961853027344 C 3.1937255859375 0.4999961853027344 0.4999961853027344 3.1937255859375 0.4999961853027344 6.504768371582031 L 0.4999961853027344 55.29057693481445 C 0.4999961853027344 58.60162734985352 3.1937255859375 61.29535675048828 6.504776000976562 61.29535675048828 L 52.03819274902344 61.29535675048828 C 55.34923553466797 61.29535675048828 58.04296493530273 58.60162734985352 58.04296493530273 55.29057693481445 L 58.04296493530273 6.504768371582031 C 58.04296493530273 3.1937255859375 55.34923553466797 0.4999961853027344 52.03819274902344 0.4999961853027344 L 6.504776000976562 0.4999961853027344 M 6.504776000976562 -3.814697265625e-06 L 52.03819274902344 -3.814697265625e-06 C 55.63068389892578 -3.814697265625e-06 58.54296493530273 2.912284851074219 58.54296493530273 6.504768371582031 L 58.54296493530273 55.29057693481445 C 58.54296493530273 58.8830680847168 55.63068389892578 61.79535675048828 52.03819274902344 61.79535675048828 L 6.504776000976562 61.79535675048828 C 2.912284851074219 61.79535675048828 -3.814697265625e-06 58.8830680847168 -3.814697265625e-06 55.29057693481445 L -3.814697265625e-06 6.504768371582031 C -3.814697265625e-06 2.912284851074219 2.912284851074219 -3.814697265625e-06 6.504776000976562 -3.814697265625e-06 Z" stroke="none" fill="#fff" />
//                     </g>
//                     <g id="a-2" data-name="a" transform="translate(1976.011 1144.357)">
//                         <path id="a-3" data-name="a" d="M-21715.98-6753.141v-14.572l-.555-2.055-2.812-3.285H-21743l-2.633,3.285v16.2l.648,1.018Z" transform="translate(21746.678 6773.053)" fill="#ffc400" />
//                         <path id="a-4" data-name="a" d="M153.5,128a1.985,1.985,0,0,1,1.563.8l2.739,3.527v14.816a2.257,2.257,0,0,1-2.09,2.393H128.09a2.257,2.257,0,0,1-2.09-2.393V132.332l2.739-3.527a1.986,1.986,0,0,1,1.563-.8Zm2.211,7.18H128.09v11.968h27.618Zm-2.09,5.983v2.395H130.181v-2.395Zm-.121-10.77H130.3l-1.858,2.393h26.91Z" transform="translate(-126 -128)" fill="#231815" />
//                     </g>
//                 </g>
//             </svg>

//         </div>
//     )
// }

function Goods({ goodsRef }) {

    const list = useRef(
        [
            // { key: 0, name: 'SKU 4', min: 0, max: 180, attr: 'x', id: 'a-46', interval: null, intervalTime: 200, cid: 'sku4_14750' },
            // { key: 1, name: 'SKU 3', min: 0, max: 180, attr: 'x', id: 'a-34', interval: null, intervalTime: 300, cid: 'sku3_14750' },
            // { key: 2, name: 'SKU 2', min: 0, max: 180, attr: 'x', id: 'a-24', interval: null, intervalTime: 500, cid: 'sku2_14750' },
            // { key: 3, name: 'SKU 1', min: 0, max: 180, attr: 'x', id: 'a-14', interval: null, intervalTime: 400, cid: 'sku1_14750' },
            // { key: 4, min: 0, max: 730, attr: 'x', id: 'a-261', interval: null, intervalTime: 100 },

            { key: 0, name: 'SKU 4', min: 0, max: 180, attr: 'x', id: 'a-46', interval: null, intervalTime: 200, sid: 'sku4_14750' },
            { key: 1, name: 'SKU 3', min: 0, max: 180, attr: 'x', id: 'a-34', interval: null, intervalTime: 300, sid: 'sku3_14750' },
            { key: 2, name: 'SKU 2', min: 0, max: 180, attr: 'x', id: 'a-24', interval: null, intervalTime: 500, sid: 'sku2_14750' },
            { key: 3, name: 'SKU 1', min: 0, max: 180, attr: 'x', id: 'a-14', interval: null, intervalTime: 400, sid: 'sku1_14750' },
        ]
    )


    useEffect(() => {
        // const existingSvgElement = document.getElementById('goods-1');

        list.current.forEach((item, index) => {
            // const newSvgElement = existingSvgElement.cloneNode(true)

            // let id = "goods-1-" + index
            // newSvgElement.id = id
            // const container = document.getElementById(item.id)

            // if (!document.getElementById(id)) {
            //     container.append(newSvgElement);
            // }
            // item.cid = id
            item.transform = document.getElementById(item.sid).getAttribute("transform")
            // item.interval = setInterval(() => {
            //     if (item.min > item.max) {
            //         item.min = 0
            //     }

            //     item.min += 5
            //     document.getElementById(id).setAttribute(item.attr, item.min)
            // }, item.intervalTime);
        })



        return () => {
            // list.current.forEach((item, index) => {
            //     const container = document.getElementById("goods-1-" + index)
            //     document.getElementById(item.id).removeChild(container)
            // })
            list.current.forEach((item, index) => {
                clearInterval(item.interval)
                item.interval = null
            })
        }
    }, [])

    function stopAndStartGood(name, type) {
        let item = list.current.find((e) => e.name === name);
        console.log('item', item)
        if (!item) return;
        if (type) {
            console.log('open')
            // start
            // let item = good;
            if (!item.interval) {
                item.interval = setInterval(() => {
                    if (item.min > item.max) {
                        item.min = 0
                    }
                    item.min += 5


                    const match = item.transform.match(/translate\(([^,]+),([^\)]+)\)/);
                    if (match) {
                        let x = match[1]
                        let y = match[2]
                        y = Number(y) - item.min
                        document.getElementById(item.sid).setAttribute("transform", `translate(${x}, ${y})`)
                    }
                    // document.getElementById(item.cid).setAttribute(item.attr, item.min)


                }, item.intervalTime);
            }
        } else {
            clearInterval(item.interval)
            item.interval = null;
        }
        // console.log('list.current',list.current)
    }

    useImperativeHandle(goodsRef, () => {
        return {
            stopAndStartGood
        };
    });

    return (
        <>
            {/* {ReactDOM.createPortal(<OneGoods />, document.getElementById('root'))} */}
        </>
    )
}

export default Goods