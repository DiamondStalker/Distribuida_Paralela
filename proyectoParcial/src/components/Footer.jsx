import {
	CDBFooter,
	CDBBtn,
	CDBIcon,
	CDBBox,
} from 'cdbreact';

export const Footer = () => {
	return (
		<CDBFooter className='shadow'>
			<CDBBox
				display='flex'
				justifyContent='between'
				alignItems='center'
				className='mx-auto py-4 flex-wrap'
				style={{ width: '80%' }}
			>
				<CDBBox display='flex' alignItems='center'>
					<a href='#'>
						<img style={{width:'50px'}} alt='logo' src='https://scontent.feoh6-1.fna.fbcdn.net/v/t39.30808-6/310270356_535200378605190_8977206675760515875_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=111&ccb=1-7&_nc_sid=8024bb&efg=eyJpIjoidCJ9&_nc_ohc=5WmhY9jU27QAX8SgIkf&_nc_ht=scontent.feoh6-1.fna&oh=00_AT8AeDJ6NnfrMNxA3XVsJSJQVaP9q6YzEOkmyxcfOvpSWA&oe=6345DDA2' />
						<br />
                        <span className='ml-4 h5 mb-0 font-weight-bold'>DiamondStalker</span>
					</a>
					<small className='ml-2' style={{paddingLeft:"150px"}}>
						&copy; Diamond Stalker, 2022. All rights reserved. 
                        <br />
                        By Carlos Mateo Moreno & Daniel Santiago Garcia
					</small>
				</CDBBox>
				<CDBBox display='flex'>
					<CDBBtn flat color='dark' className='p-2'>
						<CDBIcon fab icon='facebook-f' />
					</CDBBtn>
					<CDBBtn flat color='dark' className='mx-3 p-2'>
						<CDBIcon fab icon='twitter' />
					</CDBBtn>
					<CDBBtn flat color='dark' className='p-2'>
						<CDBIcon fab icon='instagram' />
					</CDBBtn>
				</CDBBox>
			</CDBBox>
		</CDBFooter>
	);
};

export default Footer;
