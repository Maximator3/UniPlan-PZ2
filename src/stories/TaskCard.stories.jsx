import React from "react";
import {TaskCard} from "../components";
import {sampleTask,sampleSubject,action} from "./_helpers";
export default {title:"UI-kit/TaskCard",component:TaskCard,tags:["autodocs"]};
export const Default = {render:()=> <div className="sb-canvas"><TaskCard task={sampleTask} subject={sampleSubject} onToggle={action("toggle")} onOpen={action("open")}/></div>};
export const Completed = {render:()=> <div className="sb-canvas"><TaskCard task={{...sampleTask,status:"done"}} subject={sampleSubject}/></div>};
export const Compact = {render:()=> <div className="sb-canvas"><TaskCard task={sampleTask} subject={sampleSubject} compact/></div>};
