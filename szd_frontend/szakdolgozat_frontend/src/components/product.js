import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/DataContext";

export default function Product(props) {
    const {setData} = useContext(Context);
    function handleClick() {
        setData(props.link);
    }
    return(
        <Link to={"termek/"+props.link}>
            <div onClick={handleClick} style={{backgroundImage: `url(${props.bgimage})`}}></div>
        </Link>
    )
}