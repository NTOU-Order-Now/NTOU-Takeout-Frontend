const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/NavbarSkeleton-B0WWhUCl.js","assets/index-CyAD4SC6.js","assets/index-CI52zhfH.css","assets/MenuHeaderSkeleton-MdDZ3-wE.js","assets/ViewCartButtonSkeleton-BfaRzwLg.js","assets/MenuSectionSkeleton-ChvrFkrA.js","assets/MenuHeader-B9E9IcVE.js","assets/index-BizVPR2g.js","assets/blur-Bkh8Omqi.js","assets/blur-DOfe2hmq.css","assets/MenuNavbar-DKr5pOFA.js","assets/merchantMenuNav-C9ERtoo3.js","assets/MenuSection-CoRpWuEm.js","assets/ViewCartButton-BmpWCyse.js"])))=>i.map(i=>d[i]);
import{r as e,_ as n,h as f,i as p,o as S,j as s,M as j}from"./index-CyAD4SC6.js";import{u as y}from"./useCategoryQueries-BP5Fs9kE.js";import{u as I}from"./merchantMenuNav-C9ERtoo3.js";const h=e.lazy(()=>n(()=>import("./NavbarSkeleton-B0WWhUCl.js"),__vite__mapDeps([0,1,2]))),L=e.lazy(()=>n(()=>import("./MenuHeaderSkeleton-MdDZ3-wE.js"),__vite__mapDeps([3,1,2]))),b=e.lazy(()=>n(()=>import("./ViewCartButtonSkeleton-BfaRzwLg.js"),__vite__mapDeps([4,1,2]))),P=e.lazy(()=>n(()=>import("./MenuSectionSkeleton-ChvrFkrA.js"),__vite__mapDeps([5,1,2]))),N=e.lazy(()=>n(()=>import("./MenuHeader-B9E9IcVE.js"),__vite__mapDeps([6,1,2,7,8,9]))),R=e.lazy(()=>n(()=>import("./MenuNavbar-DKr5pOFA.js"),__vite__mapDeps([10,1,2,11]))),V=e.lazy(()=>n(()=>import("./MenuSection-CoRpWuEm.js"),__vite__mapDeps([12,1,2]))),k=e.lazy(()=>n(()=>import("./ViewCartButton-BmpWCyse.js"),__vite__mapDeps([13,1,2,7])));function M(){const{merchantId:u}=f(),i=e.useRef([]),[_,d]=e.useState(!1),l=I(o=>o.setNavbarItems),{storeData:t,isLoading:m,isError:w}=p([u]),{menuCategoryList:a}=S(t==null?void 0:t[0].menuId),{categoryData:v}=y(a,t==null?void 0:t[0].menuId),[c,x]=e.useState(null),E=o=>{var r;(r=i.current[o])==null||r.scrollIntoView({behavior:"smooth",inline:"start"})};return e.useEffect(()=>{const o=()=>{const r=window.scrollY;d(r>260)};return window.addEventListener("scroll",o),()=>{window.removeEventListener("scroll",o)}},[]),e.useEffect(()=>{l(a.map(o=>o.categoryName))},[a,l]),m&&!t?s.jsx(j,{}):s.jsxs("div",{className:"flex flex-col ",children:[s.jsx(e.Suspense,{fallback:s.jsx(L,{}),children:s.jsx(N,{merchantData:t==null?void 0:t[0]})}),s.jsx(e.Suspense,{fallback:s.jsx(h,{isNavbarFixed:!1}),children:s.jsx(R,{onNavClick:E,isNavbarFixed:_})}),s.jsx(e.Suspense,{fallback:s.jsx(P,{}),children:s.jsx(V,{selectedDish:c,setSelectedDish:x,sectionRefs:i,categoryData:v})}),c==null&&s.jsx(e.Suspense,{fallback:s.jsx(b,{}),children:s.jsx(k,{})})]})}export{M as default};
