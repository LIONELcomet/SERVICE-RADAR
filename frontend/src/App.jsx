import { useState, useEffect } from 'react';
import './App.css';

// Floating Background SVGs
const ScooterIcon = () => (
  <svg viewBox="0 0 24 24" className="bg-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M17 15H5v-4h4V6h4v5h5l2 4z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="bg-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" className="bg-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.5 3l-7.16 2.55L6.5 3 3.5 4.5v15l7.16-2.55L17.5 21l3-1.5v-15zM15 19l-6-2V5l6 2v12z" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" className="bg-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 11V5h-6v16h12v-9h-6z" />
    <path d="M9 11H3v10h6V11z" />
  </svg>
);

const RadarSignalIcon = () => (
  <svg viewBox="0 0 24 24" className="bg-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

// Category SVGs
const FoodIcon = () => (
  <svg viewBox="0 0 24 24" className="cat-icon">
    <path d="M4 12v-2c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v2H4zm0 0h16M4 12v4c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClothesIcon = () => (
  <svg viewBox="0 0 24 24" className="cat-icon">
    <path d="M8 3L4 6v14h16V6l-4-3H8z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 3c0 2 1.5 3 4 3s4-1 4-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LogisticsIcon = () => (
  <svg viewBox="0 0 24 24" className="cat-icon">
    <path d="M3 6h12v12H3V6zm12 4h4l3 3v5h-7v-8z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
const TaxiIcon = () => (
  <svg viewBox="0 0 24 24" className="cat-icon">
    <path d="M5 10l2-4h10l2 4M3 10h18v6H3v-6zm3 4h2v2H6v-2zm10 0h2v2h-2v-2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getCatIcon = (name) => {
  if (name.includes('Food')) return <FoodIcon />;
  if (name.includes('Clothes')) return <ClothesIcon />;
  if (name.includes('Logistics')) return <LogisticsIcon />;
  if (name.includes('Taxi')) return <TaxiIcon />;
  return <PinIcon />;
};

const RadarBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate exactly 30 background elements for the radar utilizing abstract outline icons
    const types = ['scooter', 'pin', 'map', 'building', 'radar'];
    const depths = ['depth-far', 'depth-mid', 'depth-near'];
    const anims = ['anim-1', 'anim-2', 'anim-3'];

    // Seeded pseudo-randomly
    const generated = Array.from({ length: 30 }).map((_, i) => {
      const rand1 = ((i * 13) % 100) / 100;
      const rand2 = ((i * 37) % 100) / 100;
      const rand3 = ((i * 17) % 100) / 100;

      const type = types[Math.floor(rand1 * types.length)];
      const depth = depths[Math.floor(rand3 * depths.length)];
      const anim = anims[i % anims.length];

      const top = 5 + rand1 * 90;
      const left = 5 + rand2 * 90;
      const animDelay = -(rand3 * 30);
      const fadeDur = 6 + (rand1 * 8);

      return { id: i, type, depth, anim, top, left, animDelay, fadeDur };
    });

    setElements(generated);
  }, []);

  return (
    <>
      <div className="radar-bg"></div>
      <div className="scanlines-overlay"></div>
      {elements.map(el => (
        <div
          key={el.id}
          className={`floating-item ${el.depth} ${el.anim}`}
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            animationDelay: `${el.animDelay}s`,
            animationDuration: '30s'
          }}
        >
          <div style={{
            animation: `signal-fade ${el.fadeDur}s infinite alternate ease-in-out`,
            animationDelay: `${el.animDelay}s`
          }}>
            {el.type === 'scooter' && <ScooterIcon />}
            {el.type === 'pin' && <PinIcon />}
            {el.type === 'map' && <MapIcon />}
            {el.type === 'building' && <BuildingIcon />}
            {el.type === 'radar' && <RadarSignalIcon />}
          </div>
        </div>
      ))}
    </>
  );
};

const Header = () => (
  <header>
    <h1>SERVICE <span className="glitch-flicker">RADAR</span></h1>
    <p>CHECK WHETHER THE APP SUPPORTS YOUR LOCATION</p>
  </header>
);

const AppCard = ({ app }) => {
  const isAvail = app.isAvailable;

  return (
    <div className="app-card" style={!isAvail ? { borderColor: 'var(--text-secondary)' } : {}}>
      <div className="app-row">
        <img
          src={app.logo}
          alt={app.name}
          className="app-logo"
          style={!isAvail ? { filter: 'grayscale(100%) opacity(0.6)', borderColor: 'var(--text-secondary)' } : {}}
        />
        <span className="app-name" style={!isAvail ? { color: 'var(--text-secondary)' } : {}}>
          {app.name.toUpperCase()}
        </span>
      </div>
      <div className="app-row indented">
        {isAvail ? (
          <span className="status-available">AVAILABLE</span>
        ) : (
          <span style={{ color: 'var(--text-secondary)' }}>NOT AVAILABLE</span>
        )}
      </div>
      <div className="app-row indented actions">
        {app.android && <a href={app.android} target="_blank" rel="noreferrer" className="retro-btn install-btn" style={!isAvail ? { pointerEvents: 'none', opacity: 0.3, borderColor: 'var(--text-secondary)' } : {}}>[ INSTALL (AND) ]</a>}
        {app.ios && !app.android && <a href={app.ios} target="_blank" rel="noreferrer" className="retro-btn install-btn" style={!isAvail ? { pointerEvents: 'none', opacity: 0.3, borderColor: 'var(--text-secondary)' } : {}}>[ INSTALL (IOS) ]</a>}
      </div>
    </div>
  );
};

