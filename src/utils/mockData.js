// Mock Data for Jobs
export const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    description: 'We are looking for a Senior Frontend Developer with expertise in React and modern web technologies. You will be responsible for building scalable web applications and mentoring junior developers.',
    requirements: 'Bachelor\'s degree in Computer Science or related field, 5+ years of experience with React, Redux, TypeScript, and modern frontend tools.',
    skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS'],
    postedDate: '2026-01-05',
    recruiterId: 2,
    applicants: 15
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'StartupHub',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    description: 'Join our dynamic startup team as a Full Stack Developer. Work on exciting projects using modern technologies and help shape the future of our platform.',
    requirements: '3+ years experience with Node.js, React, and databases. Strong problem-solving skills and ability to work independently.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    postedDate: '2026-01-03',
    recruiterId: 2,
    applicants: 23
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80k - $100k',
    description: 'We need a talented UI/UX Designer to create beautiful and intuitive user interfaces. You will work closely with developers and product managers.',
    requirements: 'Portfolio demonstrating strong UI/UX skills, proficiency in Figma and Adobe Creative Suite, 2+ years of experience.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    postedDate: '2026-01-06',
    recruiterId: 2,
    applicants: 8
  },
  {
    id: 4,
    title: 'Backend Engineer',
    company: 'DataSystems Corp',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $150k',
    description: 'Looking for an experienced Backend Engineer to design and implement scalable backend services. Strong knowledge of system design and databases required.',
    requirements: '4+ years experience with Python/Java, microservices architecture, SQL and NoSQL databases.',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    postedDate: '2026-01-04',
    recruiterId: 2,
    applicants: 12
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $170k',
    description: 'We are seeking a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with Kubernetes and AWS is essential.',
    requirements: '5+ years in DevOps, strong knowledge of AWS, Docker, Kubernetes, and infrastructure as code.',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    postedDate: '2026-01-07',
    recruiterId: 2,
    applicants: 10
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'MobileFirst Inc.',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$90k - $120k',
    description: 'Join our team to build cutting-edge mobile applications for iOS and Android. Experience with React Native or Flutter required.',
    requirements: '3+ years of mobile development experience, proficiency in React Native or Flutter.',
    skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
    postedDate: '2026-01-02',
    recruiterId: 2,
    applicants: 18
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140k - $180k',
    description: 'We are looking for a Data Scientist to analyze large datasets and build machine learning models to solve complex business problems.',
    requirements: 'PhD or Master\'s in Computer Science, Statistics, or related field. 3+ years of experience with Python, ML frameworks.',
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Statistics'],
    postedDate: '2026-01-01',
    recruiterId: 2,
    applicants: 25
  },
  {
    id: 8,
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to define product vision and strategy.',
    requirements: '5+ years of product management experience, strong analytical and communication skills.',
    skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
    postedDate: '2025-12-30',
    recruiterId: 2,
    applicants: 14
  }
];

// Mock Data for Users
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'jobseeker',
    phone: '+1 234-567-8900',
    location: 'San Francisco, CA',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
    experience: '5 years',
    education: 'B.S. Computer Science, Stanford University',
    resume: 'https://example.com/resume/john-doe.pdf',
    bio: 'Passionate frontend developer with 5 years of experience building scalable web applications.',
    createdAt: '2025-06-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@company.com',
    password: 'recruiter123',
    role: 'recruiter',
    company: 'TechCorp Inc.',
    phone: '+1 234-567-8901',
    location: 'San Francisco, CA',
    createdAt: '2025-08-20'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@sakshamrojgar.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2025-01-01'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'jobseeker',
    phone: '+1 234-567-8902',
    location: 'New York, NY',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
    experience: '3 years',
    education: 'B.A. Design, Parsons School of Design',
    resume: 'https://example.com/resume/sarah-johnson.pdf',
    bio: 'Creative UI/UX designer focused on creating beautiful and intuitive user experiences.',
    createdAt: '2025-09-10'
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@example.com',
    password: 'password123',
    role: 'jobseeker',
    phone: '+1 234-567-8903',
    location: 'Austin, TX',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    experience: '4 years',
    education: 'M.S. Computer Science, MIT',
    resume: 'https://example.com/resume/michael-brown.pdf',
    bio: 'Backend engineer with expertise in building scalable microservices architectures.',
    createdAt: '2025-07-22'
  }
];

// Mock Data for Applications
export const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    status: 'Applied',
    appliedDate: '2026-01-06',
    coverLetter: 'I am very interested in this position and believe my skills align perfectly with your requirements.',
    resume: 'https://example.com/resume/john-doe.pdf'
  },
  {
    id: 2,
    jobId: 3,
    jobTitle: 'UI/UX Designer',
    company: 'Creative Agency',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    status: 'Shortlisted',
    appliedDate: '2026-01-07',
    coverLetter: 'I have a strong passion for design and would love to contribute to your team.',
    resume: 'https://example.com/resume/john-doe.pdf'
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: 'Full Stack Developer',
    company: 'StartupHub',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    status: 'Rejected',
    appliedDate: '2026-01-04',
    coverLetter: 'I am excited about the opportunity to work with your startup.',
    resume: 'https://example.com/resume/john-doe.pdf'
  },
  {
    id: 4,
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    userId: 4,
    userName: 'Sarah Johnson',
    userEmail: 'sarah@example.com',
    status: 'Applied',
    appliedDate: '2026-01-07',
    coverLetter: 'Looking forward to joining your team and contributing my frontend skills.',
    resume: 'https://example.com/resume/sarah-johnson.pdf'
  },
  {
    id: 5,
    jobId: 4,
    jobTitle: 'Backend Engineer',
    company: 'DataSystems Corp',
    userId: 5,
    userName: 'Michael Brown',
    userEmail: 'michael@example.com',
    status: 'Shortlisted',
    appliedDate: '2026-01-05',
    coverLetter: 'I have extensive experience with backend systems and would be a great fit.',
    resume: 'https://example.com/resume/michael-brown.pdf'
  }
];
