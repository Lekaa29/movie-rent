import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { vhsAPI } from '../services/api';
import VhsCard from '../components/VhsCard';

const Home = () => {
  const [vhsList, setVhsList] = useState([]);
  const [filteredVhsList, setFilteredVhsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState('title-asc');

  useEffect(() => {
    loadVhs();
    loadGenres();
  }, []);

  // Apply filters and sorting whenever relevant state changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [vhsList, selectedGenre, selectedYear, selectedCondition, sortOrder, searchTerm]);

  const loadVhs = async () => {
    try {
      const response = await vhsAPI.filter({
        title: searchTerm,
        genre: selectedGenre,
        year: selectedYear,
        available: selectedCondition === 'available'
      }); 
      setVhsList(response.data);
    } catch (error) {
      console.error('Error loading VHS:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const response = await vhsAPI.getGenres();
      setGenres(response.data);
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...vhsList];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(vhs => 
        vhs.title?.toLowerCase().includes(searchLower) ||
        vhs.director?.toLowerCase().includes(searchLower) ||
        vhs.genre?.toLowerCase().includes(searchLower)
      );
    }

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter(vhs => vhs.genre === selectedGenre);
    }

    // Apply year filter
    if (selectedYear) {
      const yearNum = parseInt(selectedYear);
      filtered = filtered.filter(vhs => {
        const vhsYear = parseInt(vhs.year);
        return vhsYear >= yearNum && vhsYear < yearNum + 10;
      });
    }

    // Apply condition filter
    if (selectedCondition) {
      filtered = filtered.filter(vhs => vhs.condition === selectedCondition);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        case 'year-asc':
          return (a.year || 0) - (b.year || 0);
        case 'year-desc':
          return (b.year || 0) - (a.year || 0);
        case 'price-asc':
          return (a.rentalPrice || 0) - (b.rentalPrice || 0);
        case 'price-desc':
          return (b.rentalPrice || 0) - (a.rentalPrice || 0);
        default:
          return 0;
      }
    });

    setFilteredVhsList(filtered);
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedCondition('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://img.buzzfeed.com/buzzfeed-static/static/2019-01/10/11/asset/buzzfeed-prod-web-01/sub-buzz-7862-1547137411-7.jpg)'
          }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/75 to-black/60"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8">
            RENT CLASSIC
            <br />
            MOVIES
            <br />
            WITH EASE
          </h1>
          <div className="w-32 h-1 bg-white mx-auto"></div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full"></div>
          </div>
        </div>
      </section>

     {/* Collection Section */}
<section className="max-w-7xl mx-auto px-6 py-16">
  {/* Search and Controls */}
  <div className="mb-8 space-y-6">
    {/* Search Bar */}
    <div className="rounded-2xl p-6 border border-white border-opacity-20">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white opacity-40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search classic movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-white placeholder-white placeholder-opacity-40"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 justify-center ${
            showFilters 
              ? 'border-white border-opacity-50 text-white border-2' 
              : 'border-white border-opacity-30 text-white opacity-80 hover:opacity-100'
          }`}
        >
          <SlidersHorizontal className={`w-5 h-5 transition-transform duration-300 ${
            showFilters ? 'rotate-90' : ''
          }`} />
          <span className="text-sm tracking-wide">Filters</span>
        </button>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none pl-12 pr-8 py-3 bg-transparent border border-white border-opacity-30 rounded-xl focus:outline-none focus:border-opacity-50 cursor-pointer transition-all duration-300 text-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem'
            }}
          >
            <option value="title-asc" className="bg-black">Title A-Z</option>
            <option value="title-desc" className="bg-black">Title Z-A</option>
            <option value="year-asc" className="bg-black">Year ↑</option>
            <option value="year-desc" className="bg-black">Year ↓</option>
            <option value="price-asc" className="bg-black">Price ↑</option>
            <option value="price-desc" className="bg-black">Price ↓</option>
          </select>
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-white opacity-40 w-5 h-5 pointer-events-none" />
        </div>
      </div>
    </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="rounded-2xl p-8 border border-white border-opacity-20 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white opacity-60 mb-3">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="" className="bg-black">All Genres</option>
                    {genres.map((genre) => (
                      <option key={genre} value={genre} className="bg-black">{genre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white opacity-60 mb-3">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="" className="bg-black">All Years</option>
                    <option value="1980" className="bg-black">1980s</option>
                    <option value="1990" className="bg-black">1990s</option>
                    <option value="2000" className="bg-black">2000s</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white opacity-60 mb-3">
                    Condition
                  </label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' opacity='0.6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="" className="bg-black">All Conditions</option>
                    <option value="Excellent" className="bg-black">Excellent</option>
                    <option value="Good" className="bg-black">Good</option>
                    <option value="Fair" className="bg-black">Fair</option>
                  </select>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="text-xs uppercase tracking-wider text-white opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* VHS Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>Loading collection...</div>
        ) : (
          <div style={styles.grid}>
            {filteredVhsList.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>No VHS tapes found.</p>
            ) : (
              filteredVhsList.map((vhs) => (
                <VhsCard key={vhs.id} vhs={vhs} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
};

export default Home;