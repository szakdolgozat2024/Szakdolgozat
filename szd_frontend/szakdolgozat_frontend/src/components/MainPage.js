import Navbar from "./navbar";
import SideMenu from "./sideMenu";
import ProductContainer from "./productContainer";
import "./mainpage.css"

export default function MainPage(props) {
    return (
        <main className="text-center">
            <Navbar></Navbar>
            <div className="container mx-auto mt-20 p-80">
                <div className="row w-100">
                    <SideMenu btsCol="col-2"></SideMenu>
                    <ProductContainer btsCol="col-9"></ProductContainer>
                </div>
            </div>
        </main>

    )
}