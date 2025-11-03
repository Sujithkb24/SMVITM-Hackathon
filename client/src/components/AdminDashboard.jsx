// Dashboard.jsx
import React, { useState } from 'react';
import {
  Home,
  MessageSquare,
  FileText,
  Settings,
  Lock,
  LogOut,
  Search,
  Bell,
  User,
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-white/90 shadow"
          aria-label="Open menu"
        >
          <span className="text-xl">☰</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-teal-700 font-bold text-lg">⚡</span>
          </div>
          <span className="font-bold">Logo Here</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 m-6 p-6 bg-gradient-to-b from-teal-700 to-teal-900 text-white rounded-3xl shadow-2xl h-[calc(100vh-48px)]">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-teal-700 font-bold text-xl">⚡</span>
              </div>
              <span className="font-bold text-lg">Logo Here</span>
            </div>
            <nav className="space-y-2">
              <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <NavItem icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
              <NavItem icon={<FileText size={20} />} label="Report" active={activeTab === 'report'} onClick={() => setActiveTab('report')} />
              <NavItem icon={<Settings size={20} />} label="Setting" active={activeTab === 'setting'} onClick={() => setActiveTab('setting')} />
              <NavItem icon={<Lock size={20} />} label="Privacy" active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} />
            </nav>
          </div>

          {/* Logout aligned to bottom */}
          <div className="mt-auto">
            <button className="w-full bg-white text-teal-700 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-teal-50 transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar (overlay) */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-teal-700 to-teal-900 text-white p-6 overflow-auto flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-teal-700 font-bold text-xl">⚡</span>
                </div>
                <span className="font-bold text-lg">Logo Here</span>
                <button className="ml-auto p-1" onClick={() => setMobileOpen(false)}>✕</button>
              </div>
              <nav className="space-y-2">
                <NavItem icon={<Home size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setMobileOpen(false); }} />
                <NavItem icon={<MessageSquare size={20} />} label="Messages" active={activeTab === 'messages'} onClick={() => { setActiveTab('messages'); setMobileOpen(false); }} />
                <NavItem icon={<FileText size={20} />} label="Report" active={activeTab === 'report'} onClick={() => { setActiveTab('report'); setMobileOpen(false); }} />
                <NavItem icon={<Settings size={20} />} label="Setting" active={activeTab === 'setting'} onClick={() => { setActiveTab('setting'); setMobileOpen(false); }} />
                <NavItem icon={<Lock size={20} />} label="Privacy" active={activeTab === 'privacy'} onClick={() => { setActiveTab('privacy'); setMobileOpen(false); }} />
              </nav>

              <div className="mt-auto">
                <button className="w-full bg-white text-teal-700 py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-teal-50 transition mt-6">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="bg-white/80 backdrop-blur rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 min-h-[80vh]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <div className="relative w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 border-2 border-dashed border-teal-600 rounded-lg hover:bg-teal-50">
                  <span className="text-teal-600">+</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                  <User size={20} />
                </button>
              </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Chart */}
              <div className="md:col-span-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
                  <h2 className="text-lg font-semibold text-gray-700">Analytics</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-1 bg-teal-600 text-white rounded-full text-sm">All</button>
                    <button className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm">3 Months</button>
                  </div>
                </div>

                {/* Bar Chart - responsive container */}
                <div className="w-full h-56 md:h-64 flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
                  <BarGroup month="October" values={[40, 50, 30, 35]} />
                  <BarGroup month="November" values={[70, 50, 40, 60]} />
                  <BarGroup month="December" values={[35, 30, 60, 25]} />
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <MetricCard label="Visitors" value="12.9K" subValue="212.9K" trend="up" percentage="65%" time="1m 45s" />
                  <div className="grid grid-cols-3 gap-4">
                    <CircularProgress percentage={66} label="Lorem Ipsum" value="223" color="yellow" />
                    <CircularProgress percentage={40} label="Lorem Ipsum" value="3000" color="purple" />
                    <CircularProgress percentage={65} label="Lorem Ipsum" value="700" color="blue" />
                  </div>
                </div>
              </div>

              {/* Right Column - Cards */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Lorem Ipsum</h3>
                  <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 mb-4">
                    Done By Amit
                  </button>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-xs text-gray-500 mb-3">Dolor Sit Amet</h4>
                    <div className="flex justify-between text-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-800">230</div>
                        <div className="text-xs text-gray-500">Book List</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">2</div>
                        <div className="text-xs text-gray-500">Wishlist</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">1500</div>
                        <div className="text-xs text-gray-500">Hours</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <MiniLineChart label="Week" color="teal" />
                      <MiniLineChart label="Monthly" color="teal" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Lorem Ipsum</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-semibold mb-2">Top Products</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>1. Lorem ipsum</li>
                        <li>2. Lorem ipsum</li>
                        <li>3. Lorem ipsum</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold mb-2">Top Buyer</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>1. Lorem ipsum</li>
                        <li>2. Lorem ipsum</li>
                        <li>3. Lorem ipsum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {active && <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>}
  </button>
);

// Bar Group Component
const BarGroup = ({ month, values }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="flex items-end gap-1 h-48 mb-2 w-full">
      {values.map((value, idx) => (
        <div
          key={idx}
          className={`w-4 rounded-t ${idx === 0 ? 'bg-teal-600' : idx === 1 ? 'bg-teal-400' : idx === 2 ? 'bg-gray-300' : 'bg-teal-300'}`}
          style={{ height: `${Math.max(6, value)}%` }}
        />
      ))}
    </div>
    <span className="text-xs text-gray-600 font-medium">{month}</span>
  </div>
);

// Metric Card Component
const MetricCard = ({ label, value, subValue, trend, percentage, time }) => (
  <div className="bg-white rounded-xl p-4">
    <div>
      <h3 className="text-sm text-gray-500 mb-1">{label}</h3>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="flex items-center gap-2 text-sm mt-2">
        <svg className="w-24 h-6" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="0,15 20,10 40,12 60,8 80,10 100,5" stroke="#14b8a6" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>

    <div className="mt-4">
      <div className="text-2xl font-bold text-gray-800">{subValue}</div>
      <div className="text-sm text-gray-500">Lorem Ipsum</div>
    </div>

    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mt-4">
      <span className="text-2xl font-bold text-gray-800">{percentage}</span>
      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full" style={{ width: percentage }} />
      </div>
      <span className="text-lg font-bold text-gray-800">{time}</span>
    </div>
  </div>
);

// Circular Progress Component
const CircularProgress = ({ percentage = 0, label, value, color = 'blue' }) => {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(100, percentage) / 100);
  const colorClasses = { yellow: 'text-yellow-500', purple: 'text-purple-500', blue: 'text-blue-400' };
  return (
    <div className="flex flex-col items-center bg-white rounded-xl p-3">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r={r} stroke="#e6e6e6" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={r}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={colorClasses[color] || colorClasses.blue}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">{label}</div>
      <div className="text-sm font-semibold text-gray-700">{value}</div>
    </div>
  );
};

// Mini Line Chart Component
const MiniLineChart = ({ label, color = 'teal' }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-600">{label}</span>
      <div className="w-16 h-2 bg-teal-500 rounded-full" />
    </div>
    <svg className="w-full h-8" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <polyline
        points="0,20 15,16 30,18 45,12 60,14 75,10 90,8 100,6"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
      />
    </svg>
  </div>
);

export default Dashboard;
