import {Button} from '@/components/ui/button';
import {ArrowRight, Calendar} from 'lucide-react';
import {Link} from 'react-router-dom';

const CTASection = () => {
	return (
		<section className='py-20 bg-primary/5 border-t border-primary/20'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						Ready to Future-Proof Your
						<span className='text-primary'> FDA Submission?</span>
					</h2>

					<p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto'>
						Join leading biotech innovators who are already
						accelerating their product development with AI-powered
						clinical simulations.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Button
							variant='hero'
							size='xl'
							className='group'
							asChild
						>
							<Link to='/demo'>
								Try the Platform
								<ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>
						<Button
							variant='outlineHero'
							size='xl'
							className='group'
							asChild
						>
							<Link to='#'>
								<Calendar className='mr-2 group-hover:scale-110 transition-transform' />
								Book a Demo
							</Link>
						</Button>
					</div>

					<div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
						<div className='p-4'>
							<div className='text-2xl font-bold text-primary mb-2'>
								Free Trial
							</div>
							<div className='text-muted-foreground'>
								Start with a no-risk evaluation
							</div>
						</div>
						<div className='p-4'>
							<div className='text-2xl font-bold text-primary mb-2'>
								Expert Support
							</div>
							<div className='text-muted-foreground'>
								Dedicated regulatory guidance
							</div>
						</div>
						<div className='p-4'>
							<div className='text-2xl font-bold text-primary mb-2'>
								Proven Results
							</div>
							<div className='text-muted-foreground'>
								Backed by real-world success
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