const CategorySelector = ({ categories, selectedCategory, onSelect }) => (
  <div className="category-selector">
    {categories.map(cat => (
      <button
        key={cat}
        className={`retro-btn cat-btn ${selectedCategory === cat ? 'selected' : ''}`}
        onClick={(e) => { e.preventDefault(); onSelect(cat); }}
      >
        <div className="cat-bg-pattern"></div>
        <div className="cat-content">
          {getCatIcon(cat)}
          <span style={{ fontSize: '0.8rem' }}>[ {cat.toUpperCase()} ]</span>
        </div>
      </button>
    ))}
  </div>
);

const SearchBox = ({
  location, setLocation,
  searchType, setSearchType,
  searchApp, setSearchApp,
  onSubmit, loading,
  categories, selectedCategory, setSelectedCategory
}) => (
  <div className="search-section">
    <CategorySelector
      categories={categories}
      selectedCategory={selectedCategory}
      onSelect={setSelectedCategory}
    />

    <div className="toggle-options">
      <div
        className={`toggle-wrapper ${searchType === 'ALL' ? 'selected' : ''}`}
        onClick={() => setSearchType('ALL')}
      >
        <span className="toggle-indicator">➤</span>
        <button className={`retro-btn ${searchType === 'ALL' ? 'selected' : ''}`}>
          [ ALL APPS - LOCATION ]
        </button>
      </div>

      <div
        className={`toggle-wrapper ${searchType === 'PARTICULAR' ? 'selected' : ''}`}
        onClick={() => setSearchType('PARTICULAR')}
      >
        <span className="toggle-indicator">➤</span>
        <button className={`retro-btn ${searchType === 'PARTICULAR' ? 'selected' : ''}`}>
          [ PARTICULAR APP - LOCATION ]
        </button>
      </div>
    </div>

    <form onSubmit={onSubmit} className="inputs-container">
      <div className="input-group">
        <div className="input-row">
          <span>&gt; LOC:</span>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="ENTER CITY / PINCODE..."
            className="retro-input"
            autoFocus
          />
          <span className="blinking-cursor">_</span>
        </div>
        <div className="input-help">&gt; EX: 600001 / CHENNAI</div>
      </div>

      {searchType === 'PARTICULAR' && (
        <div className="input-group">
          <div className="input-row">
            <span>&gt; APP:</span>
            <input
              type="text"
              value={searchApp}
              onChange={e => setSearchApp(e.target.value)}
              placeholder="SEARCH APP (OPTIONAL)..."
              className="retro-input"
            />
            <span className="blinking-cursor">_</span>
          </div>
          <div className="input-help">&gt; EX: ZOMATO / SWIGGY / UBER</div>
        </div>
      )}

      <button type="submit" disabled={loading} className="retro-btn submit-btn">
        [ EXECUTE SEARCH ]
      </button>
    </form>
  </div>
);

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [location, setLocation] = useState('');
  const [searchApp, setSearchApp] = useState('');

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0]);
      })
      .catch(err => {
        console.error("ERR: FAILED TO LOAD CATEGORIES", err);
        setCategories(['Food Delivery', 'Clothes / Shopping', 'Logistics', 'Taxi / Ride Booking']);
        setSelectedCategory('Food Delivery');
      });
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!location.trim()) {
      setError('ERR: LOCATION PARAMETER MISSING');
      return;
    }
    setError('');
    setLoading(true);
    setSearched(true);
    setApps([]);

    try {
      let url = `http://localhost:3001/check?location=${encodeURIComponent(location)}&category=${encodeURIComponent(selectedCategory)}`;
      if (searchType === 'PARTICULAR' && searchApp.trim()) {
        url += `&app=${encodeURIComponent(searchApp)}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('ERR: SYSTEM FETCH FAILURE');
      }
      const data = await res.json();
      setApps(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RadarBackground />
      <div className="app-container">
        <Header />

        <main>
          <SearchBox
            location={location} setLocation={setLocation}
            searchType={searchType} setSearchType={setSearchType}
            searchApp={searchApp} setSearchApp={setSearchApp}
            onSubmit={handleSearch} loading={loading}
            categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          />

          <div className="output-console">
            {error && <div className="error-text">{error}</div>}

            {loading && (
              <div className="error-text" style={{ textAlign: 'left', color: '#fff' }}>
                <span className="typing-anim">&gt; CHECKING AVAILABILITY...</span>
              </div>
            )}

            {searched && !loading && !error && (
              <div className="results-container">
                <div style={{ color: '#aaa', marginBottom: '1rem' }}>
                  &gt; SYSTEM RESPONSE: {apps.length} BITS FOUND IN SCAN
                </div>
                <div className="cards-grid">
                  {apps.length === 0 ? (
                    <div className="error-text">ERR: NO SYSTEMS AVAILABLE</div>
                  ) : (
                    apps.map(app => <AppCard key={app.id} app={app} />)
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
