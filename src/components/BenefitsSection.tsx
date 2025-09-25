import {DollarSign, Clock, Shield, TrendingUp} from 'lucide-react';

const BenefitsSection = () => {
	const benefits = [
		{
			icon: DollarSign,
			title: 'Save Billions in Wasted R&D',
			description:
				'Reduce failed trials by identifying issues before expensive clinical phases',
			highlight: 'Billions saved',
		},
		{
			icon: Clock,
			title: 'Shorten Time-to-Market by Years',
			description:
				'Accelerate product development with faster iteration cycles',
			highlight: 'Years faster',
		},
		{
			icon: Shield,
			title: 'Improve Safety & Equity',
			description:
				'Ensure products work safely across diverse patient populations',
			highlight: 'Better outcomes',
		},
		{
			icon: TrendingUp,
			title: 'Increase FDA Approval Readiness',
			description:
				'Enter clinical trials with higher confidence and success probability',
			highlight: 'Higher success rate',
		},
	];

	return (
		<section className='py-20 bg-white text-foreground'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						Why It <span className='text-primary'>Matters</span>
					</h2>
					<p className='text-xl text-muted-foreground'>
						Transform your product development process with
						measurable impact
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr'>
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<div key={index} className='group h-full'>
								<div className='flex h-full items-start p-8 bg-white rounded-2xl border border-primary/25 hover:border-primary/50 transition-all duration-300 hover:shadow-lg'>
									<div className='w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-primary/20 transition-colors'>
										<Icon className='w-8 h-8 text-primary' />
									</div>

									<div className='flex-1'>
										<div className='flex items-center mb-3'>
											<h3 className='text-xl font-bold mr-3'>
												{benefit.title}
											</h3>
											<span className='px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full'>
												{benefit.highlight}
											</span>
										</div>
										<p className='text-muted-foreground leading-relaxed'>
											{benefit.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
