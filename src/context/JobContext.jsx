import React, { createContext, useState, useEffect } from 'react';
import { mockJobs, mockApplications } from '../utils/mockData';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data from mock data
  useEffect(() => {
    // Load from localStorage or use mock data
    const storedJobs = localStorage.getItem('jobs');
    const storedApplications = localStorage.getItem('applications');

    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      setJobs(mockJobs);
      localStorage.setItem('jobs', JSON.stringify(mockJobs));
    }

    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      setApplications(mockApplications);
      localStorage.setItem('applications', JSON.stringify(mockApplications));
    }

    setLoading(false);
  }, []);

  // Get all jobs
  const getAllJobs = () => {
    return jobs;
  };

  // Get job by ID
  const getJobById = (id) => {
    return jobs.find(job => job.id === parseInt(id));
  };

  // Get jobs by recruiter
  const getJobsByRecruiter = (recruiterId) => {
    return jobs.filter(job => job.recruiterId === recruiterId);
  };

  // Post a new job
  const postJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0
    };

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return { success: true, job: newJob };
  };

  // Update job
  const updateJob = (id, jobData) => {
    const updatedJobs = jobs.map(job =>
      job.id === id ? { ...job, ...jobData } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return { success: true };
  };

  // Delete job
  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    return { success: true };
  };

  // Apply for a job
  const applyForJob = (jobId, userId, applicationData) => {
    // Check if already applied
    const existingApplication = applications.find(
      app => app.jobId === jobId && app.userId === userId
    );

    if (existingApplication) {
      return { success: false, message: 'You have already applied for this job' };
    }

    const job = getJobById(jobId);
    const newApplication = {
      id: applications.length + 1,
      jobId,
      jobTitle: job.title,
      company: job.company,
      userId,
      ...applicationData,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));

    // Update job applicant count
    const updatedJobs = jobs.map(j =>
      j.id === jobId ? { ...j, applicants: j.applicants + 1 } : j
    );
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));

    return { success: true, application: newApplication };
  };

  // Get applications by user
  const getApplicationsByUser = (userId) => {
    return applications.filter(app => app.userId === userId);
  };

  // Get applications by job
  const getApplicationsByJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  // Update application status
  const updateApplicationStatus = (id, status) => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    return { success: true };
  };

  // Check if user has applied to a job
  const hasApplied = (jobId, userId) => {
    return applications.some(app => app.jobId === jobId && app.userId === userId);
  };

  const value = {
    jobs,
    applications,
    loading,
    getAllJobs,
    getJobById,
    getJobsByRecruiter,
    postJob,
    updateJob,
    deleteJob,
    applyForJob,
    getApplicationsByUser,
    getApplicationsByJob,
    updateApplicationStatus,
    hasApplied
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};
