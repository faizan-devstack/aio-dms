'use client'

import React from "react";
import {
  Users,
  FileText,
  BarChart2,
  Package,
  Receipt,
  TrendingUp,
  Activity,
  DollarSign,
  Sparkles,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardHome() {
  const quickActions = [
    {
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      title: "Add Customer",
      description: "Register new customers",
      color: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      title: "Create Estimate",
      description: "Generate new estimates",
      color: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <Receipt className="w-5 h-5 text-emerald-600" />,
      title: "New Invoice",
      description: "Create invoices quickly",
      color: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <Package className="w-5 h-5 text-emerald-600" />,
      title: "Manage Inventory",
      description: "Update stock levels",
      color: "from-emerald-50 to-emerald-100"
    }
  ];

  const statCards = [
    {
      title: "Revenue Overview",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      description: "Monthly and yearly revenue trends"
    },
    {
      title: "Customer Analytics",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      description: "Customer growth and engagement metrics"
    },
    {
      title: "Invoice Statistics",
      icon: <Receipt className="w-5 h-5 text-emerald-600" />,
      description: "Payment status and processing data"
    },
    {
      title: "Performance Metrics",
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      description: "System performance and efficiency stats"
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg mr-4 animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Welcome to AIO-DMS</h1>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  Dashboard Overview
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-6 animate-slide-up">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Your Complete Business Management Solution</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                AIO-DMS provides a comprehensive platform for managing all aspects of your business operations. 
                From customer relationships and inventory management to financial reporting and analytics, 
                everything you need is integrated into one powerful system.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Streamlined workflow automation for increased productivity</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Real-time data synchronization across all modules</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Advanced reporting and business intelligence tools</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Secure cloud-based infrastructure with 99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4 animate-fade-in">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${action.color} rounded-lg p-4 border border-emerald-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-2">
                  {action.icon}
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 ml-auto" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Preview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4 animate-fade-in">Business Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    {card.icon}
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-2">{card.title}</h3>
                <p className="text-xs text-gray-600 mb-4">{card.description}</p>
                
                {/* Placeholder for stats */}
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-3 italic">Statistics will be displayed here</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">Recent Activity</h2>
            <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors duration-200">
              View All
            </button>
          </div>
          
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Timeline</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              This section will display your recent business activities, transactions, 
              and system updates in real-time as you use the platform.
            </p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};