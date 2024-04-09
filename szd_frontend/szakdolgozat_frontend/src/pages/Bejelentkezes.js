import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Card from 'react-bootstrap/Card';

export default function Bejelentkezes() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginReg, errors } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //bejelentkezés
        //Összegyűjtjük egyetlen objektumban az űrlap adatokat
        const adat = {
            email: email,
            password: password,
        };

        loginReg(adat, "/login");

    };

    return (
        <div className="m-auto container" style={{ maxWidth: "400px" }}>
            <Card className='m-auto mt-5 p-4'>
                <Card.Title><h1>Bejelentkezés</h1></Card.Title>
                <Card.Text className="text-muted">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                // value beállítása a state értékére
                                value={email}
                                // state értékének módosítása ha változik a beviteli mező tartalma
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="form-control"
                                id="email"
                                placeholder="email"
                                name="email"
                            />
                        </div>
                        <div>
                            {errors && (
                                <span className="text-danger">{errors.email[0]}</span>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pwd" className="form-label">
                                Jelszó:
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control"
                                id="pwd"
                                placeholder="jelszó"
                                name="pwd"
                            />
                            <div>
                                {errors && (
                                    <span className="text-danger">
                                        {errors.password[0]}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                </Card.Text>

            </Card>
            <div className=" text-center">
                <p>
                    Még nincs fiókja? Regisztráljon most!
                    <Link className="nav-link text-info" to="/regisztracio">
                        Regisztráció
                    </Link>
                </p>
            </div>
        </div>
    );
}