import {AlertTriangle, DollarSign, TrendingDown, BarChart3} from 'lucide-react';

const ProblemSection = () => {
	const stats = [
		{
			icon: DollarSign,
			stat: '$25B+',
			description: 'AI + drug discovery funding since 2018',
		},
		{
			icon: BarChart3,
			stat: '90%+',
			description: 'Funding focused on discovery, not regulatory',
		},
		{
			icon: TrendingDown,
			stat: '73% (2025)',
			description: 'Rejections due to inaccurate/incomplete data',
		},
		{
			icon: AlertTriangle,
			stat: 'Root causes',
			description: "Designs miss FDA needs, docs misaligned, data gaps",
		},
	];

	return (
		<section className='py-20 bg-white text-foreground'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						AI Regulatory Gap —
						<span className='text-destructive'> The Hidden Failure Mode</span>
					</h2>
					<p className='text-xl text-muted-foreground leading-relaxed'>
						Most biotech and medtech failures aren’t due to weak
						science — they stem from trial designs that don’t meet
						FDA expectations, inconsistent documentation, and
						misaligned or incomplete data in submissions.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{stats.map((item, index) => {
						const Icon = item.icon;
						return (
							<div key={index} className='text-center group'>
								<div className='w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-destructive/20 transition-colors'>
									<Icon className='w-8 h-8 text-destructive' />
								</div>
								<h3 className='text-2xl font-bold mb-2'>
									{item.stat}
								</h3>
								<p className='text-muted-foreground'>
									{item.description}
								</p>
							</div>
						);
					})}
				</div>

				<div className='mt-16 p-8 bg-destructive/5 rounded-2xl border border-destructive/20'>
					<p className='text-lg text-center max-w-3xl mx-auto'>
						<span className='font-semibold text-destructive'>Reality (2025):</span>{' '}
						73% of rejected FDA submissions failed due to inaccurate or
						incomplete data. Investment has flowed into discovery,
						but regulatory and clinical translation remain a blue
						ocean — where better design, aligned documentation, and
						data transparency can change outcomes.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ProblemSection;
