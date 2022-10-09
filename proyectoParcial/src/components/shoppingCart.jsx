import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import React, { useState } from 'react';

const shoppingCart = ({
	cartCounter,
	setcartCounter,
	id,
	ammount,
	img,
	Nombre,
	productsSelected,
	setproductsSelected,
	listProducts,
	setlistProducts
}) => {
	const [num, setNum] = useState(ammount);

	const verifyAmmount = event => {
		let tempAmmount = Number(event.target.value);

		let productTemp = listProducts.filter(temp => temp.id == id).shift();

		if (num < Number(event.target.value)) {
			// Se esta sumando
			if (productTemp.Cantidad_disponible > 0) {
				// Aun queda inventario

				setlistProducts(
					listProducts.map(temp =>
						temp.id != id
							? temp
							: {
									...temp,
									Cantidad_disponible: productTemp.Cantidad_disponible - 1,
							  }
					)
				);
				setcartCounter(cartCounter + 1);
				setproductsSelected(
					productsSelected.map(temp =>
						temp.id != id ? temp : { ...temp, cantidad: temp.cantidad + 1 }
					)
				);
				setNum(num + 1);
			}
		} else if (Number(event.target.value) == 0) {
			//Se debe eliminar de la lista de seleccionados
			setproductsSelected(productsSelected.filter(temp => temp.id != id));
			setcartCounter(cartCounter - 1);
			setNum(num - 1);
			setlistProducts(
				listProducts.map(temp =>
					temp.id != id
						? temp
						: {
								...temp,
								Cantidad_disponible: productTemp.Cantidad_disponible + 1,
						  }
				)
			);
		} else {
			setlistProducts(
				listProducts.map(temp =>
					temp.id != id
						? temp
						: {
								...temp,
								Cantidad_disponible: productTemp.Cantidad_disponible + 1,
						  }
				)
			);
			setcartCounter(cartCounter - 1);
			setproductsSelected(
				productsSelected.map(temp =>
					temp.id != id ? temp : { ...temp, cantidad: temp.cantidad - 1 }
				)
			);
			setNum(num - 1);
		}
	};
	return (
		<div>
			<Card style={{ width: '18rem' }}>
				<center>
					<Card.Img variant='top' src={img} style={{ width: '100px' }} />
				</center>

				<Card.Body>
					<Card.Title>{Nombre}</Card.Title>
					<Card.Text>
						{listProducts.filter(temp => temp.id == id).shift().Descripción}

						<input
							type='number'
							value={num}
							onChange={() => verifyAmmount(event)}
						/>
					</Card.Text>
					<Button variant='primary'>Go somewhere</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default shoppingCart;
