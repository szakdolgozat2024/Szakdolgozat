export default function NavComponent(props){
    return (
        <li className={props.bootstrapListaElem}>
            <a className="nav-link" href="#">{props.children}<span className="sr-only"></span></a>
        </li>
    )
}