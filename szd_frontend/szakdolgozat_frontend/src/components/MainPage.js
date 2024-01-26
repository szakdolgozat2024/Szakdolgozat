import Navbar from "./Navbar";
import sideComponent from "./SideComponent";
import SideMenu from "./SideMenu";

export default function MainPage(props) {
    return(
        <main>
            <Navbar></Navbar>
            <SideMenu></SideMenu>
        </main>
        
    )
}