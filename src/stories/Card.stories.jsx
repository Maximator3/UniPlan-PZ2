import React from "react";
import {Card,Button} from "../components";
export default {title:"UI-kit/Card",component:Card,tags:["autodocs"]};
export const Default = {render:()=> <div className="sb-canvas"><Card className="panel"><h3>Майбутні дедлайни</h3><p>Структурована картка з контентом.</p></Card></div>};
export const WithAction = {render:()=> <div className="sb-canvas"><Card className="panel"><h3>Завдання</h3><p>Перегляньте роботи за поточний тиждень.</p><Button size="sm">Відкрити</Button></Card></div>};
