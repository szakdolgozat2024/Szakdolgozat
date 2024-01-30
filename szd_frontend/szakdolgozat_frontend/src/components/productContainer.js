import Product from "./product"
import "./productContainer.css"

export default function ProductContainer(props) {
    return(
        <div className={props.btsCol+" productContainer"}>
        <div className="row">
            <Product bgImg="https://backend.orbitvu.com/sites/default/files/image/cover-FURNITURE-studio%20%281%29_0.jpg" btsCol="col-4"></Product>
            <Product bgImg="https://www.archiproducts.com/images/sharingimage/1390.jpg" btsCol="col-8"></Product>
        </div>
        <div className="row">
            <Product bgImg="https://i0.wp.com/d2s30hray1l0uq.cloudfront.net/frontend/Prepare-your-furniture.jpg?fit=1024%2C512&ssl=1" btsCol="col-8"></Product>
            <Product bgImg="https://i.ytimg.com/vi/_BfUgCN7TYk/maxresdefault.jpg" btsCol="col-4"></Product>
        </div>
    </div>
    )
}