import {IProduct} from 'boundless-api-client';
import {InferGetServerSidePropsType} from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import VerticalMenu from '../components/VerticalMenu';
import {IMenuItem} from '../@types/components';
import SwiperSlider from '../components/SwiperSlider';
import cliffImg from '../assets/cliff_1.jpg';
import cliff2Img from '../assets/cliff_2.jpg';

export default function IndexPage({products, mainMenu, footerMenu}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className='container'>
				<MainPageSlider />
				<div className='row'>
					<nav className='col-lg-3 d-none d-lg-block'>
						{mainMenu && <VerticalMenu menuList={mainMenu} />}
					</nav>
					<div className='col-lg-9 col-md-12'>
						<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Boundless store</h1>
						<ProductsList products={products} query={{}}/>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps = async () => {
	const products:IProduct[] = await (await fetch('http://localhost:3000/api/products')).json();
	const mainMenu: IMenuItem[] = await (await fetch('http://localhost:3000/api/menu/main')).json();
	const footerMenu: IMenuItem[] = await (await fetch('http://localhost:3000/api/menu/footer')).json();

	return {
		props: {
			products,
			mainMenu, footerMenu
		}
	};
};

function MainPageSlider() {
	const slides = [
		{
			'img': cliffImg.src,
			'link': '',
			'caption': 'Three things cannot be long hidden: The Sun, The Moon, and The Truth.',
			'captionPosition': 'center',
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.40
		},
		{
			'img': cliff2Img.src,
			'link': '',
			'caption': 'Pray not for easy lives, pray to be stronger men.',
			'captionPosition': null,
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.4
		}
	];

	return (
		<SwiperSlider
			showPrevNext
			roundCorners
			pagination='progressbar'
			size={'large'}
			slides={slides}
			className={'mb-4'}
		/>
	);
}