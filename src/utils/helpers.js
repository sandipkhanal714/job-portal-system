// Date formatting utility
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Filter jobs by search query, location, skills, and type
export const filterJobs = (jobs, filters) => {
  let filtered = [...jobs];

  // Search by title or company
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower)
    );
  }

  // Filter by location
  if (filters.location && filters.location !== 'all') {
    filtered = filtered.filter(job =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Filter by job type
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(job => job.type === filters.type);
  }

  // Filter by skills
  if (filters.skills && filters.skills.length > 0) {
    filtered = filtered.filter(job =>
      filters.skills.some(skill =>
        job.skills.some(jobSkill =>
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  }

  return filtered;
};

// Paginate array
export const paginate = (array, page, perPage) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return array.slice(start, end);
};

// Get total pages
export const getTotalPages = (total, perPage) => {
  return Math.ceil(total / perPage);
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate form fields
export const validateJobForm = (formData) => {
  const errors = {};

  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Job title is required';
  }

  if (!formData.company || formData.company.trim() === '') {
    errors.company = 'Company name is required';
  }

  if (!formData.location || formData.location.trim() === '') {
    errors.location = 'Location is required';
  }

  if (!formData.type) {
    errors.type = 'Job type is required';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Job description is required';
  }

  if (!formData.requirements || formData.requirements.trim() === '') {
    errors.requirements = 'Requirements are required';
  }

  return errors;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get unique values from array of objects
export const getUniqueValues = (array, key) => {
  return [...new Set(array.map(item => item[key]))];
};

// Sort by date
export const sortByDate = (array, key, order = 'desc') => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};
