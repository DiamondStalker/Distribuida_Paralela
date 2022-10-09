import { GrAddCircle } from 'react-icons/gr';
const ButtonAdd = ({
	cartCounter,
	setcartCounter,
	listProducts,
	setlistProducts,
	productId,
	productsSelected,
	setproductsSelected,
	pay,
	setpay,
	calculatePay
}) => {
	const addTocart = () => {
		let tempItem = listProducts
			.filter(tempList => tempList.id == productId)
			.shift();

		/* -------------------------------------------------------------------------- */
		/*                        Validacion si tiene productos                       */
		/* -------------------------------------------------------------------------- */

		if (tempItem.Cantidad_disponible > 0) {
			setcartCounter(cartCounter + 1);
			let newCantidad_disponible = tempItem.Cantidad_disponible - 1;

			let newProduclist = listProducts.map(temp =>
				temp.id == productId
					? { ...temp, Cantidad_disponible: newCantidad_disponible }
					: temp
			);
			setlistProducts(newProduclist);

			let tempSelected = [...productsSelected];

			if (tempSelected.filter(temp => temp.id == productId).length == 0)
				tempSelected.push({ id: productId , cantidad:1,img:(listProducts.filter(temp=>temp.id==productId)).shift().url_imagen,Nombre:(listProducts.filter(temp=>temp.id==productId)).shift().Nombre});
			else {
				tempSelected = productsSelected.map(tmp => tmp.id == productId ? {...tmp,cantidad:(tmp.cantidad=tmp.cantidad+1),img:(listProducts.filter(temp=>temp.id==productId)).shift().url_imagen} : tmp)
			}

			setproductsSelected(tempSelected)
			// console.group('Lista seleccionadas');
			// console.table(tempSelected);
			// console.groupEnd();
		}
	};


	return (
		<div
		onClick={calculatePay()}>
			<button
				className='botonAdd'
				onClick={() => {
					addTocart();
				}}
			>
				Add yo Cart{' '}
				<GrAddCircle
					className='icon'
					style={{
						position: 'absolute',
						top: '20px',
						right: '20px',
					}}
					size='50px'
					color='red'
				/>
			</button>
			<br />
			<br />
			<br />
		</div>
	);
};

export default ButtonAdd;
