import SideMenuComponent from "./sideMenuComponent"
import "./sidemenu.css";

export default function SideMenu(props) {
    return(
        <div className={props.btsCol+" sideMenu"}>
            <SideMenuComponent icon="https://img.icons8.com/sf-black/128/table.png"></SideMenuComponent>
            <SideMenuComponent icon="https://img.icons8.com/sf-black/128/living-room.png"></SideMenuComponent>
            <SideMenuComponent icon="https://img.icons8.com/sf-black/128/light.png"></SideMenuComponent>
            <SideMenuComponent icon="https://img.icons8.com/sf-black/128/wardrobe.png"></SideMenuComponent>
        </div>
    )
}