const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NavbarSkeleton-C3yqNMtV.js","assets/index-BVyBSOmJ.js","assets/index-AsxfWBjN.css","assets/MenuHeaderSkeleton-Dv7jEe9O.js","assets/ViewCartButtonSkeleton-CXPMfvUC.js","assets/MenuSectionSkeleton-B2q8qJou.js","assets/MenuHeader-BSVKGtEx.js","assets/index.es-BJrB9fUl.js","assets/index-CuE17EBt.js","assets/blur-DLlne5MJ.js","assets/blur-DOfe2hmq.css","assets/MenuNavbar-Dp-IxwLJ.js","assets/useCategoryQueries-CaKsata1.js","assets/merchantStore-CZdUOu35.js","assets/react-CxkCoJ2v.js","assets/MenuSection-BpmNEWOv.js","assets/ViewCartButton-DS5k2-Vn.js"])))=>i.map(i=>d[i]);
import{r as e,_ as n,f as M,m as b,j as s,M as j,g as y}from"./index-BVyBSOmJ.js";import"./index.es-BJrB9fUl.js";import{u as P}from"./useCategoryQueries-CaKsata1.js";import{u as D}from"./merchantStore-CZdUOu35.js";import{c as g}from"./react-CxkCoJ2v.js";const w=g(a=>({navbarItems:["套餐","主食","甜點"],nowPage:0,setNowPage:o=>a({nowPage:o}),setNavbarItems:o=>a({navbarItems:o})})),L=e.lazy(()=>n(()=>import("./NavbarSkeleton-C3yqNMtV.js"),__vite__mapDeps([0,1,2]))),N=e.lazy(()=>n(()=>import("./MenuHeaderSkeleton-Dv7jEe9O.js"),__vite__mapDeps([3,1,2]))),R=e.lazy(()=>n(()=>import("./ViewCartButtonSkeleton-CXPMfvUC.js"),__vite__mapDeps([4,1,2]))),V=e.lazy(()=>n(()=>import("./MenuSectionSkeleton-B2q8qJou.js"),__vite__mapDeps([5,1,2]))),k=e.lazy(()=>n(()=>import("./MenuHeader-BSVKGtEx.js"),__vite__mapDeps([6,1,2,7,8,9,10]))),O=e.lazy(()=>n(()=>import("./MenuNavbar-Dp-IxwLJ.js"),__vite__mapDeps([11,1,2,7,12,13,14]))),T=e.lazy(()=>n(()=>import("./MenuSection-BpmNEWOv.js"),__vite__mapDeps([15,1,2]))),z=e.lazy(()=>n(()=>import("./ViewCartButton-DS5k2-Vn.js"),__vite__mapDeps([16,1,2,7,8])));function A(){const{merchantId:a}=M(),o=e.useRef([]),[v,S]=e.useState(!1),i=w(t=>t.setNavbarItems),p=t=>{var c;(c=o.current[t])==null||c.scrollIntoView({behavior:"smooth",inline:"start"})};e.useEffect(()=>{const t=()=>{const c=window.scrollY;S(c>260)};return window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}},[]);const u=D(t=>t.getMerchantById),[E,_]=e.useState(null),[d,m]=e.useState(null);e.useEffect(()=>{const t=u(a);t?(m(t),_(t.menuId)):(async()=>{var h;try{const l=await y.getMerchantsByIdList([a]);m(l.data[0]),_(((h=l.data[0])==null?void 0:h.menuId)||null)}catch(l){console.error("Failed to fetch merchant data:",l)}})()},[a,u]);const r=b(E),{categoryData:I}=P(r,a),[f,x]=e.useState(null);return e.useEffect(()=>{r!=null&&r.length&&i(r.map(t=>t.first))},[r,i]),a&&!d?s.jsx(j,{}):s.jsxs("div",{children:[s.jsx(e.Suspense,{fallback:s.jsx(N,{}),children:s.jsx(k,{merchantData:d})}),s.jsx(e.Suspense,{fallback:s.jsx(L,{isNavbarFixed:!1}),children:s.jsx(O,{onNavClick:p,isNavbarFixed:v})}),s.jsx(e.Suspense,{fallback:s.jsx(V,{}),children:s.jsx(T,{selectedDish:f,setSelectedDish:x,sectionRefs:o,categoryData:I})}),f==null&&s.jsx(e.Suspense,{fallback:s.jsx(R,{}),children:s.jsx(z,{})})]})}const Y=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"}));export{Y as M,w as u};
