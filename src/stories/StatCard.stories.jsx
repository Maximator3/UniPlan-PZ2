import React from "react";
import {StatCard} from "../components";
export default {title:"UI-kit/StatCard",component:StatCard,tags:["autodocs"]};
export const Default = {render:()=> <div className="sb-stat"><StatCard icon="tasks" label="Усі завдання" value={12} accent="blue" subtitle="Поточний семестр"/></div>};
export const Warning = {render:()=> <div className="sb-stat"><StatCard icon="warning" label="Прострочені" value={2} accent="orange"/></div>};
export const Success = {render:()=> <div className="sb-stat"><StatCard icon="check" label="Виконані" value={10} accent="green"/></div>};
