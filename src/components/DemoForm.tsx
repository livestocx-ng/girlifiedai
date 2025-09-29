import {useState} from 'react';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useNavigate} from 'react-router-dom';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Progress} from '@/components/ui/progress';
import {Loader2, FileText, Users, Target, Shield} from 'lucide-react';

interface DemoFormProps {
	onSubmit: (data: any) => void;
	isLoading: boolean;
}

export const DemoForm = ({onSubmit, isLoading}: DemoFormProps) => {
	const {toast} = useToast();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		productName: '',
		productType: '',
		targetCondition: '',
		description: '',
		targetDemographics: '',
		expectedMechanism: '',
		previousStudies: '',
		riskAssessment: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.productName ||
			!formData.productType ||
			!formData.targetCondition
		) {
			toast({
				title: 'Required Fields Missing',
				description:
					'Please fill in all required fields to run the simulation.',
				variant: 'destructive',
			});
			return;
		}

		onSubmit(formData);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	return (
		<Card className='w-full max-w-4xl mx-auto shadow-scientific'>
			<CardHeader className='bg-gradient-scientific text-white'>
				<CardTitle className='text-2xl flex items-center gap-2'>
					<Target className='w-6 h-6' />
					AI Clinical Trial Simulation
				</CardTitle>
				<CardDescription className='text-gray-200'>
					Test your health product with our advanced AI models before
					costly human trials
				</CardDescription>
			</CardHeader>

			<CardContent className='p-6'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<Tabs defaultValue='basic' className='w-full'>
						<TabsList className='grid w-full grid-cols-4'>
							<TabsTrigger
								value='basic'
								className='flex items-center gap-2'
							>
								<FileText className='w-4 h-4' />
								Basic Info
							</TabsTrigger>
							<TabsTrigger
								value='demographics'
								className='flex items-center gap-2'
							>
								<Users className='w-4 h-4' />
								Demographics
							</TabsTrigger>
							<TabsTrigger
								value='mechanism'
								className='flex items-center gap-2'
							>
								<Target className='w-4 h-4' />
								Mechanism
							</TabsTrigger>
							<TabsTrigger
								value='safety'
								className='flex items-center gap-2'
							>
								<Shield className='w-4 h-4' />
								Safety
							</TabsTrigger>
						</TabsList>

						<TabsContent value='basic' className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='productName'>
										Product Name *
									</Label>
									<Input
										id='productName'
										value={formData.productName}
										onChange={(e) =>
											handleInputChange(
												'productName',
												e.target.value
											)
										}
										placeholder='e.g., CardioMax Pro'
										className='text-black'
										required
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='productType'>
										Product Type *
									</Label>
									<Select
										value={formData.productType}
										onValueChange={(value) =>
											handleInputChange(
												'productType',
												value
											)
										}
									>
										<SelectTrigger className='text-black'>
											<SelectValue placeholder='Select product type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='pharmaceutical'>
												Pharmaceutical Drug
											</SelectItem>
											<SelectItem value='medical-device'>
												Medical Device
											</SelectItem>
											<SelectItem value='supplement'>
												Dietary Supplement
											</SelectItem>
											<SelectItem value='biologics'>
												Biologics/Biosimilar
											</SelectItem>
											<SelectItem value='digital-therapeutic'>
												Digital Therapeutic
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='targetCondition'>
									Target Condition *
								</Label>
								<Input
									id='targetCondition'
									value={formData.targetCondition}
									onChange={(e) =>
										handleInputChange(
											'targetCondition',
											e.target.value
										)
									}
									placeholder='e.g., Type 2 Diabetes, Hypertension, Cancer'
									required
									className='text-black'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='description'>
									Product Description
								</Label>
								<Textarea
									id='description'
									value={formData.description}
									onChange={(e) =>
										handleInputChange(
											'description',
											e.target.value
										)
									}
									placeholder="Describe your product's intended use, dosage, and key features..."
									rows={3}
									className='text-black'
								/>
							</div>
						</TabsContent>

						<TabsContent value='demographics' className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='targetDemographics'>
									Target Demographics
								</Label>
								<Textarea
									id='targetDemographics'
									value={formData.targetDemographics}
									onChange={(e) =>
										handleInputChange(
											'targetDemographics',
											e.target.value
										)
									}
									placeholder='Age range, gender, ethnicity, geographic regions, comorbidities...'
									rows={4}
									className='text-black'
								/>
							</div>
						</TabsContent>

						<TabsContent value='mechanism' className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='expectedMechanism'>
									Expected Mechanism of Action
								</Label>
								<Textarea
									id='expectedMechanism'
									value={formData.expectedMechanism}
									onChange={(e) =>
										handleInputChange(
											'expectedMechanism',
											e.target.value
										)
									}
									placeholder='How does your product work? What biological pathways does it target?'
									rows={4}
									className='text-black'
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='previousStudies'>
									Previous Studies/Data
								</Label>
								<Textarea
									id='previousStudies'
									value={formData.previousStudies}
									onChange={(e) =>
										handleInputChange(
											'previousStudies',
											e.target.value
										)
									}
									placeholder='Any preclinical data, pilot studies, or relevant research...'
									rows={3}
									className='text-black'
								/>
							</div>
						</TabsContent>

						<TabsContent value='safety' className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='riskAssessment'>
									Known Risks & Contraindications
								</Label>
								<Textarea
									id='riskAssessment'
									value={formData.riskAssessment}
									onChange={(e) =>
										handleInputChange(
											'riskAssessment',
											e.target.value
										)
									}
									placeholder='Known side effects, drug interactions, contraindications...'
									rows={4}
									className='text-black'
								/>
							</div>
						</TabsContent>
					</Tabs>

					{isLoading && (
						<div className='space-y-2'>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<Loader2 className='w-4 h-4 animate-spin' />
								Running AI simulation across 10,000+ synthetic
								patients...
							</div>
							<Progress value={85} className='w-full' />
						</div>
					)}

					<Button
						type='submit'
						disabled={isLoading}
						// className='w-full bg-gradient-primary  hover:shadow-scientific transition-all duration-300'
						className='w-full'
						size='lg'
					>
						{isLoading ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Simulating Trial...
							</>
						) : (
							'Start AI Clinical Simulation'
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
