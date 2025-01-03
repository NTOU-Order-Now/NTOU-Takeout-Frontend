import{e as p,r as u,u as g,G as v,j as s,P as d}from"./index-CLSTvJUF.js";import{u as C}from"./MenuSection-BApvS259.js";import"./useMutation-CPuWTMdd.js";import"./skeleton-DFQqrOiN.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=p("Pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=p("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]),N=({categoryName:t,menuId:c})=>{const[r,n]=u.useState(!1),[a,o]=u.useState(t||"未命名類別"),{changeCategoryName:y}=C(c),m=g().getQueryData(["menuCategoryList",c]);u.useEffect(()=>{o(t||"未命名類別")},[t]);const{toast:f}=v(),i=async e=>{if(e.preventDefault(),e.stopPropagation(),m.find(l=>l.categoryName===a)){f({title:"類別名稱不可重複",description:"類別名稱幣必須不重複，請重新設定",variant:"destructive"});return}if(a.trim()!==""&&a.trim()!==t)try{await y({oldCategoryName:t,newCategoryName:a.trim()})}catch(l){console.error("Failed to update category name:",l)}else a.trim()===""&&alert("不可為空");n(!1)},h=async e=>{e.key==="Enter"?await i(e):e.key==="Escape"&&(o(t||"未命名類別"),n(!1))},x=()=>{r?i():n(!0)};return s.jsxs("div",{className:"flex items-center gap-2 py-3 ",children:[r?s.jsx("input",{type:"text",value:a,onChange:e=>o(e.target.value),onBlur:i,onKeyDown:h,className:"border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none text-2xl font-bold px-1 bg-transparent h-10 w-full",autoFocus:!0}):s.jsx("h2",{className:"text-2xl font-bold h-10 flex items-center px-1",children:t||"未命名類別"}),s.jsx("button",{onClick:x,className:"p-2 hover:bg-gray-100 rounded-full transition-colors right-3 relative",title:r?"儲存":"編輯",children:r?s.jsx(w,{className:"w-5 h-5 text-blue-600"}):s.jsx(b,{className:"w-5 h-5 text-gray-600"})})]})};N.propTypes={categoryName:d.string.isRequired,menuId:d.string.isRequired};export{N as default};
