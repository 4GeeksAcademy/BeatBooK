import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import CategoriesCard from '../component/CategoriesCard';

export const Categorias = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Categorías</h1>
			<div className="row">
				<CategoriesCard />
			</div>
		</div>
	);
};
