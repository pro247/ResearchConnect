import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, ExternalLink, Search } from 'lucide-react';

export function Guidelines() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredResources, setFilteredResources] = useState(resources);
  const [filteredGuides, setFilteredGuides] = useState(guides);
  const navigate = useNavigate();

  const handleSearch = () => {
    const lowercasedFilter = searchInput.toLowerCase();
    const filteredResources = resources.filter(resource =>
      resource.title.toLowerCase().includes(lowercasedFilter) ||
      resource.description.toLowerCase().includes(lowercasedFilter) ||
      resource.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter))
    );
    setFilteredResources(filteredResources);

    const filteredGuides = guides.filter(guide =>
      guide.title.toLowerCase().includes(lowercasedFilter) ||
      guide.duration.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredGuides(filteredGuides);
  };

  const handleDownload = (url: string | URL | undefined) => {
    window.open(url, '_blank');
  };

  const handleFilter = (tag: string) => {
    const filteredResources = resources.filter(resource =>
      resource.tags.includes(tag)
    );
    setFilteredResources(filteredResources);
  };

  const handleGuideClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleRechAIClick = () => {
    navigate('/chatbot');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Resources</h1>
          <p className="text-gray-600 mt-2">Access guides, papers, and tools to support your research</p>
        </div>
        <button
          onClick={handleRechAIClick}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
          aria-label="Rech AI"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12l2 2 4-4"></path>
          </svg>
        </button>
      </header>

      <div className="card mb-8">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="input-field flex-1"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2 inline-block" />
            Search
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Latest Resources</h2>
          <div className="space-y-4">
            {filteredResources.map((resource, index) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer"
                          onClick={() => handleFilter(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="ml-4 p-2 text-gray-600 hover:text-gray-900"
                    onClick={() => handleDownload(resource.url)}
                  >
                    {resource.type === 'download' ? (
                      <Download className="w-5 h-5" />
                    ) : (
                      <ExternalLink className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Guides</h2>
          <div className="card divide-y">
            {filteredGuides.map((guide, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0 cursor-pointer" onClick={() => handleGuideClick(guide.url)}>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-medium">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const resources = [
  {
    title: "Research Methods Handbook",
    description: "Comprehensive guide to research methodologies and best practices",
    tags: ["Methods", "Guide", "Fundamentals"],
    type: "download",
    url: "https://southcampus.uok.edu.in/Files/Link/DownloadLink/RM%20U1%20P1.pdf"
  },
  {
    title: "Statistical Analysis Tools",
    description: "Collection of tools and templates for data analysis",
    tags: ["Statistics", "Data", "Tools"],
    type: "download",
    url: "https://www.bing.com/ck/a?!&&p=1852820cfdeb8bd4bd4517925b7439f6af11e47895d60c666546a808dec5a4cfJmltdHM9MTczMDI0NjQwMA&ptn=3&ver=2&hsh=4&fclid=08f16ada-00a9-620e-1509-7e32018a6382&psq=Statistical+Analysis+Tools&u=a1aHR0cHM6Ly9zdGF0YW5hbHl0aWNhLmNvbS9ibG9nL3N0YXRpc3RpY2FsLWFuYWx5c2lzLXRvb2xzLWZvci1kYXRhLXNjaWVuY2Uv&ntb=1"
  },
  {
    title: "Academic Writing Guidelines",
    description: "Best practices for writing research papers and proposals",
    tags: ["Writing", "Academic", "Guide"],
    type: "link",
    url: "https://www.bing.com/ck/a?!&&p=26559c5c91596b1c1dea9ecf64bc95553d25827b2f676dca8d0eacf3c2cb2553JmltdHM9MTczMDI0NjQwMA&ptn=3&ver=2&hsh=4&fclid=08f16ada-00a9-620e-1509-7e32018a6382&psq=Academic+Writing+Guidelines&u=a1aHR0cHM6Ly93aWxzb24uZmFzLmhhcnZhcmQuZWR1L2ZpbGVzL2plZmZyZXl3aWxzb24vZmlsZXMvamVmZnJleV9yLl93aWxzb25fYWNhZGVtaWNfd3JpdGluZy5wZGY&ntb=1"
  }
];

const guides = [
  {
    title: "Getting Started with Research",
    duration: "10 min read",
    url: "https://youtu.be/KsEHJGqG7EM?si=suYX5Plf3WV-_kQ1"
  },
  {
    title: "Literature Review Tips",
    duration: "15 min read",
    url: "https://example.com/literature-review-tips"
  },
  {
    title: "Data Collection Methods",
    duration: "12 min read",
    url: "https://www.jotform.com/data-collection-methods/"
  },
  {
    title: "Citation Guidelines",
    duration: "8 min read",
    url: "https://www.citationmachine.net/resources/cite-sources/how-to-cite-a-pdf/#:~:text=In%20an%20APA%20citation%2C%20cite,(separated%20by%20a%20period)."
  }
];