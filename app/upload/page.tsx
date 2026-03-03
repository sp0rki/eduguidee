'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Video, Image as ImageIcon, File, X, CheckCircle, Loader } from 'lucide-react';
import { RequireAuth } from '../../components/RequireAuth';
import { AppNav } from '../../components/AppNav';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'uploading',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));

      if (progress >= 100) {
        clearInterval(uploadInterval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'processing' } : f
        ));
        simulateProcessing(fileId);
      }
    }, 200);
  };

  const simulateProcessing = (fileId: string) => {
    setTimeout(() => {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
      ));
    }, 2000);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf') || type.includes('document')) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (type.includes('video')) {
      return <Video className="w-8 h-8 text-purple-500" />;
    } else if (type.includes('image')) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploading':
        return <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Uploading</span>;
      case 'processing':
        return <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Processing</span>;
      case 'completed':
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Completed</span>;
      case 'error':
        return <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">Error</span>;
      default:
        return null;
    }
  };

  const recentActivities = [
    { action: 'Uploaded', material: 'Chemistry Notes.pdf', time: '5 minutes ago' },
    { action: 'Processed', material: 'History Video.mp4', time: '15 minutes ago' },
    { action: 'Generated Summary', material: 'Math Textbook.pdf', time: '1 hour ago' }
  ];

  const studyTips = [
    'Upload clear, high-quality images for best OCR results',
    'PDFs with text layers process faster than scanned documents',
    'Break large documents into chapters for easier navigation'
  ];

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Study Materials</h2>

              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Supports PDF, DOCX, images, videos, and more
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp4,.mov"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Select Files
                </button>
              </div>

              {/* Action Buttons */}
              {files.length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">What would you like to do?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                      📝 Summarize
                    </button>
                    <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                      ❓ Generate Quiz
                    </button>
                    <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                      🔍 Analyze Content
                    </button>
                    <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                      💡 Extract Key Points
                    </button>
                  </div>
                </div>
              )}

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            {getStatusBadge(file.status)}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatFileSize(file.size)}</span>
                            {file.status !== 'completed' && (
                              <>
                                <span>•</span>
                                <span>{file.progress}%</span>
                              </>
                            )}
                          </div>
                          {file.status !== 'completed' && (
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
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
                  <span className="text-sm text-gray-600">Files Processing</span>
                  <span className="text-sm font-medium text-gray-900">
                    {files.filter(f => f.status === 'processing' || f.status === 'uploading').length} active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </RequireAuth>
  );
}
