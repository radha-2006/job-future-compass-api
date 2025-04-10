
export interface Job {
  id: string;
  title: string;
  description: string;
  medianSalary: string;
  growthRate: string;
  requiredSkills: string[];
  futureOutlook: string;
  category: string;
}

export interface TrendData {
  category: string;
  jobs: number;
  growthRate: number;
  color: string;
}

export interface SkillAssessment {
  skill: string;
  level: number;
  relevantJobs: string[];
}

// This would typically come from a real API
// We're mocking the data for now
const mockJobsData: Job[] = [
  {
    id: "1",
    title: "AI Ethics Officer",
    description: "Ensure artificial intelligence systems are developed and deployed ethically and without harmful biases.",
    medianSalary: "$120,000",
    growthRate: "28%",
    requiredSkills: ["Ethics", "AI/ML Understanding", "Policy Development", "Critical Thinking"],
    futureOutlook: "As AI systems become more prevalent, the need for ethical oversight will grow substantially.",
    category: "AI",
  },
  {
    id: "2",
    title: "Quantum Computing Researcher",
    description: "Research and develop new quantum computing algorithms and applications.",
    medianSalary: "$150,000",
    growthRate: "22%",
    requiredSkills: ["Quantum Physics", "Linear Algebra", "Programming", "Research"],
    futureOutlook: "The field is expected to see massive growth as quantum computers become more practical.",
    category: "Quantum Computing",
  },
  {
    id: "3",
    title: "Sustainable Technology Architect",
    description: "Design technology systems that minimize environmental impact and maximize sustainability.",
    medianSalary: "$135,000",
    growthRate: "25%",
    requiredSkills: ["System Architecture", "Environmental Science", "Renewable Energy", "Lifecycle Assessment"],
    futureOutlook: "Climate concerns will drive demand for sustainability experts across all tech sectors.",
    category: "Sustainability",
  },
  {
    id: "4",
    title: "Digital Healthcare Analyst",
    description: "Analyze healthcare data to improve patient outcomes and operational efficiency.",
    medianSalary: "$115,000",
    growthRate: "32%",
    requiredSkills: ["Data Analysis", "Healthcare Knowledge", "Statistics", "Machine Learning"],
    futureOutlook: "The intersection of healthcare and technology will continue to grow rapidly.",
    category: "Healthcare",
  },
  {
    id: "5",
    title: "Augmented Reality Experience Designer",
    description: "Create immersive augmented reality experiences for entertainment, education, and business.",
    medianSalary: "$110,000",
    growthRate: "40%",
    requiredSkills: ["3D Modeling", "UX Design", "AR/VR Technologies", "Spatial Computing"],
    futureOutlook: "AR integration into daily life will drive massive job growth in this field.",
    category: "AR/VR",
  },
  {
    id: "6",
    title: "Robotic Systems Engineer",
    description: "Design and develop robotic systems for automation, manufacturing, and service industries.",
    medianSalary: "$125,000",
    growthRate: "18%",
    requiredSkills: ["Robotics", "Control Systems", "Mechanical Engineering", "Programming"],
    futureOutlook: "Automation trends will continue to drive demand for robotics expertise.",
    category: "Robotics",
  },
  {
    id: "7",
    title: "Synthetic Biology Product Manager",
    description: "Oversee the development of products using engineered biological systems.",
    medianSalary: "$140,000",
    growthRate: "23%",
    requiredSkills: ["Biology", "Product Management", "Regulatory Knowledge", "Business Strategy"],
    futureOutlook: "Biotech innovations will create many new roles combining biology and technology.",
    category: "Biotechnology",
  },
  {
    id: "8",
    title: "Blockchain Solutions Architect",
    description: "Design and implement blockchain-based systems for various applications.",
    medianSalary: "$130,000",
    growthRate: "16%",
    requiredSkills: ["Blockchain", "Cryptography", "Distributed Systems", "Software Architecture"],
    futureOutlook: "Beyond cryptocurrency, blockchain will find applications in many industries.",
    category: "Blockchain",
  }
];

const mockTrendsData: TrendData[] = [
  { category: "AI", jobs: 240, growthRate: 28, color: "#6366F1" },
  { category: "Quantum Computing", jobs: 100, growthRate: 22, color: "#8B5CF6" },
  { category: "Sustainability", jobs: 180, growthRate: 25, color: "#10B981" },
  { category: "Healthcare", jobs: 320, growthRate: 32, color: "#3B82F6" },
  { category: "AR/VR", jobs: 200, growthRate: 40, color: "#EC4899" },
  { category: "Robotics", jobs: 150, growthRate: 18, color: "#F59E0B" },
  { category: "Biotechnology", jobs: 130, growthRate: 23, color: "#06B6D4" },
  { category: "Blockchain", jobs: 110, growthRate: 16, color: "#6B7280" }
];

// This would be determined by a real assessment
const mockSkillsAssessment: SkillAssessment[] = [
  { skill: "Data Analysis", level: 8, relevantJobs: ["Digital Healthcare Analyst", "AI Ethics Officer"] },
  { skill: "Machine Learning", level: 7, relevantJobs: ["AI Ethics Officer", "Digital Healthcare Analyst"] },
  { skill: "UX Design", level: 6, relevantJobs: ["Augmented Reality Experience Designer"] },
  { skill: "Programming", level: 9, relevantJobs: ["Quantum Computing Researcher", "Robotic Systems Engineer", "Blockchain Solutions Architect"] },
  { skill: "Ethics", level: 5, relevantJobs: ["AI Ethics Officer"] }
];

// Simulating API calls with promises
export const fetchJobs = (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobsData);
    }, 800); // Simulate network delay
  });
};

export const fetchTrends = (): Promise<TrendData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrendsData);
    }, 600);
  });
};

export const fetchSkillAssessment = (): Promise<SkillAssessment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSkillsAssessment);
    }, 700);
  });
};

export const searchJobs = (query: string): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredJobs = mockJobsData.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) || 
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.category.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filteredJobs);
    }, 500);
  });
};
