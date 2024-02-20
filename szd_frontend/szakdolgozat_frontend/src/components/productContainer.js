import Product from "./product"
import "./productContainer.css"
import { Context } from "../context/Context";
import {useContext} from "react";

export default function ProductContainer(props) {
    const hooklink = useContext(Context)
    return(
        <div className={props.btsCol+" productContainer"}>
        <div className="row">
            <Product bgimage={hooklink.link[0]} btsCol="col-4"></Product>
            <Product bgimage={hooklink.link[1]} btsCol="col-8"></Product>
        </div>
        <div className="row">
            <Product bgimage={hooklink.link[2]} btsCol="col-8"></Product>
            <Product bgimage={hooklink.link[3]} btsCol="col-4"></Product>
        </div>
    </div>
    )
}