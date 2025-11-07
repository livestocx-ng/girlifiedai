import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm'>
			<div className='container mx-auto px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<img
							alt='Logo'
							src='/girlifiedai.png'
							className='mx-auto w-10 h-10 object-contain'
						/>
						<span className='text-xl font-bold'>Girlified AI</span>
					</div>

					<div className='hidden md:flex items-center space-x-8'>
						<a href='#solution' className='transition-colors'>
							Solution
						</a>
						<a href='#features' className='transition-colors'>
							Features
						</a>
						<a href='#about' className='transition-colors'>
							About
						</a>
					</div>

					<div className='flex items-center space-x-4'>
						<Link to='/demo'>
							<Button variant='ghost' size='sm'>
								Request Demo
							</Button>
						</Link>
						<Button variant='destructive' size='sm'>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
