import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaCartPlus } from 'react-icons/fa';
import ShoppingCart from './shoppingCart';
import SummarySelecter from './SummarySelecter';
import '../styles/title.css';

const CartButton = ({
	cartCounter,
	setcartCounter,
	productsSelected,
	setproductsSelected,
	listProducts,
	setlistProducts,
	pay,
	setpay,
	calculatePay,
}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<>
				<Button variant='primary' onClick={handleShow}>
					{cartCounter} <FaCartPlus />
				</Button>

				<Offcanvas
					show={show}
					onHide={handleClose}
					placement='top'
					className='d-inline-block'
					style={{ width: '100%', height: 'auto' }}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>
							<center>
								{' '}
								<div className='title'>
									<h1>List Products Selected</h1>
								</div>{' '}
							</center>
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div style={{ width: '70%' }}>
							{productsSelected.map(tempProd => (
								<div key={tempProd.id} id={tempProd.id}>
									<ShoppingCart
										cartCounter={cartCounter}
										setcartCounter={setcartCounter}
										id={tempProd.id}
										ammount={tempProd.cantidad}
										img={tempProd.img}
										Nombre={tempProd.Nombre}
										listProducts={listProducts}
										setlistProducts={setlistProducts}
										productsSelected={productsSelected}
										setproductsSelected={setproductsSelected}
										pay={pay}
										setpay={setpay}
									/>
								</div>
							))}
						</div>

						<div
							style={{
								width: '20%',
								marginLeft: '80%',
								borderLeft: '10px solid white',
								boxShadow: '-10px 0px rgb(0, 0,0, .1)',
							}}
						>
							<SummarySelecter
								listProducts={listProducts}
								setlistProducts={setlistProducts}
								productsSelected={productsSelected}
								setproductsSelected={setproductsSelected}
								pay={pay}
								setpay={setpay}
							/>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</>
		</div>
	);
};

export default CartButton;
