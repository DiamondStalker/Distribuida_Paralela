import { FaCartPlus } from 'react-icons/fa';

const ButtonCart = ({ cartCounter }) => {
	return (
		<div>
			<button>
				{cartCounter} <FaCartPlus />
			</button>
		</div>
	);
};

export default ButtonCart;
