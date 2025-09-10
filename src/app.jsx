import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Calendar, DollarSign, 
  AlertCircle, CheckCircle, Clock, TrendingUp,
  FileText, MessageSquare, Settings, Plus,
  Search, Filter, Download, Upload, Edit,
  Target, Briefcase, PieChart, Activity,
  ArrowUp, ArrowDown, Eye, MoreHorizontal, Menu, X
} from 'lucide-react';

const ProjectDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProject, setSelectedProject] = useState('proj-001');
  const [timeframe, setTimeframe] = useState('month');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const projects = {
    'proj-001': {
      id: 'PROJ-001',
      name: 'Harare CBD Infrastructure Upgrade',
      client: 'Harare City Council',
      status: 'In Progress',
      priority: 'High',
      progress: 68,
      budget: 2500000, // In USD
      spent: 1680000,
      startDate: '2024-08-15',
      dueDate: '2024-12-01',
      teamSize: 12,
      tasksComplete: 34,
      tasksTotal: 50,
      manager: 'Tendai Moyo',
      description: 'Road rehabilitation, water and sewage system upgrades in Harare Central Business District.',
      risks: ['Currency volatility', 'Import delays for materials'],
      milestones: [
        { name: 'Feasibility Study', status: 'Complete', date: '2024-09-01' },
        { name: 'Design Approval', status: 'Complete', date: '2024-09-15' },
        { name: 'Phase 1 Construction', status: 'In Progress', date: '2024-10-15' },
        { name: 'Quality Inspection', status: 'Pending', date: '2024-11-01' },
        { name: 'Project Handover', status: 'Pending', date: '2024-12-01' }
      ]
    },
    'proj-002': {
      id: 'PROJ-002',
      name: 'Victoria Falls Tourism Platform',
      client: 'Zimbabwe Tourism Authority',
      status: 'Planning',
      priority: 'Medium',
      progress: 15,
      budget: 850000,
      spent: 127500,
      startDate: '2024-09-01',
      dueDate: '2025-01-15',
      teamSize: 8,
      tasksComplete: 8,
      tasksTotal: 45,
      manager: 'Farai Chiwenga',
      description: 'Development of digital tourism platform for Victoria Falls including booking systems and virtual tours.',
      risks: ['Internet connectivity issues', 'Seasonal weather challenges'],
      milestones: [
        { name: 'Market Research', status: 'Complete', date: '2024-09-15' },
        { name: 'Technical Specification', status: 'In Progress', date: '2024-10-01' },
        { name: 'UI/UX Design', status: 'Pending', date: '2024-10-15' },
        { name: 'Development Sprint 1', status: 'Pending', date: '2024-11-01' },
        { name: 'Beta Testing', status: 'Pending', date: '2024-12-15' }
      ]
    },
    'proj-003': {
      id: 'PROJ-003',
      name: 'Mbare Agricultural Market Upgrade',
      client: 'Ministry of Agriculture',
      status: 'Review',
      priority: 'Critical',
      progress: 92,
      budget: 1200000,
      spent: 1120000,
      startDate: '2024-04-01',
      dueDate: '2024-10-01',
      teamSize: 15,
      tasksComplete: 67,
      tasksTotal: 73,
      manager: 'Tatenda Ndlovu',
      description: 'Modernization of Mbare Musika market facilities including storage, sanitation and trading areas.',
      risks: ['Vendor relocation challenges', 'Supply chain disruptions'],
      milestones: [
        { name: 'Site Assessment', status: 'Complete', date: '2024-05-01' },
        { name: 'Construction Phase', status: 'Complete', date: '2024-07-15' },
        { name: 'Quality Testing', status: 'Complete', date: '2024-08-15' },
        { name: 'Stakeholder Review', status: 'In Progress', date: '2024-09-15' },
        { name: 'Official Opening', status: 'Pending', date: '2024-10-01' }
      ]
    }
  };

  const currentProject = projects[selectedProject];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-purple-100 text-purple-800';
      case 'Complete': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">ZimProjects Management</h1>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Zimbabwe Development Dashboard</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search projects..."
                  className="bg-transparent border-none outline-none text-sm w-32 lg:w-48"
                />
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Project</span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out`}>
          <div className="p-4">
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              {[
                { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'projects', label: 'All Projects', icon: <FileText className="w-4 h-4" /> },
                { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
                { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
                { id: 'reports', label: 'Reports', icon: <PieChart className="w-4 h-4" /> },
                { id: 'budget', label: 'Budget', icon: <DollarSign className="w-4 h-4" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">National Projects</h3>
              <div className="space-y-2">
                {Object.entries(projects).map(([id, project]) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedProject(id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedProject === id
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900 truncate pr-2">{project.name}</span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div 
                        className="bg-green-600 h-1.5 rounded-full transition-all" 
                        style={{width: `${project.progress}%`}}
                      ></div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {activeView === 'overview' && (
            <div className="p-4 sm:p-6">
              {/* Mobile Search */}
              <div className="md:hidden mb-4">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search projects..."
                    className="bg-transparent border-none outline-none text-sm flex-1"
                  />
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">3</p>
                      <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                        <ArrowUp className="w-3 h-3" />
                        12% vs last quarter
                      </p>
                    </div>
                    <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">$4.55M</p>
                      <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        On track
                      </p>
                    </div>
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Team Members</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">35</p>
                      <p className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        Across 3 projects
                      </p>
                    </div>
                    <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Avg Progress</p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">58%</p>
                      <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                        <Target className="w-3 h-3" />
                        Milestone focused
                      </p>
                    </div>
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-full">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2 bg-white rounded-lg border border-gray-200">
                  <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Project Details</h2>
                      <div className="flex items-center gap-2">
                        <select 
                          value={selectedProject}
                          onChange={(e) => setSelectedProject(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm flex-1 sm:flex-none min-w-0"
                        >
                          {Object.entries(projects).map(([id, project]) => (
                            <option key={id} value={id}>
                              {window.innerWidth < 640 && project.name.length > 25 
                                ? project.name.substring(0, 25) + '...' 
                                : project.name}
                            </option>
                          ))}
                        </select>
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentProject.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{currentProject.description}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentProject.status)}`}>
                            {currentProject.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(currentProject.priority)}`}>
                            {currentProject.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-2xl font-bold text-gray-900">{currentProject.progress}%</div>
                        <div className="text-sm text-gray-600">Complete</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm text-gray-900">{currentProject.tasksComplete}/{currentProject.tasksTotal} tasks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{width: `${currentProject.progress}%`}}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{formatCurrency(currentProject.budget)}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Total Budget</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{formatCurrency(currentProject.spent)}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Spent</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{currentProject.teamSize}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Team Members</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{calculateDaysRemaining(currentProject.dueDate)}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Days Left</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Project Milestones</h4>
                      <div className="space-y-3">
                        {currentProject.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                              milestone.status === 'Complete' ? 'bg-green-500' :
                              milestone.status === 'In Progress' ? 'bg-blue-500' :
                              'bg-gray-300'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{milestone.name}</div>
                              <div className="text-xs text-gray-600">{formatDate(milestone.date)}</div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                              milestone.status === 'Complete' ? 'bg-green-100 text-green-800' :
                              milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {milestone.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Project Team</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {currentProject.manager.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-sm truncate">{currentProject.manager}</div>
                          <div className="text-xs text-gray-600">Project Manager</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          KD
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-sm truncate">Kudzai Dube</div>
                          <div className="text-xs text-gray-600">Lead Engineer</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          NM
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 text-sm truncate">Nomsa Moyo</div>
                          <div className="text-xs text-gray-600">Finance Officer</div>
                        </div>
                      </div>
                      <button className="w-full mt-3 text-green-600 text-sm font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                        View All Team Members
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { action: 'Site inspection completed', detail: 'Phase 1 construction', time: '2 hours ago', user: 'Kudzai Dube' },
                        { action: 'Budget approved', detail: 'Q4 allocation', time: '1 day ago', user: 'Nomsa Moyo' },
                        { action: 'Progress report submitted', detail: 'Monthly update', time: '2 days ago', user: 'Tendai Moyo' },
                        { action: 'Stakeholder meeting', detail: 'Ministry officials visited', time: '3 days ago', user: 'Tendai Moyo' }
                      ].map((activity, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-900">
                              {activity.action}: <span className="font-medium">{activity.detail}</span>
                            </div>
                            <div className="text-xs text-gray-600">{activity.user} • {activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      Risk Assessment
                    </h3>
                    <div className="space-y-2">
                      {currentProject.risks.map((risk, idx) => (
                        <div key={idx} className="p-2 bg-orange-50 border border-orange-200 rounded text-xs sm:text-sm text-orange-800">
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView !== 'overview' && (
            <div className="p-4 sm:p-6">
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  {activeView === 'projects' && <FileText className="w-12 h-12 mx-auto" />}
                  {activeView === 'team' && <Users className="w-12 h-12 mx-auto" />}
                  {activeView === 'calendar' && <Calendar className="w-12 h-12 mx-auto" />}
                  {activeView === 'reports' && <PieChart className="w-12 h-12 mx-auto" />}
                  {activeView === 'budget' && <DollarSign className="w-12 h-12 mx-auto" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">{activeView} View</h3>
                <p className="text-gray-600">This section is under development. Content for {activeView} will be available soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
