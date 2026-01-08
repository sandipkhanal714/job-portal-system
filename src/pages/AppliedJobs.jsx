import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useJobs } from '../hooks/useJobs';
import Badge from '../components/Badge';
import { formatDate } from '../utils/helpers';

const AppliedJobs = () => {
  const { user } = useAuth();
  const { getApplicationsByUser } = useJobs();
  
  const applications = getApplicationsByUser(user.id);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 mb-4">Start applying to jobs to see them here</p>
            <Link
              to="/jobs"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition"
                    >
                      {application.jobTitle}
                    </Link>
                    <p className="text-gray-600 mt-1">{application.company}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(application.status)} size="lg">
                    {application.status}
                  </Badge>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Applied on {formatDate(application.appliedDate)}
                </div>

                {application.coverLetter && (
                  <div className="bg-gray-50 rounded-md p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p>
                    <p className="text-sm text-gray-600">{application.coverLetter}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Link
                    to={`/jobs/${application.jobId}`}
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        {applications.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {applications.length}
              </div>
              <div className="text-gray-600">Total Applications</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {applications.filter(app => app.status === 'Shortlisted').length}
              </div>
              <div className="text-gray-600">Shortlisted</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {applications.filter(app => app.status === 'Applied').length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
