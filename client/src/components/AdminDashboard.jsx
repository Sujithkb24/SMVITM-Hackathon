import React, { useState, useEffect } from 'react';

import {
  Home,
  BarChart3,
  UtensilsCrossed,
  Package,
  Leaf,
  MessageSquare,
  Users,
  QrCode,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Droplet,
  Wind,
  ChefHat,
  Calendar,
  Download,
  Edit3,
  Plus,
  Trash2,
  Coffee,
  Moon
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
 
  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomePanel />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'menu':
        return <MenuPanel />;
      case 'inventory':
        return <InventoryPanel />;
      case 'sustainability':
        return <SustainabilityPanel />;
      case 'feedback':
        return <FeedbackPanel />;
      case 'users':
        return <UsersPanel />;
      case 'qr':
        return <QRPanel />;
      case 'kitchen':
        return <KitchenPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <HomePanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
       {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0f0f0f]/80 backdrop-blur-sm shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <span className="text-xl">☰</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#d946ef] to-[#8b5cf6] rounded-lg flex items-center justify-center shadow-[0_6px_20px_rgba(217,70,239,0.12)]">
            <UtensilsCrossed size={18} className="text-white" />
          </div>
          <span className="font-bold" style={{background: 'linear-gradient(45deg,#d946ef 30%,#8b5cf6 90%)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Karmic Canteen</span>
        </div>
        <div className="w-8" />
      </div>
 
      <div className="flex">
         {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 m-6 p-6 bg-[#0f0f0f] text-white rounded-3xl shadow-2xl h-[calc(100vh-48px)] border" style={{ borderColor: 'rgba(139,92,246,0.12)', boxShadow: '0 8px 40px rgba(139,92,246,0.04)' }}>
           <div>
             <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                 <UtensilsCrossed size={24} className="text-teal-700" />
               </div>
               <div>
                 <div className="font-bold text-lg">Karmic Canteen</div>
                 <div className="text-xs text-teal-200">Admin Portal</div>
               </div>
             </div>
             <nav className="space-y-2">
  <NavItem icon={<Home size={20} />} label="Overview" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
  <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
  <NavItem icon={<UtensilsCrossed size={20} />} label="Menu" active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
  <NavItem icon={<Package size={20} />} label="Inventory" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
  <NavItem icon={<Leaf size={20} />} label="Green Score" active={activeTab === 'sustainability'} onClick={() => setActiveTab('sustainability')} />
  <NavItem icon={<MessageSquare size={20} />} label="Feedback" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
  <NavItem icon={<Users size={20} />} label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
  <NavItem icon={<QrCode size={20} />} label="QR Monitor" active={activeTab === 'qr'} onClick={() => setActiveTab('qr')} />
  {/* Add this line below QR Monitor */}
  <NavItem icon={<ChefHat size={20} />} label="Kitchen" active={activeTab === 'kitchen'} onClick={() => setActiveTab('kitchen')} />
  <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
</nav>
           </div>
 
           <div className="mt-auto">
            <button className="w-full py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 transition" style={{ background: 'linear-gradient(45deg,#d946ef 30%,#8b5cf6 90%)', color: '#fff', boxShadow: '0 8px 30px rgba(217,70,239,0.12)' }}>
              <LogOut size={18} />
              Logout
            </button>
           </div>
         </aside>
 
         {/* Mobile Sidebar */}
         {mobileOpen && (
           <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
             <div className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-teal-700 to-teal-900 text-white p-6 overflow-auto flex flex-col">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                   <UtensilsCrossed size={24} className="text-teal-700" />
                 </div>
                 <div>
                   <div className="font-bold text-lg">Karmic Canteen</div>
                   <div className="text-xs text-teal-200">Admin Portal</div>
                 </div>
                 <button className="ml-auto p-1" onClick={() => setMobileOpen(false)}>✕</button>
               </div>
               <nav className="space-y-2">
  <NavItem icon={<Home size={20} />} label="Overview" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setMobileOpen(false); }} />
  <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setMobileOpen(false); }} />
  <NavItem icon={<UtensilsCrossed size={20} />} label="Menu" active={activeTab === 'menu'} onClick={() => { setActiveTab('menu'); setMobileOpen(false); }} />
  <NavItem icon={<Package size={20} />} label="Inventory" active={activeTab === 'inventory'} onClick={() => { setActiveTab('inventory'); setMobileOpen(false); }} />
  <NavItem icon={<Leaf size={20} />} label="Green Score" active={activeTab === 'sustainability'} onClick={() => { setActiveTab('sustainability'); setMobileOpen(false); }} />
  <NavItem icon={<MessageSquare size={20} />} label="Feedback" active={activeTab === 'feedback'} onClick={() => { setActiveTab('feedback'); setMobileOpen(false); }} />
  <NavItem icon={<Users size={20} />} label="Users" active={activeTab === 'users'} onClick={() => { setActiveTab('users'); setMobileOpen(false); }} />
  <NavItem icon={<QrCode size={20} />} label="QR Monitor" active={activeTab === 'qr'} onClick={() => { setActiveTab('qr'); setMobileOpen(false); }} />
  {/* Add this line below QR Monitor */}
  <NavItem icon={<ChefHat size={20} />} label="Kitchen" active={activeTab === 'kitchen'} onClick={() => { setActiveTab('kitchen'); setMobileOpen(false); }} />
  <NavItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setMobileOpen(false); }} />
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
          <div className="bg-[#0f0f0f]/80 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 min-h-[80vh]" style={{ border: '1px solid rgba(139,92,246,0.06)' }}>
             {/* Header */}
             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
               <div className="relative w-full md:max-w-md">
                 <input
                   type="text"
                   placeholder="Search meals, employees, reports..."
                   className="w-full pl-4 pr-10 py-3 rounded-xl border border-[rgba(139,92,246,0.12)] bg-[#1a1a1a] text-white placeholder:text-[rgba(255,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-[rgba(217,70,239,0.18)]"
                 />
                 <Search className="absolute right-3 top-3.5 text-[rgba(255,255,255,0.6)]" size={20} />
               </div>
 
               <div className="flex items-center gap-3">
                 <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2">
                   <Download size={18} />
                   <span className="hidden sm:inline">Export</span>
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
 
             {/* Dynamic Content */}
             {renderContent()}
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
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${active ? 'text-white' : 'text-[rgba(255,255,255,0.7)]'}`}
    style={ active ? { background: 'linear-gradient(45deg,#d946ef 30%,#8b5cf6 90%)', boxShadow: '0 8px 30px rgba(217,70,239,0.12)' } : { } }
  >
    <div style={ active ? { filter: 'drop-shadow(0 6px 18px rgba(192,38,211,0.12))' } : { opacity: 0.9 } }>{icon}</div>
    <span className="font-medium">{label}</span>
    {active && <span className="ml-auto w-2 h-2 bg-[#d946ef] rounded-full" />}
  </button>
);

// Home/Overview Panel
const HomePanel = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
      <p className="text-gray-600">Real-time canteen management insights</p>
    </div>

    {/* Top Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<Users className="text-teal-600" />} label="Total Employees" value="1,247" change="+12" trend="up" />
      <StatCard icon={<UtensilsCrossed className="text-blue-600" />} label="Meals Today" value="892" change="+45" trend="up" />
      <StatCard icon={<AlertCircle className="text-orange-600" />} label="Cancelled" value="23" change="-5" trend="down" />
      <StatCard icon={<CheckCircle className="text-green-600" />} label="QR Scans" value="867" change="+89" trend="up" />
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Meal Distribution */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Meal Distribution</h2>
          <span className="text-sm text-gray-500">Updated 5 min ago</span>
        </div>
        <div className="h-64 flex items-end justify-between gap-2">
          <MealBar label="Breakfast" value={285} max={400} color="bg-teal-500" />
          <MealBar label="Lunch" value={392} max={400} color="bg-teal-600" />
          <MealBar label="Snacks" value={145} max={400} color="bg-teal-400" />
          <MealBar label="Dinner" value={70} max={400} color="bg-teal-300" />
        </div>
      </div>

      {/* Green Score Today */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="text-green-600" size={24} />
          <h2 className="text-lg font-semibold text-gray-800">Today's Green Score</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-600">92</span>
            <span className="text-sm text-gray-600">Sustainability Score</span>
          </div>
          <div className="space-y-3">
            <GreenMetric icon={<UtensilsCrossed size={16} />} label="Food Saved" value="12.5 kg" />
            <GreenMetric icon={<Droplet size={16} />} label="Water Saved" value="340 L" />
            <GreenMetric icon={<Wind size={16} />} label="CO₂ Reduced" value="8.2 kg" />
          </div>
        </div>
      </div>
    </div>

    {/* AI Forecast & Live Status */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Forecast vs Actual</h2>
        <div className="space-y-3">
          <ForecastBar label="Tomorrow Lunch" predicted={410} actual={392} />
          <ForecastBar label="Tomorrow Dinner" predicted={95} actual={0} />
          <ForecastBar label="Day After" predicted={425} actual={0} />
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
          <strong>AI Suggestion:</strong> Reduce lunch quantity by 4% tomorrow based on trend
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Live QR Scan Activity</h2>
        <div className="space-y-2">
          <ScanActivity time="2 min ago" name="Amit Kumar" meal="Lunch" status="verified" />
          <ScanActivity time="3 min ago" name="Priya Sharma" meal="Lunch" status="verified" />
          <ScanActivity time="5 min ago" name="Rahul Singh" meal="Lunch" status="verified" />
          <ScanActivity time="7 min ago" name="Unknown" meal="Lunch" status="duplicate" />
          <ScanActivity time="9 min ago" name="Sneha Patel" meal="Lunch" status="verified" />
        </div>
      </div>
    </div>
  </div>
);

// Analytics Panel
const AnalyticsPanel = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Meal Analytics & Reports</h1>
        <p className="text-gray-600">Detailed insights and trends</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">Daily</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Weekly</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">Monthly</button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Meal Trends</h2>
        <div className="h-72 flex items-end justify-between gap-3">
          <DayBar day="Mon" ordered={420} served={410} wasted={10} />
          <DayBar day="Tue" ordered={385} served={380} wasted={5} />
          <DayBar day="Wed" ordered={440} served={425} wasted={15} />
          <DayBar day="Thu" ordered={405} served={398} wasted={7} />
          <DayBar day="Fri" ordered={390} served={385} wasted={5} />
          <DayBar day="Sat" ordered={180} served={175} wasted={5} />
          <DayBar day="Sun" ordered={0} served={0} wasted={0} />
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-600 rounded"></div>
            <span>Ordered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Served</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Wasted</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Dishes</h2>
        <div className="space-y-3">
          <DishRating dish="Paneer Butter Masala" rating={4.8} orders={245} />
          <DishRating dish="Dal Tadka" rating={4.6} orders={198} />
          <DishRating dish="Veg Biryani" rating={4.5} orders={187} />
          <DishRating dish="Chole Bhature" rating={4.3} orders={156} />
          <DishRating dish="Rajma Chawal" rating={4.2} orders={142} />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Wastage Analysis</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Wastage (Week)</span>
            <span className="text-2xl font-bold text-red-600">47 kg</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width: '35%'}}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Excellent</span>
            <span>Target: &lt;30 kg</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cost Efficiency</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Cost per Meal</span>
            <span className="text-lg font-semibold text-gray-800">₹45.20</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Savings (vs Last Month)</span>
            <span className="text-lg font-semibold text-green-600">₹12,450</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Waste Cost</span>
            <span className="text-lg font-semibold text-red-600">₹2,115</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Menu Panel
const MenuPanel = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-gray-600">Create and manage daily menus</p>
      </div>
      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2">
        <Calendar size={18} />
        Schedule Menu
      </button>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Tomorrow's Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MenuCard 
          meal="Breakfast" 
          time="8:00 AM - 10:00 AM"
          items={["Poha", "Idli Sambar", "Coffee/Tea", "Fruits"]}
          feedback={4.5}
        />
        <MenuCard 
          meal="Lunch" 
          time="12:30 PM - 2:30 PM"
          items={["Paneer Butter Masala", "Dal Tadka", "Roti", "Rice", "Salad"]}
          feedback={4.7}
        />
        <MenuCard 
          meal="Snacks" 
          time="4:00 PM - 5:00 PM"
          items={["Samosa", "Sandwich", "Coffee/Tea"]}
          feedback={4.2}
        />
        <MenuCard 
          meal="Dinner" 
          time="7:00 PM - 9:00 PM"
          items={["Veg Biryani", "Raita", "Papad", "Dessert"]}
          feedback={4.6}
        />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Most Liked Dishes</h2>
        <div className="space-y-3">
          <FeedbackItem dish="Paneer Butter Masala" rating={4.8} trend="up" />
          <FeedbackItem dish="Dal Tadka" rating={4.6} trend="up" />
          <FeedbackItem dish="Veg Biryani" rating={4.5} trend="up" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Needs Improvement</h2>
        <div className="space-y-3">
          <FeedbackItem dish="Mixed Veg Curry" rating={3.2} trend="down" />
          <FeedbackItem dish="Gobi Masala" rating={3.4} trend="down" />
          <FeedbackItem dish="Aloo Paratha" rating={3.6} trend="same" />
        </div>
      </div>
    </div>
  </div>
);

// Inventory Panel
const InventoryPanel = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Inventory & Suppliers</h1>
        <p className="text-gray-600">Track ingredients and orders</p>
      </div>
      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2">
        <Package size={18} />
        Add Stock
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<Package className="text-blue-600" />} label="Total Items" value="127" />
      <StatCard icon={<AlertCircle className="text-orange-600" />} label="Low Stock" value="8" />
      <StatCard icon={<CheckCircle className="text-green-600" />} label="In Stock" value="119" />
      <StatCard icon={<TrendingUp className="text-teal-600" />} label="Orders Today" value="15" />
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Low Stock Alerts</h2>
      <div className="space-y-3">
        <StockItem item="Rice (Basmati)" current="15 kg" threshold="50 kg" status="critical" />
        <StockItem item="Paneer" current="8 kg" threshold="20 kg" status="low" />
        <StockItem item="Tomatoes" current="12 kg" threshold="30 kg" status="low" />
        <StockItem item="Cooking Oil" current="18 L" threshold="40 L" status="low" />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Suppliers</h2>
        <div className="space-y-3">
          <SupplierCard name="Fresh Farms Ltd." category="Vegetables" rating={4.8} />
          <SupplierCard name="Dairy Best Co." category="Dairy Products" rating={4.6} />
          <SupplierCard name="Grain Masters" category="Rice & Grains" rating={4.7} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cost Breakdown</h2>
        <div className="space-y-4">
          <CostBar category="Vegetables" amount={12500} percentage={28} />
          <CostBar category="Grains & Pulses" amount={15800} percentage={35} />
          <CostBar category="Dairy" amount={8900} percentage={20} />
          <CostBar category="Spices & Oil" amount={7600} percentage={17} />
        </div>
      </div>
    </div>
  </div>
);

const SustainabilityPanel = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Sustainability Dashboard</h1>
      <p className="text-gray-600">Track environmental impact and green score</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Leaf size={32} />
          <span className="text-4xl font-bold">87</span>
        </div>
        <div className="text-lg font-semibold">Green Score</div>
        <div className="text-sm opacity-90">This Month</div>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <UtensilsCrossed size={32} />
          <span className="text-4xl font-bold">284</span>
        </div>
        <div className="text-lg font-semibold">Food Saved</div>
        <div className="text-sm opacity-90">kg this month</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp size={32} />
          <span className="text-4xl font-bold">+12%</span>
        </div>
        <div className="text-lg font-semibold">Improvement</div>
        <div className="text-sm opacity-90">vs last month</div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h2>
        <div className="space-y-4">
          <ImpactMetric 
            icon={<Droplet className="text-blue-500" />}
            label="Water Saved"
            value="8,240 L"
            detail="Equivalent to 54 days of drinking water"
          />
          <ImpactMetric 
            icon={<Wind className="text-gray-500" />}
            label="CO₂ Emissions Reduced"
            value="156 kg"
            detail="Equal to 780 km of car travel saved"
          />
          <ImpactMetric 
            icon={<UtensilsCrossed className="text-green-500" />}
            label="Meals Saved from Waste"
            value="1,247"
            detail="Could feed 42 people for a month"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trend</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          <TrendBar month="Jul" score={72} />
          <TrendBar month="Aug" score={78} />
          <TrendBar month="Sep" score={81} />
          <TrendBar month="Oct" score={85} />
          <TrendBar month="Nov" score={87} />
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <Leaf className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Sustainability Badge</h2>
          <p className="text-sm text-gray-600">Platinum Level Achiever</p>
        </div>
      </div>
      <p className="text-gray-700">
        Congratulations! Your canteen has maintained a Green Score above 85 for 3 consecutive months. 
        Keep up the excellent work in reducing food waste and environmental impact.
      </p>
    </div>
  </div>
);

// Feedback Panel
const FeedbackPanel = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Employee Feedback</h1>
      <p className="text-gray-600">Reviews and ratings from employees</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<MessageSquare className="text-teal-600" />} label="Total Reviews" value="2,456" />
      <StatCard icon={<TrendingUp className="text-green-600" />} label="Avg Rating" value="4.5" />
      <StatCard icon={<AlertCircle className="text-orange-600" />} label="Pending" value="12" />
      <StatCard icon={<CheckCircle className="text-blue-600" />} label="This Week" value="87" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          <FeedbackCard 
            name="Amit Kumar"
            rating={5}
            dish="Paneer Butter Masala"
            comment="Absolutely delicious! Best paneer dish I've had in the canteen."
            time="2 hours ago"
          />
          <FeedbackCard 
            name="Priya Sharma"
            rating={4}
            dish="Dal Tadka"
            comment="Good taste but could use a bit more spice."
            time="5 hours ago"
          />
          <FeedbackCard 
            name="Rahul Singh"
            rating={3}
            dish="Mixed Veg"
            comment="Average taste. Vegetables were overcooked."
            time="1 day ago"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          <RatingBar stars={5} count={1245} percentage={51} />
          <RatingBar stars={4} count={856} percentage={35} />
          <RatingBar stars={3} count={245} percentage={10} />
          <RatingBar stars={2} count={78} percentage={3} />
          <RatingBar stars={1} count={32} percentage={1} />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Common Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComplaintTag label="Portion size small" count={23} />
        <ComplaintTag label="Not hot enough" count={18} />
        <ComplaintTag label="Too spicy" count={15} />
        <ComplaintTag label="Long waiting time" count={12} />
        <ComplaintTag label="Limited variety" count={9} />
        <ComplaintTag label="Overcooked" count={7} />
      </div>
    </div>
  </div>
);

// Users Panel
const UsersPanel = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Manage employee accounts and access</p>
      </div>
      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2">
        <Users size={18} />
        Add User
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<Users className="text-teal-600" />} label="Total Users" value="1,247" />
      <StatCard icon={<CheckCircle className="text-green-600" />} label="Active Today" value="892" />
      <StatCard icon={<User className="text-blue-600" />} label="Admins" value="8" />
      <StatCard icon={<Clock className="text-orange-600" />} label="Inactive 7d+" value="34" />
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Employee List</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">All</button>
          <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Active</button>
          <button className="px-3 py-1 bg-gray-100 rounded-lg text-sm">Inactive</button>
        </div>
      </div>
      <div className="space-y-3">
        <UserRow name="Amit Kumar" email="amit.kumar@company.com" dept="Engineering" status="active" meals={234} />
        <UserRow name="Priya Sharma" email="priya.s@company.com" dept="Marketing" status="active" meals={198} />
        <UserRow name="Rahul Singh" email="rahul.singh@company.com" dept="Sales" status="active" meals={187} />
        <UserRow name="Sneha Patel" email="sneha.p@company.com" dept="HR" status="active" meals={156} />
        <UserRow name="Vikram Gupta" email="vikram.g@company.com" dept="Finance" status="inactive" meals={142} />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Department Participation</h2>
        <div className="space-y-3">
          <ParticipationBar dept="Engineering" users={450} active={387} />
          <ParticipationBar dept="Sales" users={280} active={245} />
          <ParticipationBar dept="Marketing" users={180} active={156} />
          <ParticipationBar dept="HR" users={120} active={104} />
          <ParticipationBar dept="Finance" users={217} active={189} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Participants</h2>
        <div className="space-y-3">
          <TopUser rank={1} name="Amit Kumar" meals={234} badge="gold" />
          <TopUser rank={2} name="Priya Sharma" meals={198} badge="silver" />
          <TopUser rank={3} name="Rahul Singh" meals={187} badge="bronze" />
          <TopUser rank={4} name="Sneha Patel" meals={156} badge="none" />
          <TopUser rank={5} name="Vikram Gupta" meals={142} badge="none" />
        </div>
      </div>
    </div>
  </div>
);

// QR Panel
const QRPanel = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">QR Code Monitoring</h1>
      <p className="text-gray-600">Real-time scan tracking and security</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<CheckCircle className="text-green-600" />} label="Valid Scans" value="867" />
      <StatCard icon={<AlertCircle className="text-red-600" />} label="Duplicates" value="3" />
      <StatCard icon={<Clock className="text-orange-600" />} label="Pending" value="25" />
      <StatCard icon={<QrCode className="text-teal-600" />} label="Total Today" value="895" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Scan Activity</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <ScanLog time="2 min ago" name="Amit Kumar" meal="Lunch" status="verified" qr="QR-45892" />
          <ScanLog time="3 min ago" name="Priya Sharma" meal="Lunch" status="verified" qr="QR-45891" />
          <ScanLog time="5 min ago" name="Rahul Singh" meal="Lunch" status="verified" qr="QR-45890" />
          <ScanLog time="7 min ago" name="Unknown User" meal="Lunch" status="duplicate" qr="QR-45889" />
          <ScanLog time="9 min ago" name="Sneha Patel" meal="Lunch" status="verified" qr="QR-45888" />
          <ScanLog time="11 min ago" name="Vikram Gupta" meal="Lunch" status="verified" qr="QR-45887" />
          <ScanLog time="13 min ago" name="Anjali Desai" meal="Lunch" status="verified" qr="QR-45886" />
          <ScanLog time="15 min ago" name="Rohan Mehta" meal="Lunch" status="verified" qr="QR-45885" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Scan Distribution</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          <TimeBar hour="8 AM" scans={45} />
          <TimeBar hour="9 AM" scans={78} />
          <TimeBar hour="10 AM" scans={35} />
          <TimeBar hour="12 PM" scans={245} />
          <TimeBar hour="1 PM" scans={398} />
          <TimeBar hour="2 PM" scans={189} />
          <TimeBar hour="4 PM" scans={67} />
          <TimeBar hour="7 PM" scans={38} />
        </div>
      </div>
    </div>

    <div className="bg-red-50 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
        <AlertCircle size={20} />
        Security Alerts
      </h2>
      <div className="space-y-3">
        <SecurityAlert 
          type="Duplicate Scan"
          description="QR-45889 scanned twice within 5 minutes"
          time="7 min ago"
          severity="high"
        />
        <SecurityAlert 
          type="Invalid QR"
          description="Expired QR code attempted at Counter 2"
          time="25 min ago"
          severity="medium"
        />
        <SecurityAlert 
          type="Unusual Pattern"
          description="Multiple scans from same device detected"
          time="1 hour ago"
          severity="low"
        />
      </div>
    </div>
  </div>
);

// Kitchen Panel
const KitchenPanel = () => {
  const [kitchen, setKitchen] = useState({
    breakfast: ['Poha', 'Idli Sambar', 'Paratha', 'Coffee/Tea', 'Fruits'],
    lunch: ['Paneer Butter Masala', 'Dal Tadka', 'Roti', 'Rice', 'Salad', 'Raita'],
    snacks: ['Samosa', 'Sandwich', 'Coffee/Tea', 'Biscuits'],
    dinner: ['Veg Biryani', 'Raita', 'Papad', 'Dessert', 'Roti', 'Dal']
  });

  const [newItem, setNewItem] = useState({
    breakfast: '',
    lunch: '',
    snacks: '',
    dinner: ''
  });

  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('kitchenItems');
    if (saved) setKitchen(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('kitchenItems', JSON.stringify(kitchen));
  }, [kitchen]);

  const addItem = (mealType) => {
    const name = (newItem[mealType] || '').trim();
    if (!name) return;
    setKitchen(prev => ({ ...prev, [mealType]: [...prev[mealType], name] }));
    setNewItem(prev => ({ ...prev, [mealType]: '' }));
  };

  const deleteItem = (mealType, idx) => {
    setKitchen(prev => ({ ...prev, [mealType]: prev[mealType].filter((_, i) => i !== idx) }));
  };

  const startEditing = (mealType, index, currentName) => {
    setEditingItem({ mealType, index, name: currentName });
  };

  const saveEdit = () => {
    if (!editingItem) return;
    setKitchen(prev => ({
      ...prev,
      [editingItem.mealType]: prev[editingItem.mealType].map((it, i) =>
        i === editingItem.index ? editingItem.name : it
      )
    }));
    setEditingItem(null);
  };

  const cancelEdit = () => setEditingItem(null);

  const MealSection = ({ title, mealType, icon }) => (
    <div className="rounded-xl p-6" style={{ background: '#1a1a1a', border: '1px solid rgba(139,92,246,0.12)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-100 rounded-lg">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{kitchen[mealType].length} items</p>
        </div>
      </div>
 
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        {kitchen[mealType].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg transition" style={{ background: '#0f0f0f' }}>
             {editingItem?.mealType === mealType && editingItem?.index === index ? (
               <div className="flex items-center gap-2 flex-1">
                 <input
                   value={editingItem.name}
                   onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                   className="flex-1 px-3 py-1 border border-[rgba(139,92,246,0.12)] rounded text-sm bg-[#1a1a1a] text-white"
                   autoFocus
                 />
                 <button onClick={saveEdit} className="p-1 text-green-600 hover:bg-green-50 rounded">
                   <CheckCircle size={16} />
                 </button>
                 <button onClick={cancelEdit} className="p-1 text-red-600 hover:bg-red-50 rounded">
                   <Trash2 size={16} />
                 </button>
               </div>
             ) : (
               <>
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                 <div className="flex items-center gap-2">
                   <button onClick={() => startEditing(mealType, index, item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                     <Edit3 size={16} />
                   </button>
                   <button onClick={() => deleteItem(mealType, index)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                     <Trash2 size={16} />
                   </button>
                 </div>
               </>
             )}
           </div>
         ))}
         {kitchen[mealType].length === 0 && <div className="text-center py-4 text-gray-500 text-sm">No items added yet</div>}
       </div>
 
       <div className="flex gap-2">
         <input
           value={newItem[mealType]}
           onChange={(e) => setNewItem(prev => ({ ...prev, [mealType]: e.target.value }))}
           onKeyDown={(e) => e.key === 'Enter' && addItem(mealType)}
           placeholder={`Add ${title.toLowerCase()} item...`}
           className="flex-1 px-4 py-2 border border-[rgba(139,92,246,0.12)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgba(217,70,239,0.16)] bg-[#151515] text-white placeholder:text-[rgba(255,255,255,0.5)]"
         />
         <button onClick={() => addItem(mealType)} disabled={!newItem[mealType].trim()} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 flex items-center gap-2">
           <Plus size={16} /> Add
         </button>
       </div>
     </div>
   );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kitchen Items Management</h1>
          <p className="text-gray-600">Manage available items for each meal category</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CheckCircle size={16} className="text-green-500" />
          Changes saved automatically
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MealSection title="Breakfast" mealType="breakfast" icon={<UtensilsCrossed size={20} className="text-teal-600" />} />
        <MealSection title="Lunch" mealType="lunch" icon={<ChefHat size={20} className="text-teal-600" />} />
        <MealSection title="Snacks" mealType="snacks" icon={<Coffee size={20} className="text-teal-600" />} />
        <MealSection title="Dinner" mealType="dinner" icon={<Moon size={20} className="text-teal-600" />} />
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-200">
        <h3 className="font-semibold text-gray-800 mb-3">Kitchen Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{kitchen.breakfast.length}</div>
            <div className="text-sm text-gray-600">Breakfast Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{kitchen.lunch.length}</div>
            <div className="text-sm text-gray-600">Lunch Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{kitchen.snacks.length}</div>
            <div className="text-sm text-gray-600">Snack Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">{kitchen.dinner.length}</div>
            <div className="text-sm text-gray-600">Dinner Items</div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Settings Panel
const SettingsPanel = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
      <p className="text-gray-600">Configure system preferences and notifications</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Meal Configuration</h2>
        <div className="space-y-4">
          <SettingItem 
            label="Meal Order Cut-off Time"
            value="9:00 PM"
            type="time"
          />
          <SettingItem 
            label="Auto-cancel unconfirmed orders"
            value="Enabled"
            type="toggle"
          />
          <SettingItem 
            label="QR Code validity period"
            value="24 hours"
            type="select"
          />
          <SettingItem 
            label="Menu publish time"
            value="6:00 PM (day before)"
            type="time"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
        <div className="space-y-4">
          <SettingItem 
            label="Email notifications"
            value="Enabled"
            type="toggle"
          />
          <SettingItem 
            label="Low stock alerts"
            value="Enabled"
            type="toggle"
          />
          <SettingItem 
            label="Daily reports"
            value="8:00 AM"
            type="time"
          />
          <SettingItem 
            label="Feedback alerts"
            value="Real-time"
            type="select"
          />
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Model Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettingItem 
          label="Training schedule"
          value="Weekly (Sundays)"
          type="select"
        />
        <SettingItem 
          label="Prediction accuracy target"
          value="95%"
          type="number"
        />
        <SettingItem 
          label="Historical data range"
          value="6 months"
          type="select"
        />
        <SettingItem 
          label="Auto-adjust predictions"
          value="Enabled"
          type="toggle"
        />
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Generation</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">Daily Report</div>
            <div className="text-sm text-gray-600">Generated every day at 8:00 AM</div>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">Download</button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">Weekly Summary</div>
            <div className="text-sm text-gray-600">Generated every Monday</div>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">Download</button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">Monthly Analytics</div>
            <div className="text-sm text-gray-600">Generated on 1st of each month</div>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm">Download</button>
        </div>
      </div>
    </div>
  </div>
);

// Helper Components
const StatCard = ({ icon, label, value, change, trend }) => (
  <div className="rounded-xl p-4" style={{ background: '#1a1a1a', border: '1px solid rgba(139,92,246,0.15)' }}>
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 rounded-lg" style={{ background: 'rgba(217,70,239,0.06)' }}>{icon}</div>
      {change && (
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-[rgba(255,255,255,0.7)]">{label}</div>
  </div>
);

const GreenMetric = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
    <div className="flex items-center gap-2">
      <div className="text-green-600">{icon}</div>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const MealBar = ({ label, value, max, color }) => (
  <div className="flex flex-col items-center flex-1">
    <div className="w-full flex flex-col justify-end items-center h-full">
      <div className={`w-full ${color} rounded-t-lg`} style={{ height: `${(value / max) * 100}%` }}></div>
    </div>
    <span className="text-xs font-medium text-gray-700 mt-2">{label}</span>
    <span className="text-xs text-gray-500">{value}</span>
  </div>
);

const ForecastBar = ({ label, predicted, actual }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-700">{label}</span>
      <span className="text-gray-600">Predicted: {predicted} | Actual: {actual || '—'}</span>
    </div>
    <div className="flex gap-2">
      <div className="flex-1 h-6 bg-blue-200 rounded flex items-center justify-center text-xs font-medium">
        {predicted}
      </div>
      {actual > 0 && (
        <div className="flex-1 h-6 bg-green-500 rounded flex items-center justify-center text-xs font-medium text-white">
          {actual}
        </div>
      )}
    </div>
  </div>
);

const ScanActivity = ({ time, name, meal, status }) => (
  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <div>
        <div className="text-sm font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{meal} • {time}</div>
      </div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full ${status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {status}
    </span>
  </div>
);

const DayBar = ({ day, ordered, served, wasted }) => {
  const max = 500;
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full h-full flex flex-col justify-end gap-1">
        {wasted > 0 && (
          <div className="w-full bg-red-500 rounded-t" style={{ height: `${(wasted / max) * 100}%` }}></div>
        )}
        <div className="w-full bg-green-500" style={{ height: `${(served / max) * 100}%` }}></div>
        <div className="w-full bg-teal-600 rounded-b" style={{ height: `${((ordered - served - wasted) / max) * 100}%` }}></div>
      </div>
      <span className="text-xs font-medium text-gray-700 mt-2">{day}</span>
    </div>
  );
};

const DishRating = ({ dish, rating, orders }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <div className="text-sm font-medium text-gray-800">{dish}</div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-500">★</span>
        <span className="text-xs text-gray-600">{rating}</span>
        <span className="text-xs text-gray-400">• {orders} orders</span>
      </div>
    </div>
  </div>
);

const MenuCard = ({ meal, time, items, feedback }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-semibold text-gray-800">{meal}</h3>
        <p className="text-xs text-gray-600">{time}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="text-sm font-medium">{feedback}</span>
      </div>
    </div>
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx} className="text-sm text-gray-700">• {item}</li>
      ))}
    </ul>
  </div>
);

const FeedbackItem = ({ dish, rating, trend }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-sm text-gray-800">{dish}</span>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span className="text-sm font-medium">{rating}</span>
      </div>
      {trend === 'up' && <TrendingUp size={16} className="text-green-600" />}
      {trend === 'down' && <TrendingDown size={16} className="text-red-600" />}
    </div>
  </div>
);

const StockItem = ({ item, current, threshold, status }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <div className="text-sm font-medium text-gray-800">{item}</div>
      <div className="text-xs text-gray-600">Current: {current} / Threshold: {threshold}</div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full ${
      status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
    }`}>
      {status}
    </span>
  </div>
);

