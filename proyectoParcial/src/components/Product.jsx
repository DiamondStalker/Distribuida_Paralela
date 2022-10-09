import ButtonAdd from './ButtonAdd';
import DetailsProd from './DetailsProd';
import ImgProd from './ImgProd';

import '../styles/Products.css';

export const Product = ({
	Produc,
	cartCounter,
	setcartCounter,
	listProducts,
	setlistProducts,
	productsSelected,
	setproductsSelected,
	pay,
	setpay,
	calculatePay
}) => {

	return (
		<div>
			<section className='container_prod' style={{ backgroundColor: '#eeee' }}>
				<ImgProd url={Produc.url_imagen} />
				<DetailsProd
					Nombre={Produc.Nombre}
					Descripción={Produc.Descripción}
					Precio={Produc.Precio}
					Disponible={Produc.Cantidad_disponible}
				/>
				<ButtonAdd
					cartCounter={cartCounter}
					setcartCounter={setcartCounter}
					listProducts={listProducts}
					setlistProducts={setlistProducts}
					productId={Produc.id}
					productsSelected={productsSelected}
					setproductsSelected={setproductsSelected}
					pay={pay}
					setpay={setpay}
					calculatePay={calculatePay}
				/>
			</section>
		</div>
	);
};
