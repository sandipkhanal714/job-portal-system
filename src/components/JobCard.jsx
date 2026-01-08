import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from './Badge';
import Button from './Button';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';

const JobCard = ({ job, showApplyButton = true }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${job.id}` } });
      return;
    }
    
    navigate(`/jobs/${job.id}`);
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
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-primary-400 hover:-translate-y-1 group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
            {job.title}
          </h3>
          <p className="text-gray-600 mt-1">{job.company}</p>
        </div>
        <Badge variant={getJobTypeBadgeVariant(job.type)}>{job.type}</Badge>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.salary}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(job.postedDate)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {job.applicants} {job.applicants === 1 ? 'applicant' : 'applicants'}
        </span>
        {showApplyButton && (
          <Button
            onClick={handleApply}
            size="sm"
            variant="primary"
          >
            View Details
          </Button>
        )}
      </div>
    </Link>
  );
};

export default JobCard;
