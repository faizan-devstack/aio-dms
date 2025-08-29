'use client'

import React, { useState } from "react";
import {
  Users,
  FileText,
  BarChart2,
  Package,
  Receipt,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const handleClick = () => {
    setLoading(true);
    router.push("/dashboard/home");
    setTimeout(() => setLoading(false), 2000);
  };

  const features = [
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Customer Management",
      description: "Comprehensive customer database with advanced filtering and search capabilities"
    },
    {
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      title: "Smart Estimates",
      description: "Generate professional estimates with automated calculations and templates"
    },
    {
      icon: <Receipt className="w-6 h-6 text-emerald-600" />,
      title: "Invoice Processing",
      description: "Streamlined invoicing with payment tracking and automated reminders"
    },
    {
      icon: <Package className="w-6 h-6 text-emerald-600" />,
      title: "Inventory Control",
      description: "Real-time inventory management with low stock alerts and reporting"
    },
    {
      icon: <BarChart2 className="w-6 h-6 text-emerald-600" />,
      title: "Advanced Analytics",
      description: "Detailed financial reports and business insights dashboard"
    },
    {
      icon: <Receipt className="w-6 h-6 text-emerald-600" />,
      title: "Tax Management",
      description: "Automated tax calculations and compliance reporting tools"
    }
  ];

  const techStack = [
    { name: "Next.js", color: "bg-emerald-600 text-white" },
    { name: "TypeScript", color: "bg-emerald-500 text-white" },
    { name: "Tailwind CSS", color: "bg-emerald-400 text-white" },
    { name: "Redux Toolkit", color: "bg-emerald-700 text-white" }
  ];

  const stats = [
    { label: "Active Users", value: "2,847", trend: "+12%" },
    { label: "Total Revenue", value: "$847K", trend: "+8%" },
    { label: "Invoices Processed", value: "15,234", trend: "+15%" },
    { label: "Customer Satisfaction", value: "98.5%", trend: "+2%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-emerald-400/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4 animate-pulse">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mb-4 animate-fade-in">
              AIO-DMS
            </h1>
            <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              All-in-One Data Management System
            </p>
            <p className="text-base text-gray-500 mb-6 max-w-xl mx-auto animate-slide-up delay-100">
              Streamline your business operations with our comprehensive financial management platform.
              Built with modern technologies for maximum performance and reliability.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${tech.color} shadow-md hover:scale-105 transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
            <button 
              onClick={handleClick}
              disabled={loading}
              className="bg-white text-emerald-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105 animate-bounce-subtle"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Loading...
                </div>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3 animate-fade-in">Powerful Features</h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto animate-slide-up">
            Everything you need to manage your business finances efficiently and effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-2 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              <div className="mt-4 flex items-center text-emerald-600 font-medium group-hover:translate-x-2 transition-transform duration-300 text-sm">
                <span className="mr-2">Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Our application leverages cutting-edge technologies to deliver exceptional performance,
              scalability, and user experience across all devices and platforms.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">Next.js</h4>
                <p className="text-xs text-gray-600">React framework for production</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-100">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">TypeScript</h4>
                <p className="text-xs text-gray-600">Type-safe development</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-200">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">Tailwind CSS</h4>
                <p className="text-xs text-gray-600">Utility-first styling</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in delay-300">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart2 className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm">Redux Toolkit</h4>
                <p className="text-xs text-gray-600">State management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-8 text-white animate-fade-in">
            <h2 className="text-2xl font-semibold mb-3">Ready to Transform Your Business?</h2>
            <p className="text-base opacity-90 mb-6 max-w-xl mx-auto">
              Experience the power of integrated financial management with AIO-DMS
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
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
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};