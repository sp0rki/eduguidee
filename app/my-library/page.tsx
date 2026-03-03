'use client';

import React, { useState } from 'react';
import { Search, Filter, BookOpen, FileText, Video, Image, Calendar, Clock, Star, MoreVertical, Download, Trash2 } from 'lucide-react';
import { RequireAuth } from '../../components/RequireAuth';
import { AppNav } from '../../components/AppNav';

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'pdf' | 'video' | 'image' | 'document';
  uploadDate: string;
  lastAccessed: string;
  size: string;
  isFavorite: boolean;
  progress?: number;
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  // start empty; items will be added by the user on upload
  const [materials, setMaterials] = useState<Array<StudyMaterial>>([]);

  // will populate dynamically once user starts interacting
  const recentActivities: Array<{ action: string; material: string; time: string }> = []; 

  // optional tips can be added later
  const studyTips: string[] = [];

  const toggleFavorite = (id: string) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, isFavorite: !material.isFavorite } : material
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EduGuide</h1>
                  <p className="text-sm text-gray-600">AI-Assisted Learning Companion</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <span className="text-sm font-medium text-gray-700">My Account</span>
              </button>
            </div>
          </div>
        </header>

        <AppNav />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Study Materials</h2>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Material Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMaterials.map(material => (
                  <div
                    key={material.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(material.type)}
                        <span className="text-xs font-medium text-gray-500 uppercase">{material.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(material.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              material.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                            }`}
                          />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{material.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{material.subject}</p>

                    {material.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{material.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${material.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <span>{material.size}</span>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                        Study Now
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span> {activity.material}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Study Tips</h3>
              <div className="space-y-3">
                {studyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium text-gray-900">0 MB / 5 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '3%' }} />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Processing Status</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    All Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>  {/* close min-h-screen container */}
    </RequireAuth>
  );
}
