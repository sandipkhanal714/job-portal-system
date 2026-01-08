import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { formatDate } from '../utils/helpers';

const ManageApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, getApplicationsByJob, updateApplicationStatus } = useJobs();
  
  const job = getJobById(jobId);
  const applications = getApplicationsByJob(parseInt(jobId));

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <Button onClick={() => navigate('/recruiter/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (applicationId, newStatus) => {
    const result = updateApplicationStatus(applicationId, newStatus);
    if (result.success) {
      alert(`Application ${newStatus.toLowerCase()} successfully!`);
      // Refresh the page to show updated status
      window.location.reload();
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Applied':
        return 'info';
      case 'Shortlisted':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <button
          onClick={() => navigate('/recruiter/dashboard')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.company} • {job.location}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Posted {formatDate(job.postedDate)}</span>
            <span>•</span>
            <span>{applications.length} Applications</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Applications</h2>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500">Applications for this job will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.userName}
                      </h3>
                      <p className="text-gray-600">{application.userEmail}</p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(application.status)} size="lg">
                      {application.status}
                    </Badge>
                  </div>

                  <div className="mb-4 text-sm text-gray-600">
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Applied on {formatDate(application.appliedDate)}
                    </div>
                  </div>

                  {application.coverLetter && (
                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</p>
                      <p className="text-sm text-gray-600">{application.coverLetter}</p>
                    </div>
                  )}

                  {application.resume && (
                    <div className="mb-4">
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Resume
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {application.status === 'Applied' && (
                      <>
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleStatusUpdate(application.id, 'Shortlisted')}
                        >
                          Shortlist
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleStatusUpdate(application.id, 'Rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {application.status === 'Shortlisted' && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleStatusUpdate(application.id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    )}
                    {application.status === 'Rejected' && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleStatusUpdate(application.id, 'Shortlisted')}
                      >
                        Move to Shortlist
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        {applications.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {applications.filter(app => app.status === 'Applied').length}
              </div>
              <div className="text-gray-600">New Applications</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {applications.filter(app => app.status === 'Shortlisted').length}
              </div>
              <div className="text-gray-600">Shortlisted</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {applications.filter(app => app.status === 'Rejected').length}
              </div>
              <div className="text-gray-600">Rejected</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;
