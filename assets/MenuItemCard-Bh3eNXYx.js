import{P as c,i as f,c as h,j as e,f as p}from"./index-DHNnpqaZ.js";import{b}from"./blur-7Tlgi-lI.js";const u=({dishId:l,onClick:i})=>{const{merchantId:d}=f(),{cartData:s}=h();let r="+";if((s==null?void 0:s.storeId)===d){const a=s==null?void 0:s.orderedDishes.filter(t=>t.dishId===l).reduce((t,m)=>t+m.quantity,0);a>0&&(r=a)}const n=r==="+",x=n?"bg-orange-500 text-white":" bg-slate-400 text-white ",o=n?"text-3xl":"text-xl";return e.jsx("button",{className:`${x} rounded-full w-10 h-10 flex items-center justify-center`,onClick:i,children:e.jsx("span",{className:`${o} text-center font-bold mb-1`,children:r})})};u.propTypes={dishId:c.string.isRequired,onClick:c.func.isRequired};const w=({food:l,onClick:i})=>{const{id:d,name:s,picture:r,price:n,description:x}=l,o=p(t=>t.user),a=t=>{i(l),t.stopPropagation()};return e.jsx("div",{className:"w-full cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden",onClick:()=>i(l),children:e.jsxs("div",{className:" h-[17rem] flex max-w-xl bg-white text-white",children:[e.jsx("div",{className:"w-40 flex-shrink-0 overflow-hidden aspect-auto relative",children:e.jsx(b.LazyLoadImage,{src:r,alt:s,className:"object-cover w-full h-full",effect:"blur",wrapperClassName:"object-cover w-full h-full"})}),e.jsxs("div",{className:"flex-1 min-w-0 relative w-full p-4",children:[e.jsx("h2",{className:"text-2xl font-bold mb-2 text-black truncate",children:s}),e.jsx("p",{className:"text-sm text-gray-600 mt-4 line-clamp-3 overflow-hidden break-words",children:x}),e.jsxs("div",{className:"absolute bottom-4  left-4 right-4 space-x-2 flex flex-row justify-between w-full",children:[e.jsxs("p",{className:"text-xl text-gray-800 relative content-center font-bold",children:["$",n]}),o!==void 0&&o.role==="CUSTOMER"&&e.jsx("div",{className:"pr-8 ",children:e.jsx(u,{dishId:d,onClick:a})})]})]})]})})};w.propTypes={onClick:c.func.isRequired,food:c.object.isRequired};export{w as default};
