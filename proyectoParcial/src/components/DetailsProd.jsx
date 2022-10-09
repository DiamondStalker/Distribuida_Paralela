const DetailsProd = ({ Nombre, Descripción, Precio, Disponible }) => {
	return (
		<div>
			<h3>{Nombre}</h3>
			<p>{Descripción}</p>
			<p>
				<strong> Cantidad Disponible {Disponible}</strong>
			</p>
			<p>$ {Precio}</p>
		</div>
	);
};

export default DetailsProd;
