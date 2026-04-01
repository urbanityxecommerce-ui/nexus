import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  ArrowRightLeft, 
  PieChart, 
  Settings, 
  Bell, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  Wallet,
  Send,
  Download,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Jan', balance: 2800000 },
  { name: 'Feb', balance: 2950000 },
  { name: 'Mar', balance: 3100000 },
  { name: 'Apr', balance: 3400000 },
  { name: 'May', balance: 3650000 },
  { name: 'Jun', balance: 3789000 },
];

const transactions = [
  { id: 1, name: 'TechCorp Solutions', category: 'Salary', date: 'Today, 09:00 AM', amount: 250000, type: 'credit', status: 'Completed' },
  { id: 2, name: 'Apple Store BKC', category: 'Electronics', date: 'Yesterday, 14:30 PM', amount: 125000, type: 'debit', status: 'Completed' },
  { id: 3, name: 'Taj Lands End', category: 'Dining', date: '28 Mar, 20:15 PM', amount: 15400, type: 'debit', status: 'Completed' },
  { id: 4, name: 'Zerodha Broking', category: 'Investment', date: '27 Mar, 09:15 AM', amount: 500000, type: 'debit', status: 'Completed' },
  { id: 5, name: 'Dividend - Reliance', category: 'Income', date: '25 Mar, 11:00 AM', amount: 45000, type: 'credit', status: 'Completed' },
  { id: 6, name: 'Uber India', category: 'Transport', date: '24 Mar, 08:45 AM', amount: 850, type: 'debit', status: 'Completed' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#f5f7fa] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-600">
            <Wallet className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">NexusBank</span>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: Home, label: 'Dashboard' },
            { id: 'transactions', icon: ArrowRightLeft, label: 'Transactions' },
            { id: 'cards', icon: CreditCard, label: 'My Cards' },
            { id: 'analytics', icon: PieChart, label: 'Analytics' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-slate-900 rounded-2xl p-4 text-white">
            <p className="text-sm font-medium mb-1">Need help?</p>
            <p className="text-xs text-slate-400 mb-3">Contact our 24/7 priority support.</p>
            <button className="w-full bg-white text-slate-900 text-sm font-medium py-2 rounded-lg hover:bg-slate-100 transition-colors">
              Support Center
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-slate-800">Overview</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all w-64"
              />
            </div>
            
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Rahul Sharma</p>
                <p className="text-xs text-slate-500">Premium Account</p>
              </div>
              <img 
                src="https://picsum.photos/seed/rahul/100/100" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-slate-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Top Row: Balance & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Total Balance Card */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-slate-500 font-medium mb-1">Total Available Balance</p>
                      <h2 className="text-5xl font-bold text-slate-900 tracking-tight">
                        ₹37,89,000<span className="text-2xl text-slate-400">.00</span>
                      </h2>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4" />
                      +2.4%
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                      <Send className="w-4 h-4" /> Transfer
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                      <Plus className="w-4 h-4" /> Add Money
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors">
                      <Download className="w-4 h-4" /> Statement
                    </button>
                  </div>
                </div>
              </div>

              {/* Credit Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between h-[240px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Current Card</p>
                    <p className="font-medium text-lg">Nexus Signature</p>
                  </div>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.5"/>
                    <circle cx="28" cy="12" r="12" fill="white" fillOpacity="0.5"/>
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <p className="font-mono text-xl tracking-widest mb-2 opacity-90">**** **** **** 4289</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
                      <p className="text-sm font-medium">RAHUL SHARMA</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
                      <p className="text-sm font-medium">12/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row: Chart & Quick Transfers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Cash Flow Chart */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Cash Flow</h3>
                  <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 outline-none">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => `₹${value / 100000}L`}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`₹${(value / 100000).toFixed(2)} Lakhs`, 'Balance']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#4f46e5" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorBalance)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Transfers */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Quick Transfer</h3>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</button>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  <button className="flex flex-col items-center gap-2 min-w-[72px]">
                    <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-600">Add New</span>
                  </button>
                  
                  {[
                    { name: 'Priya', img: '1' },
                    { name: 'Amit', img: '2' },
                    { name: 'Neha', img: '3' },
                    { name: 'Rohan', img: '4' },
                  ].map((user, i) => (
                    <button key={i} className="flex flex-col items-center gap-2 min-w-[72px] group">
                      <img 
                        src={`https://picsum.photos/seed/user${user.img}/100/100`} 
                        alt={user.name} 
                        className="w-14 h-14 rounded-full border-2 border-transparent group-hover:border-indigo-500 transition-all object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{user.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-24 text-slate-900 font-medium focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Recent Transactions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Recent Transactions</h3>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                      <th className="pb-3 font-medium">Transaction</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Date & Time</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                              {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </div>
                            <span className="font-medium text-slate-900">{tx.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-500 text-sm">{tx.category}</td>
                        <td className="py-4 text-slate-500 text-sm">{tx.date}</td>
                        <td className={`py-4 text-right font-medium ${
                          tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'
                        }`}>
                          {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </td>
                        <td className="py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
