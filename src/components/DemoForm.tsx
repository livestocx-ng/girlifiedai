import {useState, useRef, ChangeEvent, DragEvent} from 'react';
import {useToast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
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
import {Loader2, FileText, Users, Target, Shield, X} from 'lucide-react';

type DemoFormFields = {
	productName: string;
	productType: string;
	developmentStage: string;
	targetCondition: string;
	description: string;
	targetDemographics: string;
	expectedMechanism: string;
	// previousStudies: string;
	riskAssessment: string;
};

export type DemoFormSubmitPayload = DemoFormFields & {
	supportingFiles: File[];
};

interface DemoFormProps {
	onSubmit: (data: DemoFormSubmitPayload) => void;
	isLoading: boolean;
}

export const DemoForm = ({onSubmit, isLoading}: DemoFormProps) => {
	const {toast} = useToast();
	const [formData, setFormData] = useState<DemoFormFields>({
		productName: '',
		productType: '',
		targetCondition: '',
		description: '',
		developmentStage: '',
		targetDemographics: '',
		expectedMechanism: '',
		// previousStudies: '',
		riskAssessment: '',
	});
	const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const ACCEPTED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'json', 'csv', 'xlsx'];
	const ACCEPT_ATTRIBUTE = '.pdf,.png,.jpg,.jpeg,.json,.csv,.xlsx';
	const tabOrder: Array<'basic' | 'demographics' | 'mechanism' | 'safety'> = [
		'basic',
		'demographics',
		'mechanism',
		'safety',
	];
	const [activeTab, setActiveTab] =
		useState<(typeof tabOrder)[number]>('basic');
	const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
		new Set(['basic'])
	);

	const goToTab = (value: (typeof tabOrder)[number]) => {
		setActiveTab(value);
		setVisitedTabs((prev) => {
			if (prev.has(value)) {
				return prev;
			}
			const next = new Set(prev);
			next.add(value);
			return next;
		});
	};

	const handleTabChange = (value: string) => {
		if (tabOrder.includes(value as (typeof tabOrder)[number])) {
			goToTab(value as (typeof tabOrder)[number]);
		}
	};

	const renderTabNavigation = (tab: (typeof tabOrder)[number]) => {
		const currentIndex = tabOrder.indexOf(tab);
		const total = tabOrder.length;

		return (
			<div className='flex items-center justify-between pt-4'>
				<span className='text-xs text-muted-foreground'>{`Step ${
					currentIndex + 1
				} of ${total}`}</span>
				<div className='flex gap-2'>
					{currentIndex > 0 && (
						<Button
							type='button'
							variant='outline'
							color='black'
							className='text-black'
							onClick={() => goToTab(tabOrder[currentIndex - 1])}
						>
							Previous
						</Button>
					)}
					{currentIndex < total - 1 && (
						<Button
							type='button'
							onClick={() => goToTab(tabOrder[currentIndex + 1])}
						>
							Next
						</Button>
					)}
				</div>
			</div>
		);
	};

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

		const hasVisitedAllTabs = tabOrder.every((tab) => visitedTabs.has(tab));

		if (!hasVisitedAllTabs) {
			const nextTab = tabOrder.find((tab) => !visitedTabs.has(tab));
			if (nextTab) {
				goToTab(nextTab);
			}

			toast({
				title: 'Review Required Sections',
				description:
					'Please review each tab of the form before submitting your request.',
				variant: 'destructive',
			});
			return;
		}

		const payload: DemoFormSubmitPayload = {
			...formData,
			supportingFiles,
		};

		onSubmit(payload);
	};

	const handleInputChange = (field: keyof DemoFormFields, value: string) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

	const handleFiles = (files: FileList | null) => {
		if (!files?.length) {
			return;
		}

		const incoming = Array.from(files);
		const valid: File[] = [];
		const rejected: string[] = [];

		incoming.forEach((file) => {
			const extension = file.name.split('.').pop()?.toLowerCase();
			if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
				rejected.push(file.name);
				return;
			}
			valid.push(file);
		});

		if (rejected.length) {
			toast({
				title: 'Unsupported file export type',
				description: `The following files were skipped: ${rejected.join(
					', '
				)}. Allowed types: ${ACCEPTED_EXTENSIONS.join(', ')}.`,
				variant: 'destructive',
			});
		}

		if (valid.length) {
			setSupportingFiles((prev) => {
				const existingKeys = new Set(
					prev.map((file) => `${file.name}-${file.lastModified}`)
				);
				const deduped = valid.filter(
					(file) =>
						!existingKeys.has(`${file.name}-${file.lastModified}`)
				);
				return [...prev, ...deduped];
			});
		}
	};

	const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		handleFiles(event.target.files);
		event.target.value = '';
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);
		handleFiles(event.dataTransfer?.files ?? null);
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleRemoveFile = (index: number) => {
		setSupportingFiles((prev) => prev.filter((_, idx) => idx !== index));
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
					<Tabs
						value={activeTab}
						onValueChange={handleTabChange}
						className='w-full'
					>
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
								<Label>Supporting Documents</Label>
								<div
									onClick={() =>
										fileInputRef.current?.click()
									}
									onDragOver={handleDragOver}
									onDragEnter={() => setIsDragging(true)}
									onDragLeave={() => setIsDragging(false)}
									onDrop={handleDrop}
									className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-500 px-4 py-6 text-center transition-colors cursor-pointer ${
										isDragging
											? 'border-primary bg-primary/5'
											: 'border-border'
									}`}
								>
									<span className='text-sm font-medium text-white'>
										Drop files here or click to upload
									</span>
									<span className='text-xs text-muted-white'>
										PDF, JPG, JPEG, JSON, CSV, XLSX
									</span>
								</div>
								<input
									ref={fileInputRef}
									type='file'
									multiple
									accept={ACCEPT_ATTRIBUTE}
									onChange={handleFileInputChange}
									className='hidden'
								/>

								{supportingFiles.length > 0 && (
									<ul className='space-y-1 rounded-md border border-border bg-muted/40 p-3 text-sm text-white'>
										{supportingFiles.map((file, index) => (
											<li
												key={`${file.name}-${file.lastModified}`}
												className='flex items-center justify-between gap-2'
											>
												<span className='truncate'>
													{file.name}
												</span>
												<Button
													type='button'
													variant='ghost'
													size='icon'
													onClick={() =>
														handleRemoveFile(index)
													}
												>
													<X className='h-4 w-4' />
												</Button>
											</li>
										))}
									</ul>
								)}
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='developmentStage'>
										Development Stage *
									</Label>
									<Select
										value={formData.developmentStage}
										onValueChange={(value) =>
											handleInputChange(
												'developmentStage',
												value
											)
										}
									>
										<SelectTrigger className='text-black'>
											<SelectValue placeholder='Select product type' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='discovery'>
												Discovery
											</SelectItem>
											<SelectItem value='preclinical-studies'>
												Preclinical Studies
											</SelectItem>
											<SelectItem value='first-regulatory-filing'>
												First Regulatory Filing
											</SelectItem>
											<SelectItem value='clinical-trials-phase-I'>
												Clinical Trials Phase I
											</SelectItem>
											<SelectItem value='clinical-trials-phase-II'>
												Clinical Trials Phase II
											</SelectItem>
											<SelectItem value='clinical-trials-phase-III'>
												Clinical Trials Phase III
											</SelectItem>
											<SelectItem value='regulatory-filing-for-approval'>
												Regulatory Filing For Approval
											</SelectItem>
											<SelectItem value='access-to-drug'>
												Access To Drug
											</SelectItem>
											<SelectItem value='post-approval-studies'>
												Post Approval Studies
											</SelectItem>
										</SelectContent>
									</Select>
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
							{renderTabNavigation('basic')}
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
							{renderTabNavigation('demographics')}
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

							{/* <div className='space-y-2'>
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
							</div>*/}
							{renderTabNavigation('mechanism')} 
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
							{renderTabNavigation('safety')}
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
						className={`w-full ${
							activeTab === tabOrder[tabOrder.length - 1]
								? 'block'
								: 'hidden'
						}`}
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
