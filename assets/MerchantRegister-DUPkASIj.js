import{P as s,j as e,r as d}from"./index-CFrlWo3n.js";import{T as y}from"./TitleText-D72G80oo.js";s.arrayOf(s.string).isRequired,s.objectOf(s.oneOfType([s.string,s.object])).isRequired,s.number.isRequired,s.func.isRequired,s.func.isRequired;const p=()=>{const r=[];for(let t=0;t<24;t++){const n=t.toString().padStart(2,"0");r.push(e.jsx("option",{value:`${n}:00`,children:`${n}:00`},`${t}:00`)),r.push(e.jsx("option",{value:`${n}:30`,children:`${n}:30`},`${t}:30`))}return r},f=({value:r,onChange:t,label:n})=>e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-sm font-medium text-gray-600",children:n}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"開始時間"}),e.jsxs("select",{value:r.start||"",onChange:a=>t("start",a.target.value),className:`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     text-gray-700 bg-white text-sm`,children:[e.jsx("option",{value:"",children:"選擇時間"}),p()]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs text-gray-500 mb-1",children:"結束時間"}),e.jsxs("select",{value:r.end||"",onChange:a=>t("end",a.target.value),className:`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     text-gray-700 bg-white text-sm`,children:[e.jsx("option",{value:"",children:"選擇時間"}),p()]})]})]})]});f.propTypes={value:s.oneOfType([s.object,s.number]),onChange:s.func.isRequired,label:s.string};const g=({businessHours:r,onUpdate:t})=>{const n=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],a=["午段","晚段"],h=(o,l,i,c)=>{const m=r.map((u,b)=>b===o?u.map((x,j)=>j===l?{...x,[i]:c}:x):u);t(m)};return e.jsxs("div",{className:"w-full flex flex-col mx-auto p-6 bg-white rounded-lg font-notoTC",children:[e.jsx("h2",{className:"text-2xl font-bold mb-6 text-gray-800",children:"營業時間設定"}),e.jsx("div",{className:"space-y-4",children:n.map((o,l)=>e.jsxs("div",{className:"p-4 bg-gray-50 rounded-lg",children:[e.jsx("div",{className:"font-medium text-gray-700 mb-4",children:o}),e.jsx("div",{className:"space-y-4",children:a.map((i,c)=>e.jsx(f,{label:i,value:r[l][c],onChange:(m,u)=>h(l,c,m,u)},i))})]},o))})]})};g.propTypes={businessHours:s.array.isRequired,onUpdate:s.func.isRequired};const T=()=>{const r="商家資訊設定",t="";d.useState(0),d.useState({email:"",code:"",uploadImage:"",phoneNumber:"",address:""}),d.useState("");const[n,a]=d.useState(Array(7).fill().map(()=>Array(2).fill().map(()=>({start:"",end:""}))));return console.debug("businessHours",n),e.jsxs("div",{className:"flex flex-col items-center justify-start mt-[4rem] min-h-[50vh] font-notoTC",children:[e.jsx(y,{titleData:[r,t]}),e.jsx(g,{businessHours:n,onUpdate:a})]})};export{T as default};
