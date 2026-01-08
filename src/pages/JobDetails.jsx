import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { formatDate } from '../utils/helpers';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, applyForJob, hasApplied } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-12 max-w-md animate-scale-in">
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')} size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">Browse Jobs</Button>
        </div>
      </div>
    );
  }

  const alreadyApplied = user ? hasApplied(job.id, user.id) : false;

  const handleApplyClick = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }

    if (user.role !== 'jobseeker') {
      alert('Only job seekers can apply for jobs');
      return;
    }

    setShowModal(true);
  };

  const handleSubmitApplication = () => {
    setApplying(true);
    
    const result = applyForJob(job.id, user.id, {
      userName: user.name,
      userEmail: user.email,
      coverLetter,
      resume: user.resume || 'https://example.com/resume.pdf'
    });

    setApplying(false);

    if (result.success) {
      setShowModal(false);
      alert('Application submitted successfully!');
      navigate('/applied-jobs');
    } else {
      alert(result.message);
    }
  };

  const getJobTypeBadgeVariant = (type) => {
    switch (type) {
      case 'Full-time':
        return 'primary';
      case 'Part-time':
        return 'info';
      case 'Contract':
        return 'warning';
      case 'Internship':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6 group transition-all transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Jobs</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900 text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">{job.title}</h1>
                  <p className="text-xl text-primary-100">{job.company}</p>
                </div>
                <Badge variant={getJobTypeBadgeVariant(job.type)} size="lg" className="bg-white bg-opacity-20 backdrop-blur-sm">
                  {job.type}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Posted {formatDate(job.postedDate)}</span>
                </div>
                <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">{job.applicants} applicants</span>
                </div>
              </div>

              {!alreadyApplied ? (
                <Button onClick={handleApplyClick} size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  Apply Now
                </Button>
              ) : (
                <Button variant="outline" size="lg" disabled className="border-2 border-white text-white cursor-not-allowed opacity-75">
                  Already Applied
                </Button>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Job Description */}
            <div className="mb-8 animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.requirements}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Required Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Apply for this job">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Tell the employer why you're a great fit for this role..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              Your profile information (name, email, resume) will be shared with the employer.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitApplication} disabled={applying}>
              {applying ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetails;
