interface Step {
  step: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Upload Your CV",
    description: "Start by uploading your resume in PDF or DOCX format",
  },
  {
    step: 2,
    title: "Paste a Job Description",
    description: "Add any job posting you're interested in applying for",
  },
  {
    step: 3,
    title: "Get AI Recommendations",
    description: "Receive instant analysis and tailored cover letter",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-white mb-12 text-center">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item) => (
          <div key={item.step} className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              {item.step}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
