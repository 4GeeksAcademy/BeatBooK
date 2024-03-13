import React from "react";
import { useState } from "react";
import "../../styles/signup.css";

export const Signup = () => {

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleDayChange = (e) => {
        setDay(e.target.value);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleDateOfBirthChange = () => {
        const today = new Date();
        const selectedDate = new Date(`${year}-${month}-${day}`);
        const ageDifference = today.getFullYear() - selectedDate.getFullYear();

        if (ageDifference < 18) {
            alert("You must be accompanied by an adult if you're under 18 years old.");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <form id="form" className="row needs-validation container m-5 border p-3" noValidate>
                <div className="heading">REGISTRO</div>
                <div className="container  border border-1 rounded-1 p-3" id="account">      {/*Esta es mi seccion de detalles de la cuenta */}
                    <div className="inputBox my-4">
                        <span htmlFor="email" className="form-label">Usuario</span>
                        <input type="email" className="form-control" id="email" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="inputBox my-4">
                        <span htmlFor="email" className="form-label">Email</span>
                        <input type="email" className="form-control" id="email" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="inputBox my-4">
                        <span htmlFor="confirmEmail" className="form-label">Confirmar Email </span>
                        <input type="email" className="form-control" id="confirmEmail" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="inputBox my-4">
                        <span htmlFor="password" className="form-label">Contraseña</span>
                        <input type="password" className="form-control" id="password" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="inputBox my-4">
                        <span htmlFor="confirmPassword" className="form-label"> Confirmar Contraseña</span>
                        <input type="password" className="form-control" id="confirmPassword" required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                </div>
                <div className="container border border-1 rounded-1 p-3 my-3 " id="details">            {/*Esta es mi seccion de detalles del usuario */}
                    <div className="row">
                        <div className="box col-6 my-3">
                            <span htmlFor="firstName" className="form-label">First Nombre</span>
                            <input type="text" className="form-control" id="firstName" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="box col-6 my-3">
                            <span htmlFor="lastName" className="form-label">Apellido</span>
                            <input type="text" className="form-control" id="lastName" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <label>Direccion</label>
                        <div className="box col-6 my-3">
                            <span htmlFor="address" className="form-label">Calle</span>
                            <input type="text" className="form-control" id="address" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="box col-3 my-3">
                            <span htmlFor="number" className="form-label">Numero</span>
                            <input type="text" className="form-control" id="number" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="box col-3 my-3">
                            <span htmlFor="postalCode" className="form-label">Codigo postal</span>
                            <input type="text" className="form-control" id="postalCode" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div className="m-2 p-1">
                            <label className="my-2">Gender</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="male" />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="female" />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="other" />
                                <label className="form-check-label" htmlFor="other">
                                    Other
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="my-2">Fecha de nacimiento</label>
                            <div className="row">
                                <div className="col-4">
                                    <select className="form-select" value={day} onChange={handleDayChange}>
                                        <option value="">Day</option>
                                        {[...Array(31).keys()].map(day => (
                                            <option key={day + 1} value={day + 1}>{day + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={month} onChange={handleMonthChange}>
                                        <option value="">Month</option>
                                        {months.map((monthName, index) => (
                                            <option key={index + 1} value={index + 1}>{monthName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={year} onChange={handleYearChange}>
                                        <option value="">Year</option>
                                        {Array.from({ length: 125 }, (_, i) => 2024 - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>

                <div className="border border-1 rounded-1 p-3">
                    <label className="my-2">Interes musical </label>< br />
                    <div className="d-flex flex-wrap grid gap-3 btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck1">Pop</label>

                        <input type="checkbox" className="btn-check" id="btncheck10" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck10">Rock</label>

                        <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck2">Hop-hop/Rap</label>

                        <input type="checkbox" className="btn-check" id="btncheck3" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck3">Electronica</label>

                        <input type="checkbox" className="btn-check" id="btncheck4" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck4">R&B/Soul</label>

                        <input type="checkbox" className="btn-check" id="btncheck5" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck5">Reggaeton</label>

                        <input type="checkbox" className="btn-check" id="btncheck6" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck6">Contry</label>

                        <input type="checkbox" className="btn-check" id="btncheck7" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck7">Pop Latino</label>

                        <input type="checkbox" className="btn-check" id="btncheck8" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck8">Indie</label>

                        <input type="checkbox" className="btn-check" id="btncheck9" autocomplete="off" />
                        <label className="btn btn-outline-primary" for="btncheck9">K-Pop</label>

                    </div>
                </div>
                <div className="col-12 mt-3">
                    <button className="btn btn-primary" type="submit" id="login-button" onClick={handleDateOfBirthChange}>Enviar</button>
                </div>
            </form>
        </div>
    );

}