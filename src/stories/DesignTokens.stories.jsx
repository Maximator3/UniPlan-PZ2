import React from "react";
export default {title:"Design system/Tokens",tags:["autodocs"]};
const tokens = [["Primary","#626de9"],["Secondary","#1aa8a0"],["Neutral / canvas","#f6f8fc"],["Neutral / surface","#ffffff"],["Text","#20263b"],["Success","#189c78"],["Warning","#d99630"],["Error","#df6576"]];
export const Colors = {render:()=> <div className="sb-token-row">{tokens.map(([name,color])=><div key={name} className="sb-token"><div className="sb-swatch" style={{background:color}}/><strong>{name}</strong><small>{color}</small></div>)}</div>};
export const Typography = {render:()=> <div className="sb-typography"><h1>H1 · UniPlan</h1><h2>H2 · Навчання</h2><h3>H3 · Дедлайни</h3><p>Body · Організуйте завдання на тиждень.</p><small>Caption · Дата і тип заняття</small></div>};
