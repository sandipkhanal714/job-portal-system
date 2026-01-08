import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

const Home = () => {
  const { jobs } = useJobs();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Get featured jobs (latest 6 jobs)
  const featuredJobs = jobs.slice(0, 6);

  const handleSearch = () => {
    // Navigate to jobs page with search query
    window.location.href = `/jobs?search=${searchQuery}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
              Connect with top employers and take the next step in your career
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search for jobs, companies, or keywords..."
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold">{jobs.length}+</div>
                <div className="text-sm">Jobs Available</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Companies</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm">Job Seekers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-lg text-gray-600">
              Explore our hand-picked opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job, index) => (
              <div key={job.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <JobCard job={job} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                View All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-primary-600 group-hover:text-primary-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">Create Profile</h3>
              <p className="text-gray-600">
                Sign up and create your professional profile with your skills and experience
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-green-600 group-hover:text-green-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">Search Jobs</h3>
              <p className="text-gray-600">
                Browse through thousands of job listings and filter by your preferences
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-orange-600 group-hover:text-orange-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">Apply & Get Hired</h3>
              <p className="text-gray-600">
                Apply to jobs with one click and track your application status
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-primary-100 animate-slide-up">Join thousands of job seekers finding their perfect role</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
