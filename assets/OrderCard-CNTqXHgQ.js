const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfirmDialog-Di1Pnt0d.js","assets/index-DZfytaCp.js","assets/index-B5XSFTH7.css","assets/button-ByilKDDB.js","assets/dialog-DcVahHOm.js","assets/index-7HnohBcj.js","assets/orderStore-LNw9vMQw.js","assets/AcceptedList-COHE98JU.js","assets/useMutation-B1G4zAQ5.js"])))=>i.map(i=>d[i]);
import{r as i,_ as y,d as D,j as e,P as t}from"./index-DZfytaCp.js";import{u as T}from"./orderStore-LNw9vMQw.js";import{S as r}from"./AcceptedList-COHE98JU.js";import"./useMutation-B1G4zAQ5.js";const c=i.lazy(()=>y(()=>import("./ConfirmDialog-Di1Pnt0d.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),R=({order:s,showStatus:o=!0,pageId:n})=>{const m=T(a=>a.setOrderData),d=(a,x)=>{const l=new Date,[h,f,g]=a.split(":"),[j,b]=g.split("."),N=new Date(l.getFullYear(),l.getMonth(),l.getDate(),parseInt(h),parseInt(f),parseInt(j),parseInt(b)),v=new Date(N.getTime()+x*60*1e3);return new Date>v},u=D(),p=a=>{a.preventDefault(),m(s),u(`/store/pos/management/order/${s.id.slice(-5)}`)};return e.jsxs("div",{className:"relative flex justify-between rounded-lg p-4 shadow-lg mb-6 bg-gray-50",children:[e.jsxs("div",{className:"flex flex-col items-start text-start",children:[e.jsxs("p",{className:"text-xl font-bold ",children:["單號： ",s.id.slice(-5)]}),e.jsxs("p",{className:"text-sm font-semibold ",children:["預估製作時間: ",s.estimatedPrepTime," 分鐘"]}),e.jsxs("p",{className:"text-sm font-medium",children:["下單時間: ",s.orderTime]}),e.jsx("button",{className:"bg-orange-500 mt-6 text-white px-3 py-1 text-sm font-bold rounded hover:bg-orange-600",onClick:p,children:"訂單內容"})]}),e.jsxs("div",{className:"flex flex-col items-end",children:[o&&s.status!=="PENDING"&&e.jsxs("div",{className:"flex items-center mb-2",children:[d(s.orderTime,s.estimatedPrepTime)&&s.status==="PROCESSING"&&e.jsx("span",{className:"text-red-500 text-sm ml-2 font-bold pr-2",children:"超時"}),e.jsx(i.Suspense,{fallback:e.jsx(r,{className:"px-3 py-1 rounded bg-gray-300 opacity-5 w-full h-6"}),children:e.jsx(c,{order:s,status:s.status,pageId:n})})]}),s.status==="PENDING"&&e.jsxs("div",{className:"flex gap-2",children:[e.jsx(i.Suspense,{fallback:e.jsx(r,{className:"px-3 py-1 rounded bg-red-500 opacity-5 w-full h-6"}),children:e.jsx(c,{order:s,status:"REJECT",pageId:n})}),e.jsx(i.Suspense,{fallback:e.jsx(r,{className:"px-3 py-1 rounded bg-green-500 opacity-5 w-12 h-6"}),children:e.jsx(c,{order:s,status:"ACCEPT",pageId:n})})]})]}),e.jsx("div",{className:"absolute bottom-4 right-4 mt-5",children:e.jsxs("p",{className:"mt-2 font-semibold",children:["總金額: ",s.cost," 元"]})})]})};R.propTypes={order:t.shape({id:t.string.isRequired,status:t.string.isRequired,cost:t.number.isRequired,orderTime:t.string.isRequired,estimatedPrepTime:t.number.isRequired}).isRequired,onAccept:t.func,onReject:t.func,onStatusChange:t.func,showStatus:t.bool,pageId:t.number.isRequired};export{R as default};
