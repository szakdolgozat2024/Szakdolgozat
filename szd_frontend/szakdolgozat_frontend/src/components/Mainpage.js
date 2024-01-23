import Navbar from "./navbar";
import sideComponent from "./sideComponent";
import SideMenu from "./sideMenu";

export default function Mainpage(props) {
    return(
        <main>
            <Navbar></Navbar>
            <SideMenu></SideMenu>
        </main>
        
    )
}