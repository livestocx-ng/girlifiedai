/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {useState} from 'react';
import heroBg from '@/assets/hero.jpg';
import {Link} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {DemoForm} from '@/components/DemoForm';
import {DemoResults} from '@/components/DemoResults';

export const Demo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<any>(null);
	const [apiResults, setAPIResults] = useState<string>(null);

	const handleDemoSubmit = async (formData: any) => {
		try {
			setIsLoading(true);

			// Simulate API call with realistic delay
			// await new Promise(resolve => setTimeout(resolve, 3000));
			const response = await axios.post(
				'https://venille-api.livestocx.xyz/v1/auth/generate-girlified-ai-report',
				formData
			);

			console.log(`[FORM-DATA] :: ${response.data}`);

			setResults(formData);
			setAPIResults(response.data);

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);

			console.log(`[GENERATE-API-REPORT-ERROR] :: ${error}`);
		}
	};

	const handleReset = () => {
		setResults(null);
		setAPIResults('');
	};

	return (
		<div className='min-h-screen bg-background'>
			{/* Hero Section */}
			<div
				className='relative bg-gradient-hero bg-cover bg-center py-16'
				style={{backgroundImage: `url(${heroBg})`}}
			>
				<div className='absolute inset-0 bg-gradient-hero/80'></div>
				<div className='relative z-10 container mx-auto px-4'>
					<div className='text-center text-white space-y-4'>
						<Link to='/'>
							<Button variant='secondary' className='mb-4'>
								<ArrowLeft className='w-4 h-4 mr-2' />
								Back to Home
							</Button>
						</Link>

						<h1 className='text-4xl md:text-5xl font-bold'>
							AI Clinical Trial Demo
						</h1>
						<p className='text-xl max-w-3xl mx-auto'>
							Experience the power of AI-driven clinical trial
							simulation. Test your health product against
							thousands of synthetic patients before expensive
							human trials.
						</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='container mx-auto px-4 py-12'>
				{!apiResults ? (
					<DemoForm
						onSubmit={handleDemoSubmit}
						isLoading={isLoading}
					/>
				) : (
					<div className='space-y-6'>
						<div className='flex justify-between items-center'>
							<h2 className='text-2xl font-bold'>
								Simulation Complete
							</h2>
							<Button onClick={handleReset} variant='outline'>
								Run New Simulation
							</Button>
						</div>

						<DemoResults
							results={apiResults}
							productName={results.productName}
							productType={results.productType}
							targetCondition={results.targetCondition}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