const SupplierCard = ({ name, category, rating }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
      <div className="text-xs text-gray-600">{category}</div>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-yellow-500">★</span>
      <span className="text-sm font-medium">{rating}</span>
    </div>
  </div>
);

const CostBar = ({ category, amount, percentage }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-700">{category}</span>
      <span className="font-medium text-gray-800">₹{amount.toLocaleString()}</span>
    </div>
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const ImpactMetric = ({ icon, label, value, detail }) => (
  <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
    <div className="p-3 bg-white rounded-lg">{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{detail}</div>
    </div>
  </div>
);

const TrendBar = ({ month, score }) => (
  <div className="flex-1 flex flex-col items-center">
    <div className="w-full h-full flex items-end">
      <div className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t" style={{ height: `${score}%` }}></div>
    </div>
    <span className="text-xs font-medium text-gray-700 mt-2">{month}</span>
    <span className="text-xs text-gray-500">{score}</span>
  </div>
);

const FeedbackCard = ({ name, rating, dish, comment, time }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex items-start justify-between mb-2">
      <div>
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">★</span>
        ))}
      </div>
    </div>
    <div className="text-sm font-medium text-teal-600 mb-1">{dish}</div>
    <p className="text-sm text-gray-600">{comment}</p>
  </div>
);

const RatingBar = ({ stars, count, percentage }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1 w-16">
      <span className="text-sm font-medium text-gray-700">{stars}</span>
      <span className="text-yellow-500">★</span>
    </div>
    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="text-sm text-gray-600 w-16 text-right">{count}</span>
  </div>
);

