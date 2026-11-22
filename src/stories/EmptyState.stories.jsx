import React from "react";
import {EmptyState,Button} from "../components";
export default {title:"UI-kit/EmptyState",component:EmptyState,tags:["autodocs"]};
export const EmptyTasks = {render:()=> <div className="sb-canvas"><EmptyState title="Завдань поки немає" description="Додайте перше завдання, щоб розпочати планування." action={<Button size="sm">Додати</Button>}/></div>};
export const FilterNoResults = {render:()=> <div className="sb-canvas"><EmptyState icon="search" title="Нічого не знайдено" description="Спробуйте скинути фільтри" /></div>};
