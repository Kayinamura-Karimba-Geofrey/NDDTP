import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUsers, FiBox, FiTruck, FiArchive, FiShoppingCart, FiFileText, FiUser, FiSettings } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const SEARCH_CATEGORIES = [
  { id: 'personnel', label: 'Personnel', icon: FiUsers, path: '/personnel/dashboard' },
  { id: 'assets', label: 'Assets', icon: FiBox, path: '/assets' },
  { id: 'vehicles', label: 'Vehicles', icon: FiTruck, path: '/fleet' },
  { id: 'inventory', label: 'Inventory', icon: FiArchive, path: '/inventory' },
  { id: 'suppliers', label: 'Suppliers', icon: FiShoppingCart, path: '/procurement' },
  { id: 'documents', label: 'Documents', icon: FiFileText, path: '/documents' },
  { id: 'reports', label: 'Reports', icon: FiFileText, path: '/reports' },
  { id: 'users', label: 'Users', icon: FiUser, path: '/users' },
  { id: 'settings', label: 'Settings', icon: FiSettings, path: '/settings' },
] as const;

const SAMPLE_RESULTS = [
  { id: '1', title: 'Cpt. Niyonsenga — Personnel Record', category: 'personnel', path: '/personnel' },
  { id: '2', title: 'Vehicle MOD-FLT-042', category: 'vehicles', path: '/fleet' },
  { id: '3', title: 'Q2 Expenditure Report', category: 'reports', path: '/reports' },
];

export function GlobalSearchWidget() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = SAMPLE_RESULTS.filter((r) => {
    const matchesQuery = !query || r.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || r.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <Card>
      <CardHeader className="border-b border-border pb-3">
        <CardTitle className="text-sm">Global Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personnel, assets, reports..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Dashboard search"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>All</FilterChip>
          {SEARCH_CATEGORIES.map((cat) => (
            <FilterChip key={cat.id} active={category === cat.id} onClick={() => setCategory(cat.id)}>
              {cat.label}
            </FilterChip>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results. Try a different term or category.</p>
          ) : (
            filtered.map((result) => {
              const cat = SEARCH_CATEGORIES.find((c) => c.id === result.category);
              const Icon = cat?.icon ?? FiSearch;
              return (
                <Link
                  key={result.id}
                  to={result.path}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{result.title}</p>
                    <p className="text-xs capitalize text-muted-foreground">{result.category}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <Link to="/search" className="block text-center text-sm font-medium text-foreground hover:underline">
          Open advanced search
        </Link>
      </CardContent>
    </Card>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}
