import {Building2, Lightbulb, Pill, Rocket} from 'lucide-react';

const TargetAudienceSection = () => {
	const audiences = [
		{
			icon: Building2,
			title: 'Biotech & Pharmaceutical Companies',
			description:
				'Large organizations looking to reduce R&D costs and accelerate drug development pipelines',
		},
		{
			icon: Lightbulb,
			title: 'Health-Tech Innovators',
			description:
				'Technology-driven companies developing next-generation medical devices and digital health solutions',
		},
		{
			icon: Pill,
			title: 'Consumer Health Products',
			description:
				'Companies creating supplements, diagnostics, and consumer health products requiring regulatory approval',
		},
		{
			icon: Rocket,
			title: 'Regulatory Navigation Startups',
			description:
				'Early-stage companies navigating complex FDA/EMA regulations for the first time',
		},
	];

	return (
		<section className='py-20 bg-white text-foreground'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						Who It's <span className='text-primary'>For</span>
					</h2>
					<p className='text-xl text-muted-foreground'>
						Designed for innovators across the health product
						development spectrum
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{audiences.map((audience, index) => {
						const Icon = audience.icon;
						return (
							<div
								key={index}
								className='group p-8 bg-white rounded-2xl border border-primary/25 hover:border-primary/50 transition-all duration-300 hover:shadow-lg'
							>
								<div className='flex items-start'>
									<div className='w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-primary/20 transition-colors'>
										<Icon className='w-7 h-7 text-primary' />
									</div>

									<div className='flex-1'>
										<h3 className='text-xl font-bold mb-3'>
											{audience.title}
										</h3>
										<p className='text-muted-foreground leading-relaxed'>
											{audience.description}
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

export default TargetAudienceSection;
