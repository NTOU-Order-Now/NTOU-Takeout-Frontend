const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MenuInfo-CM3VFDps.js","assets/index-CUvlouwC.js","assets/index-DKTy8-Kk.css"])))=>i.map(i=>d[i]);
import{r,_ as p,d as u,j as e,F as s,J as h,al as j,am as b,L as N,o as v,P as g}from"./index-CUvlouwC.js";import{b as w}from"./blur-CmPELEyu.js";const y=r.lazy(()=>p(()=>import("./MenuInfo-CM3VFDps.js"),__vite__mapDeps([0,1,2]))),I=({merchantData:t})=>{const{name:a,distance:n=10,averageSpend:o,rating:i,picture:c,id:x}=t,d=x,[m,l]=r.useState(!1),f=u();return e.jsxs("div",{children:[e.jsxs("div",{className:"relative h-56 z-0",children:[e.jsx(w.LazyLoadImage,{src:c,alt:a,className:"absolute inset-0 w-full h-full object-cover z-0",effect:"blur",wrapperClassName:"absolute inset-0 z"}),e.jsx("button",{className:"pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full",onClick:()=>f(-1),children:e.jsx(s,{icon:h,className:"text-slate-800"})}),e.jsx("div",{className:"pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full",children:e.jsx(s,{icon:j,className:"text-slate-800"})})]}),e.jsx("div",{className:"relative z-10 bg-white rounded-t-2xl px-4 pt-4 -mt-8 font-notoTC",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex flex-col bg-green",children:[e.jsx("h2",{className:"text-xl font-bold mb-5",children:a}),e.jsxs("p",{className:"text-gray-400 text-sm",children:["距離您約",n,"公里"]}),e.jsxs("p",{className:"text-green-600 text-sm mt-1",children:["平均花費約",Math.floor(o),"元"]})]}),e.jsxs("div",{className:"flex flex-col items-end",children:[e.jsx("div",{className:"text-xl text-gray-500 mb-5",children:e.jsx(s,{icon:b,onClick:()=>l(!0),className:"cursor-pointer"})}),e.jsxs(N,{to:`/menu/${d}/review`,children:[e.jsxs("div",{className:"flex flex-row items-center justify-end",children:[e.jsx(s,{icon:v,size:"xs",className:"text-yellow-400"}),e.jsxs("span",{className:"font-semibold text-xs",children:[" ",i.toFixed(1)]})]}),e.jsx("span",{className:"text-gray-400 ml-1  underline text-xs",children:"查看評論"})]})]})]})}),m&&e.jsx(y,{merchantData:t,onClose:()=>l(!1)})]})};I.propTypes={merchantData:g.object};export{I as default};
