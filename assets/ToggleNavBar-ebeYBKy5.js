import{t as v,P as i,r as c,j as n}from"./index-CFrlWo3n.js";const b=v(s=>({activeTab:"",setActiveTab:l=>s({activeTab:l})})),h=({options:s,width:l="w-full",height:d="50px",InitActiveTab:o})=>{const{activeTab:a,setActiveTab:r}=b();c.useEffect(()=>{o&&r(o)},[o,r]);const e=Object.keys(s);c.useEffect(()=>{!a&&e.length>0&&(r(e[0]),s[e[0]]())},[a,e,s,r]);const u=e.findIndex(t=>t===a),x=100/e.length;return n.jsx("div",{className:`relative border border-gray-300 rounded-2xl p-1 ${l}`,style:{height:d},children:n.jsxs("div",{className:"relative w-full h-full flex overflow-hidden rounded-xl",children:[n.jsx("div",{className:"absolute h-full bg-orange-500 transition-transform duration-300 ease-in-out rounded-xl",style:{width:`${x}%`,transform:`translateX(${u*100}%)`}}),e.map(t=>{const f=t===a;return n.jsx("button",{onClick:()=>{r(t),s[t]()},className:`
                                relative flex-1 text-center text-lg font-bold 
                                transition-colors duration-300 ease-in-out z-10
                                ${f?"text-white":"text-black"}
                            `,children:t},t)})]})})};h.propTypes={width:i.string,height:i.string,options:i.object.isRequired,InitActiveTab:i.string};export{h as T};
