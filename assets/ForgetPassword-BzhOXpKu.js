import{r as u,d as g,j as s}from"./index-02U8PvSB.js";import{F as r}from"./FormPage-DPzexWCL.js";function T(){console.debug("ForgetPassword");const[e,n]=u.useState(0),o=["輸入 Email","請輸入驗證碼","密碼重設","完成"],a=["請提供您的電子郵件以重設密碼","驗證碼已寄出，請至您的電子信箱查收。","請提供您的新密碼","密碼重設完成，請用新密碼登入。"],i=[{email:"email"},{token:"驗證碼"},{newPassword:"新密碼",confirmPassword:"再次輸入新密碼"}],l=["查無此信箱或信箱錯誤","驗證碼不符合格式","密碼不一致或不符合格式"],d=g(),c=t=>{console.debug("handleOfferEmail: ",t),n(e+1)},m=t=>{console.debug("Verify payload: ",t),n(e+1)},x=t=>{console.debug("Reset password payload: ",t),n(e+1)},f=()=>{console.debug("Finish"),d("/auth/login")};return s.jsxs("div",{className:"flex flex-col items-center justify-start mt-[4rem] font-notoTC",children:[e===0&&s.jsx(r,{titleText:o[e],description:a[e],formData:i[e],errorMessageText:l[e],handleSubmit:c}),e===1&&s.jsx(r,{titleText:o[e],description:a[e],formData:i[e],errorMessageText:l[e],handleSubmit:m}),e===2&&s.jsx(r,{titleText:o[e],description:a[e],formData:i[e],errorMessageText:l[e],handleSubmit:x}),e===3&&s.jsx(r,{titleText:o[e],description:a[e],continueBtnText:"回登入頁",handleSubmit:f})]})}export{T as default};