const ComplaintTag = ({ label, count }) => (
  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
    <span className="text-sm text-gray-700">{label}</span>
    <span className="text-sm font-semibold text-orange-600">{count}</span>
  </div>
);

const UserRow = ({ name, email, dept, status, meals }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
    <div className="flex items-center gap-3 flex-1">
      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{email}</div>
      </div>
    </div>
    <div className="hidden md:block text-sm text-gray-600 w-32">{dept}</div>
    <div className="hidden md:block text-sm text-gray-600 w-24">{meals} meals</div>
    <span className={`text-xs px-3 py-1 rounded-full ${
      status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
    }`}>
      {status}
    </span>
  </div>
);

const ParticipationBar = ({ dept, users, active }) => {
  const percentage = (active / users) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{dept}</span>
        <span className="text-gray-600">{active}/{users}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const TopUser = ({ rank, name, meals, badge }) => {
  const badgeColors = {
    gold: 'bg-yellow-500',
    silver: 'bg-gray-400',
    bronze: 'bg-orange-600'
  };
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
          badge !== 'none' ? badgeColors[badge] : 'bg-gray-400'
        }`}>
          {rank}
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <span className="text-sm font-semibold text-teal-600">{meals} meals</span>
    </div>
  );
};

const ScanLog = ({ time, name, meal, status, qr }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium text-gray-800">{name}</span>
           </div>
      <div className="text-xs text-gray-500 ml-4">{qr} • {meal} • {time}</div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full ${
      status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {status}
    </span>
  </div>
);

const TimeBar = ({ hour, scans }) => (
  <div className="flex-1 flex flex-col items-center">
    <div className="w-full h-full flex items-end">
      <div className="w-full bg-teal-500 rounded-t" style={{ height: `${Math.min((scans / 400) * 100, 100)}%` }}></div>
    </div>
    <span className="text-xs font-medium text-gray-700 mt-2">{hour}</span>
    <span className="text-xs text-gray-500">{scans}</span>
  </div>
);

const SecurityAlert = ({ type, description, time, severity }) => {
  const severityColors = {
    high: 'bg-red-100 border-red-300 text-red-800',
    medium: 'bg-orange-100 border-orange-300 text-orange-800',
    low: 'bg-yellow-100 border-yellow-300 text-yellow-800'
  };
  
  return (
    <div className={`p-3 rounded-lg border ${severityColors[severity]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-medium mb-1">{type}</div>
          <div className="text-sm opacity-90">{description}</div>
        </div>
        <span className="text-xs opacity-75">{time}</span>
      </div>
    </div>
  );
};

const SettingItem = ({ label, value, type }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    {type === 'toggle' ? (
      <button className={`w-12 h-6 rounded-full transition ${
        value === 'Enabled' ? 'bg-teal-500' : 'bg-gray-300'
      }`}>
        <div className={`w-5 h-5 bg-white rounded-full transition transform ${
          value === 'Enabled' ? 'translate-x-6' : 'translate-x-1'
        }`}></div>
      </button>
    ) : (
      <span className="text-sm text-gray-600">{value}</span>
    )}
  </div>
);

export default Dashboard;
