import React from "react";
import {NavItem} from "../components";
export default {title:"UI-kit/NavItem",component:NavItem,tags:["autodocs"]};
export const Default = {render:()=> <div className="sb-nav"><NavItem icon="tasks" label="Завдання"/></div>};
export const Active = {render:()=> <div className="sb-nav"><NavItem icon="home" label="Огляд" active/></div>};
export const WithCount = {render:()=> <div className="sb-nav"><NavItem icon="tasks" label="Завдання" count={8}/></div>};
export const AllStates = {render:()=> <div className="sb-nav"><NavItem icon="home" label="Огляд" active/><NavItem icon="tasks" label="Завдання" count={8}/><NavItem icon="calendar" label="Календар"/><NavItem icon="settings" label="Налаштування"/></div>};
