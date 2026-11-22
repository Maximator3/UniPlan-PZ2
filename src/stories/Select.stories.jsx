import React from "react";
import { Select } from "../components";
export default { title:"UI-kit/Select",component:Select,tags:["autodocs"] };
export const Default = {render:()=> <Select label="Предмет"><option>Програмування</option><option>Математика</option></Select>};
export const Required = {render:()=> <Select label="Предмет" required><option value="">Оберіть</option><option>Програмування</option></Select>};
export const Disabled = {render:()=> <Select label="Предмет" disabled><option>Недоступно</option></Select>};
