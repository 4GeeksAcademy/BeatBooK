import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Categorías</h1>

		</div>
	);
};
