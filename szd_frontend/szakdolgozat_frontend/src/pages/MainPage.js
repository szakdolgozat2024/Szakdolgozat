import SideMenu from "../components/sideMenu";
import ProductContainer from "../components/productContainer";
import "./mainpage.css"

export default function MainPage(props) {
    return (
        <main className="text-center">
            <div className="mainContent mx-auto mt-20 p-80">
                <div className="row content">
                    <SideMenu btsCol="col-1"></SideMenu>
                    <ProductContainer btsCol="col-11"></ProductContainer>
                </div>
            </div>
        </main>

    )
}