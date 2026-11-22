import React from "react";
import {Modal,Input,Button} from "../components";
export default {title:"UI-kit/Modal",component:Modal,tags:["autodocs"], parameters:{layout:"fullscreen"}};
export const Default = {render:()=> <div className="sb-modal-wrap"><Modal title="Новий предмет" onClose={()=>{}}><div className="sb-stack"><Input label="Назва предмета" placeholder="Математика" required/><div className="sb-row"><Button>Зберегти</Button><Button variant="secondary">Скасувати</Button></div></div></Modal></div>};
