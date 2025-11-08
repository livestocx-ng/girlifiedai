/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {useMemo, useState} from 'react';
import heroBg from '@/assets/hero.jpg';
import {Link} from 'react-router-dom';
import {ArrowLeft, Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {DemoForm, DemoFormSubmitPayload} from '@/components/DemoForm';
import {DemoResults} from '@/components/DemoResults';
import {useNavigate} from 'react-router-dom';

const DEMO_CHAT_STORAGE_KEY = 'girlified-demo-chat';

export const Demo = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<any>(null);
	const [apiResults, setAPIResults] = useState<string | null>(null);
	const navigate = useNavigate();

	const loadingMessages = useMemo(
		() => [
			'Analyzing FDA approval probability based on 20+ years of regulatory data...',
			'Evaluating regulatory compliance and identifying potential risks...',
			'Comparing your product against historical FDA approval patterns...',
		],
		[]
	);

	const handleDemoSubmit = async (formData: DemoFormSubmitPayload) => {
		try {
			setIsLoading(true);

			const {supportingFiles = [], ...payload} = formData || {};
			const multipartData = new FormData();

			Object.entries(payload).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					multipartData.append(key, value as string);
				}
			});

			(supportingFiles as File[]).forEach((file) => {
				multipartData.append('files', file);
			});

			// Simulate API call with realistic delay
			// await new Promise(resolve => setTimeout(resolve, 3000));
			const response = await axios.post(
				'https://venille-api.livestocx.xyz/v1/auth/generate-girlified-ai-report',
				multipartData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log(`[FORM-DATA] :: ${response.data}`);

			setResults(payload);

			const formattedReport =
				typeof response.data === 'string'
					? response.data
					: JSON.stringify(response.data, null, 2);

			const promptSections = [
				`Run a comprehensive clinical trial simulation for ${formData.productName} (${formData.productType}) targeting ${formData.targetCondition}.`,
				formData.description
					? `Product description: ${formData.description}`
					: null,
				formData.targetDemographics
					? `Target demographics: ${formData.targetDemographics}`
					: null,
				formData.expectedMechanism
					? `Expected mechanism of action: ${formData.expectedMechanism}`
					: null,
				// formData.previousStudies
				// 	? `Previous studies or supporting data: ${formData.previousStudies}`
				// 	: null,
				formData.riskAssessment
					? `Known risks or contraindications: ${formData.riskAssessment}`
					: null,
			]
				.filter(Boolean)
				.join('\n\n');

			const chatPayload = {
				initialPrompt: promptSections,
				assistantResponse: formattedReport,
				submittedAt: new Date().toISOString(),
				productSummary: {
					productName: formData.productName,
					productType: formData.productType,
					targetCondition: formData.targetCondition,
				},
			};

			try {
				sessionStorage.setItem(
					DEMO_CHAT_STORAGE_KEY,
					JSON.stringify(chatPayload)
				);
			} catch (error) {
				console.error('Failed to cache chat payload', error);
			}

			setAPIResults(formattedReport);
			setIsLoading(false);

			navigate('/chat', {state: chatPayload});
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
		<div className='min-h-screen bg-background relative'>
			{isLoading && (
				<div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm gap-4 px-6 text-center'>
					<Loader2 className='h-12 w-12 animate-spin text-primary' />
					<div className='space-y-2'>
						<p className='text-xl font-semibold text-foreground'>
							Analyzing FDA Approval Probability...
						</p>
						<p className='text-sm text-muted-foreground max-w-xl'>
							{
								loadingMessages[
									Math.floor(Date.now() / 3000) %
										loadingMessages.length
								]
							}
						</p>
					</div>
				</div>
			)}

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
							FDA Approval Predictor Demo
						</h1>
						<p className='text-xl max-w-3xl mx-auto'>
							Experience the power of AI-driven FDA approval
							analysis. Predict your product's approval
							probability and identify regulatory risks based on
							20+ years of FDA data.
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
