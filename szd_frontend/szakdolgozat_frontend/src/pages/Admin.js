
export default function Admin(){

    const { user} = useAuthContext();
    //const user = "user";
    return (
        <div>
            <p>{user}</p>
        </div>
    )
}