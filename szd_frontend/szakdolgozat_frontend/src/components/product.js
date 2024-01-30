export default function Product(props) {
    return(
        <div className={props.btsCol+" product product_anim"} style={{backgroundImage: `url(${props.bgImg})`}}></div>
    )
}