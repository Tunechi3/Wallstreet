import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase,
  faMapMarkerAlt,
  faClock,
  faMoneyBillWave,
  faChevronRight,
  faHeart,
  faUsers,
  faRocket,
  faGraduationCap,
  faLeaf,
  faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../career.css';

const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = [
    { id: 'all', name: 'All Positions' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'finance', name: 'Finance' },
    { id: 'operations', name: 'Operations' }
  ];

  const benefits = [
    {
      icon: faHeart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and mental health support'
    },
    {
      icon: faMoneyBillWave,
      title: 'Competitive Salary',
      description: 'Market-leading compensation packages with performance bonuses'
    },
    {
      icon: faUmbrellaBeach,
      title: 'Flexible PTO',
      description: 'Unlimited vacation policy and paid holidays'
    },
    {
      icon: faRocket,
      title: 'Career Growth',
      description: 'Clear advancement paths and professional development opportunities'
    },
    {
      icon: faGraduationCap,
      title: 'Learning Budget',
      description: '$2,000 annual budget for courses, conferences, and certifications'
    },
    {
      icon: faLeaf,
      title: 'Work-Life Balance',
      description: 'Remote-first culture with flexible working hours'
    }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'Build scalable financial systems and user-facing features for our investment platform.',
      requirements: [
        '5+ years of experience with React, Node.js, and modern web technologies',
        'Strong understanding of financial systems and security best practices',
        'Experience with microservices architecture and cloud platforms (AWS/GCP)',
        'Excellent problem-solving skills and attention to detail'
      ],
      responsibilities: [
        'Design and implement new features across the full stack',
        'Collaborate with product and design teams to deliver exceptional user experiences',
        'Optimize application performance and scalability',
        'Mentor junior engineers and contribute to technical decisions'
      ]
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $170k',
      description: 'Lead product strategy and execution for our core investment features.',
      requirements: [
        '4+ years of product management experience in fintech or financial services',
        'Strong analytical skills and data-driven decision making',
        'Experience with agile methodologies and product development lifecycle',
        'Excellent communication and stakeholder management skills'
      ],
      responsibilities: [
        'Define product roadmap and prioritize features based on user needs',
        'Work closely with engineering, design, and business teams',
        'Analyze user data and metrics to inform product decisions',
        'Drive product launches and measure success'
      ]
    },
    {
      id: 3,
      title: 'Senior UX/UI Designer',
      department: 'design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      description: 'Create intuitive and beautiful experiences for millions of investors.',
      requirements: [
        '5+ years of UX/UI design experience with a strong portfolio',
        'Proficiency in Figma, Sketch, or similar design tools',
        'Experience designing for financial or complex data-driven applications',
        'Strong understanding of design systems and accessibility standards'
      ],
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Conduct user research and usability testing',
        'Create and maintain design systems and component libraries',
        'Collaborate with product and engineering teams'
      ]
    },
    {
      id: 4,
      title: 'Growth Marketing Manager',
      department: 'marketing',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Drive user acquisition and engagement through data-driven marketing strategies.',
      requirements: [
        '3+ years of growth marketing experience in fintech or SaaS',
        'Proven track record of scaling user acquisition channels',
        'Experience with digital marketing tools and analytics platforms',
        'Strong analytical and creative problem-solving skills'
      ],
      responsibilities: [
        'Develop and execute growth marketing campaigns',
        'Optimize conversion funnels and user onboarding',
        'Manage paid acquisition channels (Google Ads, Facebook, etc.)',
        'Analyze campaign performance and provide actionable insights'
      ]
    },
    {
      id: 5,
      title: 'Financial Analyst',
      department: 'finance',
      location: 'London, UK',
      type: 'Full-time',
      salary: '£60k - £90k',
      description: 'Support financial planning, analysis, and reporting for our investment operations.',
      requirements: [
        'Bachelor\'s degree in Finance, Accounting, or related field',
        '2+ years of financial analysis experience',
        'Strong Excel/Google Sheets skills and financial modeling expertise',
        'CFA or similar certification preferred'
      ],
      responsibilities: [
        'Prepare financial reports and forecasts',
        'Analyze investment performance and profitability',
        'Support budgeting and strategic planning initiatives',
        'Collaborate with operations and product teams'
      ]
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $160k',
      description: 'Build and maintain infrastructure for our high-availability investment platform.',
      requirements: [
        '4+ years of DevOps or infrastructure engineering experience',
        'Strong knowledge of AWS/GCP, Kubernetes, and CI/CD pipelines',
        'Experience with infrastructure as code (Terraform, CloudFormation)',
        'Security-first mindset and experience with compliance requirements'
      ],
      responsibilities: [
        'Design and maintain cloud infrastructure',
        'Implement monitoring, logging, and alerting systems',
        'Automate deployment processes and improve CI/CD pipelines',
        'Ensure system reliability and security'
      ]
    },
    {
      id: 7,
      title: 'Customer Success Manager',
      department: 'operations',
      location: 'Toronto, CA',
      type: 'Full-time',
      salary: '$70k - $95k',
      description: 'Help our investors succeed by providing exceptional support and guidance.',
      requirements: [
        '2+ years of customer success or account management experience',
        'Excellent communication and interpersonal skills',
        'Knowledge of financial products and investment strategies',
        'Problem-solving mindset and empathy for user needs'
      ],
      responsibilities: [
        'Onboard new investors and provide ongoing support',
        'Resolve customer issues and escalations',
        'Gather user feedback to improve products',
        'Build strong relationships with high-value clients'
      ]
    },
    {
      id: 8,
      title: 'Data Scientist',
      department: 'engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $180k',
      description: 'Use data and machine learning to optimize investment strategies and user experiences.',
      requirements: [
        'Master\'s or PhD in Computer Science, Statistics, or related field',
        '3+ years of experience in data science or machine learning',
        'Proficiency in Python, SQL, and ML frameworks (TensorFlow, PyTorch)',
        'Experience with financial data and predictive modeling'
      ],
      responsibilities: [
        'Develop machine learning models for investment predictions',
        'Analyze user behavior and platform performance',
        'Build data pipelines and visualization dashboards',
        'Collaborate with product and engineering teams'
      ]
    }
  ];

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department === selectedDepartment);

  const openJobModal = (job) => {
    setSelectedJob(job);
  };

  const closeJobModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="career-page">
      <Navbar />

      {/* Hero Section */}
      <section className="career-hero">
        <div className="career-hero-container">
          <div className="career-hero-badge">
            <div className="badge-icon"></div>
            <span className="badge-text">Join Our Team</span>
          </div>
          <h1 className="career-hero-title">Build the Future of Investing</h1>
          <p className="career-hero-subtitle">
            Join a team of passionate innovators transforming how people invest and grow their wealth
          </p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="career-why">
        <div className="career-why-container">
          <div className="career-why-header">
            <h2>Why Wallstreet Trade?</h2>
            <p>We're building something special, and we want you to be part of it</p>
          </div>
          <div className="career-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="career-positions">
        <div className="career-positions-container">
          <div className="positions-header">
            <h2>Open Positions</h2>
            <p>Find your next opportunity with us</p>
          </div>

          {/* Department Filter */}
          <div className="department-filter">
            {departments.map(dept => (
              <button
                key={dept.id}
                className={`filter-btn ${selectedDepartment === dept.id ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(dept.id)}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div className="jobs-list">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card" onClick={() => openJobModal(job)}>
                <div className="job-header">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                    <span className="job-department">{departments.find(d => d.id === job.department)?.name}</span>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="job-arrow" />
                </div>
                <div className="job-meta">
                  <span className="job-meta-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {job.location}
                  </span>
                  <span className="job-meta-item">
                    <FontAwesomeIcon icon={faClock} />
                    {job.type}
                  </span>
                  <span className="job-meta-item">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    {job.salary}
                  </span>
                </div>
                <p className="job-description">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="job-modal-overlay" onClick={closeJobModal}>
          <div className="job-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeJobModal}>×</button>
            <div className="modal-header">
              <h2>{selectedJob.title}</h2>
              <div className="modal-meta">
                <span className="modal-meta-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {selectedJob.location}
                </span>
                <span className="modal-meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  {selectedJob.type}
                </span>
                <span className="modal-meta-item">
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  {selectedJob.salary}
                </span>
              </div>
            </div>
            <div className="modal-content">
              <div className="modal-section">
                <h3>About the Role</h3>
                <p>{selectedJob.description}</p>
              </div>
              <div className="modal-section">
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-section">
                <h3>Responsibilities</h3>
                <ul>
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <a href={`mailto:careers@wallstreettrade.com?subject=Application for ${selectedJob.title}`} className="apply-btn">
                Apply for this Position
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Career;