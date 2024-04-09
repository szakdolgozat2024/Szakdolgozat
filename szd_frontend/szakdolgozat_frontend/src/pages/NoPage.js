import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function NoPage(){
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    })
    
    return (
        <div className="container text-center">
        </div>
    )
}