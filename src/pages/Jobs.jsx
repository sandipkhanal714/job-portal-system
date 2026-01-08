import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { filterJobs, paginate, getTotalPages } from '../utils/helpers';

const Jobs = () => {
  const { jobs } = useJobs();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    location: 'all',
    type: 'all',
    skillsInput: '',
    skills: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  // Apply filters
  const filteredJobs = filterJobs(jobs, {
    search: searchQuery,
    location: filters.location,
    type: filters.type,
    skills: filters.skills
  });

  // Paginate
  const totalPages = getTotalPages(filteredJobs.length, jobsPerPage);
  const paginatedJobs = paginate(filteredJobs, currentPage, jobsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    if (key === 'skillsInput') {
      const skills = value.split(',').map(s => s.trim()).filter(s => s);
      setFilters({ ...filters, skillsInput: value, skills });
    } else {
      setFilters({ ...filters, [key]: value });
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      location: 'all',
      type: 'all',
      skillsInput: '',
      skills: []
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Browse Jobs</h1>
          <p className="text-xl mb-6 text-primary-100 animate-slide-up">
            Discover opportunities that match your skills and aspirations
          </p>
          <div className="max-w-4xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search by job title or company..."
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        {/* Stats Banner */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Showing Results</p>
              <p className="text-2xl font-bold text-gray-900">{filteredJobs.length} Jobs Found</p>
            </div>
            <div className="hidden sm:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{jobs.length}</div>
                <div className="text-sm text-gray-600">Total Positions</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{paginatedJobs.length}</div>
                <div className="text-sm text-gray-600">On This Page</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-4">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Job Listings */}
          <main className="lg:w-3/4">
            {paginatedJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center animate-fade-in">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters to find more opportunities</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedJobs.map((job, index) => (
                    <div key={job.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2 bg-white rounded-xl shadow-lg px-4 py-3">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 font-medium"
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={page} className="text-gray-400 font-medium">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 font-medium"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
