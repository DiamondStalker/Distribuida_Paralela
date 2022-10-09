import { useState } from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';

const SummarySelecter = ({
	productsSelected,
	setproductsSelected,
	listProducts,
	setlistProducts,
    pay,
    setpay
}) => {

	const validar_nombre = id => {
		return listProducts.filter(temp => temp.id == id).pop().Nombre;
	};

	const validarPrecio = id => {
		let price = listProducts.filter(temp => temp.id == id).pop().Precio;

		
		return price;
	};

	const [cupon, setCupon] = useState(0)

	const handleInput = ({target}) => {
		//console.log(target.value)
		target.value == "" ? setCupon(0):    parseInt(target.value) > 0 && parseInt(target.value) <= 100 ? setCupon(target.value) : setCupon(0)
	};

	const validar_cupon = () =>{
		return cupon == 0 ? "No coupon" : `$${cupon}`
	}

	const totalPagar = () =>{
		return parseInt(pay) - parseInt(cupon) 
	}

	return (
		<div>
			<h2>SummarySelecter</h2>
			<hr></hr>

			{productsSelected.map(tempSelected => (
				<strong key={tempSelected.id}>
						{validar_nombre(tempSelected.id)} {tempSelected.cantidad} (
						{validarPrecio(tempSelected.id)})
					<br />
				</strong>
			))}
			<hr />
            <div>
				<label><strong>ENTER CoUPON CODE</strong></label>
                <input type="text" style={{marginLeft:"20px"}} onChange={handleInput}/>
            </div>
			<hr />
			<div>
				<strong>
					<h5>SubTotal ${pay}</h5>
					<h5>SHIPPING FREE</h5>
					<h5>COUPON {validar_cupon()}</h5>
				</strong>
			</div>
			<hr />
			<div>
				<strong>
					<h3>ToTal  {totalPagar()}</h3>
				</strong>
			</div>
		</div>
	);
};

export default SummarySelecter;
