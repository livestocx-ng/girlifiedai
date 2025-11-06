import {
	Brain,
	Users,
	BarChart3,
	Shield,
	Database,
	Lightbulb,
} from 'lucide-react';

const SolutionSection = () => {
	const capabilities = [
		{
			icon: BarChart3,
			title: 'FDA Outcome Prediction',
			description:
				'Simulate approval likelihood before submission using 20+ years of FDA/EMA data',
		},
		{
			icon: Brain,
			title: 'Regulatory Strategy Modelling',
			description:
				'Optimize trial designs, endpoints, comparators, and inclusion criteria',
		},
		{
			icon: Database,
			title: 'Automated Dossier Authoring',
			description:
				'Generate FDA-aligned submissions from structured datasets with precedent-based drafting',
		},
		{
			icon: Users,
			title: 'AI Collaboration Hub',
			description:
				'Unite regulatory, clinical, and data teams in one explainable workspace',
		},
	];

	return (
		<section id='solution' className='py-20 bg-white text-foreground'>
			<div className='container mx-auto px-6'>
				<div className='max-w-4xl mx-auto text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						RegOps <span className='text-primary'>Copilot</span>
					</h2>
					<p className='text-xl text-muted-foreground leading-relaxed'>
						“GitHub Copilot for FDA Submissions.” An AI-powered
						Regulatory Intelligence platform trained on historical FDA/EMA
						decisions to predict outcomes, flag risks, and auto-generate
						dossiers — with full explainability and audit trails.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16'>
					<div>
						<div className='flex items-center mb-6'>
							<Brain className='w-8 h-8 text-primary mr-3' />
							<h3 className='text-2xl font-bold'>
								FDA Simulation Engine
							</h3>
						</div>
						<p className='text-lg text-muted-foreground mb-6'>
							Train on approval letters, Complete Response Letters (CRLs),
							and trial outcomes to model regulatory paths — before you
							submit.
						</p>
						<p className='text-lg'>
							<span className='font-semibold text-primary'>Outcome:</span>{' '}
							De-risk submissions, align trial design with FDA
							expectations, and increase approval readiness.
						</p>
					</div>

					<div className='grid grid-cols-2 gap-6'>
						{capabilities.map((item, index) => {
							const Icon = item.icon;
							return (
								<div
									key={index}
									className='p-6 bg-white rounded-xl border border-primary/25 hover:border-primary/50 transition-colors group'
								>
									<Icon className='w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform' />
									<h4 className='font-semibold mb-2'>
										{item.title}
									</h4>
									<p className='text-sm text-muted-foreground'>
										{item.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				<div className='bg-primary/5 rounded-2xl p-8 border border-primary/20'>
					<div className='flex items-start'>
						<Lightbulb className='w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0' />
						<div>
							<h3 className='text-xl font-bold mb-3'>
								Explainable, Auditable AI
							</h3>
							<p className='text-lg'>
								Every recommendation traces back to historical precedents
								and data lineage. Built to align with the FDA’s 2025 AI
								guidance on transparency and accountability.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SolutionSection;
