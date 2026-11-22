import React from "react";
import {Badge} from "../components";
export default {title:"UI-kit/Badge",component:Badge,tags:["autodocs"]};
export const Neutral = {args:{tone:"neutral",children:"Заплановано"}};
export const Success = {args:{tone:"success",children:"Виконано",dot:true}};
export const Warning = {args:{tone:"warning",children:"Наближається"}};
export const Error = {args:{tone:"danger",children:"Прострочено"}};
export const AllStates = {render:()=> <div className="sb-row"><Badge>Заплановано</Badge><Badge tone="success">Виконано</Badge><Badge tone="warning">Увага</Badge><Badge tone="danger">Прострочено</Badge></div>};
