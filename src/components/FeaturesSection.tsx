import {Brain, TrendingUp, Users, Target, Database, Zap} from 'lucide-react';

const FeaturesSection = () => {
	const features = [
		{
			icon: TrendingUp,
			title: 'FDA Outcome Prediction',
			description:
				'Predict approval vs. rejection probability using FDA/EMA historical decisions',
		},
		{
			icon: Target,
			title: 'Regulatory Strategy Modelling',
			description:
				'Recommend optimal endpoints, comparators, and inclusion/exclusion criteria',
		},
		{
			icon: Database,
			title: 'Automated Dossier Authoring',
			description:
				'Auto-generate FDA-aligned sections from structured datasets and precedents',
		},
		{
			icon: Users,
			title: 'AI Collaboration Hub',
			description:
				'Connect regulatory, clinical, and data teams with shared context and reviews',
		},
		{
			icon: Brain,
			title: 'Explainable AI Layer',
			description:
				'Trace every recommendation to source evidence with full audit trails',
		},
		{
			icon: Zap,
			title: 'Risk & Compliance Alerts',
			description:
				'Flag compliance gaps, data inconsistencies, and transparency issues early',
		},
	];

	return (
		<section id='features' className='py-20 bg-white text-foreground'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						Key <span className='text-primary'>Features</span>
					</h2>
					<p className='text-xl text-muted-foreground'>
						Core capabilities that power “GitHub Copilot for FDA Submissions”
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className='group p-8 bg-white rounded-2xl border border-primary/25 hover:border-primary/50 transition-all duration-300 hover:shadow-lg'
							>
								<div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors'>
									<Icon className='w-6 h-6 text-primary' />
								</div>
								<h3 className='text-xl font-bold mb-4'>
									{feature.title}
								</h3>
								<p className='text-muted-foreground leading-relaxed'>
									{feature.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
