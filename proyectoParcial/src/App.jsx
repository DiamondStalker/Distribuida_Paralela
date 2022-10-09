import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Product } from './components/Product';
import { useState } from 'react';
import CartButton from './components/CartButton';

const App = () => {
	const products = [
		{
			id: '1u',
			Nombre: 'Nike Dunk High Retro',
			Precio: 120,
			Cantidad_disponible: 5,
			Descripción: 'Really good Nike shoes',
			url_imagen:
				'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/608d6f2b-f6eb-4a5f-8535-6f24b081e011/dunk-high-retro-zapatillas-tjf3hZ.png',
		},
		{
			id: '2u',
			Nombre: 'Nike Zoom Fly 5',
			Precio: 150,
			Cantidad_disponible: 3,
			Descripción: 'good Nike shoes',
			url_imagen:
				'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/cdb4e7b0-7772-41aa-82c0-4306f53050b6/zoom-fly-5-zapatillas-de-running-carretera-6PMLS5.png',
		},
		{
			id: '3u',
			Nombre: 'Nike Streetgato',
			Precio: 180,
			Cantidad_disponible: 2,
			Descripción: 'Really Nike shoes',
			url_imagen:
				'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c526742e-8259-44bd-a37e-d27cf4e29194/streetgato-botas-de-futbol-zhWVgz.png',
		},
		{
			id: '4u',
			Nombre: 'Zoom Freak 4',
			Precio: 150,
			Cantidad_disponible: 3,
			Descripción: 'Really good Nike shoes',
			url_imagen:
				'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/dd30bba7-ae65-4fc3-975c-454f9b8d7ddd/zoom-freak-4-zapatillas-de-baloncesto-8Hdw9M.png',
		},
	];

	const [cartCounter, setcartCounter] = useState(0);
	const [listProducts, setlistProducts] = useState(products);
	const [productsSelected, setproductsSelected] = useState([]);
	const [pay, setpay] = useState([]);

	const calculatePay = () => {
		setTimeout(function () {
			let payresult = 0;

			productsSelected.forEach(element => {
				payresult +=
					listProducts.filter(temp => temp.id == element.id).shift().Precio *
					element.cantidad;
			});

			setpay(payresult);
			console.log(payresult);
		}, 500);
	};

	return (
		/* -------------------------------------------------------------------------- */
		/*                             Cotenedor Principal                            */
		/* -------------------------------------------------------------------------- */
		<div className='container'>
			{/* -------------------------------------------------------------------------- */
			/*                            Contenedor Encabezado                           */
			/* -------------------------------------------------------------------------- */}

			<div className='header'>
				<Header />
				<CartButton
					cartCounter={cartCounter}
					setcartCounter={setcartCounter}
					productsSelected={productsSelected}
					setproductsSelected={setproductsSelected}
					listProducts={listProducts}
					setlistProducts={setlistProducts}
					pay={pay}
					setpay={setpay}
					calculatePay={calculatePay}
				/>
			</div>

			<br />
			<br />
			<br />
			{/* -------------------------------------------------------------------------- */
			/*                           Contenedor de productos                          */
			/* -------------------------------------------------------------------------- */}

			<div className='Products'>
				{listProducts.map(tempProd => (
					<div className='card' key={tempProd.id} id={tempProd.id}>
						<Product
							Produc={tempProd}
							cartCounter={cartCounter}
							setcartCounter={setcartCounter}
							listProducts={listProducts}
							setlistProducts={setlistProducts}
							productsSelected={productsSelected}
							setproductsSelected={setproductsSelected}
							pay={pay}
							setpay={setpay}
							calculatePay={calculatePay}
						/>
					</div>
				))}
			</div>

			{/* -------------------------------------------------------------------------- */
			/*                              Contenedor Footer                             */
			/* -------------------------------------------------------------------------- */}
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default App;
