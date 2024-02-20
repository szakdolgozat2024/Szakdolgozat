import SideMenu from "../components/sideMenu";
import ProductContainer from "../components/productContainer";
import "./mainpage.css"

export default function MainPage(props) {
    return (
        <main className="text-center">
            <div className="mainContent container mx-auto mt-20 p-80">
                <div className="row w-100">
                    <SideMenu btsCol="col-2"></SideMenu>
                    <ProductContainer btsCol="col-9"></ProductContainer>
                </div>
            </div>
        </main>

    )
}