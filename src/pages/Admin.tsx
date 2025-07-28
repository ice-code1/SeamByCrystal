"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload, Download, Trash2, Edit, Eye, Plus, X, Save
} from 'lucide-react';
import { supabase } from '../superbaseclient'; // adjust the path if needed
//import { createClient } from "@supabase/supabase-js";

import { useImageContext } from '../context/ImageContext';
import * as XLSX from 'xlsx';




const Admin = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [shopImages, setShopImages] = useState([]);

  //const { galleryImages, setGalleryImages, shopImages, setShopImages } = useImageContext();


  const [trainingData, setTrainingData] = useState([]);


  // const [trainingData, setTrainingData] = useState(() => {
  //   const stored = localStorage.getItem('trainingData');
  //   return stored ? JSON.parse(stored) : [];
  // });

  const [newItem, setNewItem] = useState({
    title: '',
    name: '',
    category: '',
    description: '',
    price:'',
    image: null,
  });

  // Check auth status on load
  useEffect(() => {
    const fetchTrainingData = async () => {
      const { data, error } = await supabase
        .from('training_requests')
        .select('*')
        .order('dateSubmitted', { ascending: false });

      if (error) {
        console.error('Error fetching training data:', error.message);
      } else {
        setTrainingData(data);
      }
    };

    const fetchGalleryItems = async () => {
    const { data, error } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
    if (!error) setGalleryImages(data);
    else console.error('Gallery fetch error:', error);
    };

    const fetchShopItems = async () => {
    const { data, error } = await supabase.from('shop_items').select('*').order('created_at', { ascending: false });
    if (!error) setShopImages(data);
    else console.error('Shop fetch error:', error);
   };

    if (isAuthenticated) {
      fetchTrainingData();
      fetchGalleryItems();
      fetchShopItems();
    }
  }, [isAuthenticated]);


  // useEffect(() => {
  //   const auth = localStorage.getItem('isAuthenticated');
  //   if (auth === 'true') setIsAuthenticated(true);
  // }, []);

  // Persist trainingData to localStorage
    useEffect(() => {
      localStorage.setItem('trainingData', JSON.stringify(trainingData));
    }, [trainingData]);



  const handleFileUpload = async (file) => {
  const filePath = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('gallery') // your bucket name
    .upload(filePath, file);

  if (error) {
    console.error('Upload failed:', error.message);
    alert('Upload failed');
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl;
};


 const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const publicUrl = await handleFileUpload(file);
    if (publicUrl) {
      setNewItem((prev) => ({ ...prev, image: publicUrl }));
    }
  }, []);

  //const { getRootProps, getInputProps } = useDropzone({ onDrop });



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'crystal2024') {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

    const handleAddItem = async () => {
      if (!newItem.image || !newItem.category) {
        alert('Please upload an image and select a category.');
        return;
      }

      const id = Date.now().toString();
      const created_at = new Date().toISOString();

      if (activeTab === 'gallery') {
        const { error } = await supabase.from('gallery_items').insert([
          {
            id,
            title: newItem.title,
            category: newItem.category,
            image_url: newItem.image,
            created_at
          }
        ]);
        if (!error) {
          const { data } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
          setGalleryImages(data);
        } else {
          console.error('Insert gallery error:', error);
          alert('Failed to upload gallery item');
        }
      } else if (activeTab === 'shop') {
        const { error } = await supabase.from('shop_items').insert([
          {
            id,
            name: newItem.name,
            category: newItem.category,
            image_url: newItem.image,
            description: newItem.description,
            created_at,
            price: newItem.price,
          }
        ]);
        if (!error) {
          const { data } = await supabase.from('shop_items').select('*').order('created_at', { ascending: false });
          setShopImages(data);
        } else {
          console.error('Insert shop error:', error);
          alert('Failed to upload shop item');
        }
      }

      setNewItem({ title: '', name: '', category: '', description: '', price: '', image: null });
      setShowAddModal(false);
    };





    const handleSubmit = async () => {
    const id = Date.now().toString();
    const uploadDate = new Date().toISOString();

    if (activeTab === 'gallery') {
      const id = Date.now().toString();

      const { error } = await supabase.from('gallery').insert([
        {
          id,
          title: newItem.title,
          src: newItem.image, // now a public URL
          category: newItem.category,
          uploadDate,
        },
      ]);

      if (error) {
        alert('Failed to insert item');
        console.error(error);
        return;
      }

      setGalleryImages((prev) => [...prev, { id, ...newItem, src: newItem.image, uploadDate }]);
    }
    else if (activeTab === 'shop') {
      const id = Date.now().toString();

      const { error } = await supabase.from('shop_products').insert([
        {
          id,
          name: newItem.name,
          image: newItem.image, // public URL
          category: newItem.category,
          price: newItem.price,
          description: newItem.description,
          uploadDate,
        },
      ]);

      if (error) {
        alert('Failed to insert item');
        console.error(error);
        return;
      }

      setShopImages((prev) => [...prev, { id, ...newItem, uploadDate }]);
    }


    // Reset form and close modal
    setNewItem({ title: '', name: '', category: '', description: '',price: '', image: null });
    setShowAddModal(false);
  }
  // Delete item from relevant tab
  const handleDeleteItem = async (id) => {
  if (!window.confirm('Are you sure you want to delete this item?')) return;

  if (activeTab === 'gallery') {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (!error) {
      const updated = galleryImages.filter((item) => item.id !== id);
      setGalleryImages(updated);
    } else {
      console.error('Delete gallery error:', error);
    }

  } else if (activeTab === 'shop') {
    const { error } = await supabase.from('shop_items').delete().eq('id', id);
    if (!error) {
      const updated = shopImages.filter((item) => item.id !== id);
      setShopImages(updated);
    } else {
      console.error('Delete shop error:', error);
    }

  } else if (activeTab === 'training') {
    const { error } = await supabase.from('training_requests').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete error:', error);
    } else {
      const updated = trainingData.filter((item) => item.id !== id);
      setTrainingData(updated);
      localStorage.setItem('trainingData', JSON.stringify(updated));
    }
  }
};

  // Export training data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(trainingData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Training Data');
    XLSX.writeFile(workbook, `training-data-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {['gallery', 'shop', 'training'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 rounded-md font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} 
              {tab === 'gallery' && ` (${galleryImages.length})`}
              {tab === 'shop' && ` (${shopImages.length})`}
              {tab === 'training' && ` (${trainingData.length})`}
            </button>
          ))}
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
                    <p className="text-sm text-purple-600 mb-2">{image.category}</p>
                    <p className="text-xs text-gray-500 mb-3">Uploaded: {image.uploadDate}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(image)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(image.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shop Tab */}
        {activeTab === 'shop' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Shop Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopImages.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-purple-600 mb-2">{product.category}</p>
                    <p className="text-sm text-purple-600 mb-2">{product.price}</p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-xs text-gray-500 mb-3">Uploaded: {product.uploadDate}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(product)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(product.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Training Requests</h2>
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                Export to Excel
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Schedule</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trainingData.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">Submitted: {request.submissionDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.email}</div>
                          <div className="text-sm text-gray-500">{request.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.trainingType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.skillLevel}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.preferredDate}</div>
                          <div className="text-sm text-gray-500">{request.preferredTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={request.status}
                            onChange={(e) => handleUpdateStatus(request.id, e.target.value)}
                            className={`text-sm rounded-full px-3 py-1 font-semibold ${
                              request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setEditingItem(request)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(request.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Add {activeTab === 'gallery' ? 'Image' : 'Product'}
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'gallery' ? 'Title' : 'Product Name'}
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'gallery' ? newItem.title : newItem.name}
                      onChange={(e) => setNewItem(prev => ({
                        ...prev,
                        [activeTab === 'gallery' ? 'title' : 'name']: e.target.value
                      }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`Enter ${activeTab === 'gallery' ? 'title' : 'product name'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      <option value="Evening Wear">Evening Wear</option>
                      <option value="Professional">Professional</option>
                      <option value="Casual">Casual</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Party Wear">Party Wear</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Traditional">Traditional</option>
                    </select>
                  </div>

                  {activeTab === 'shop' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₦)
                      </label>
                      <input
                        type="number"
                        value={newItem.price || ''}
                        onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter product price"
                      />
                    </div>
                  )}


                  {activeTab === 'shop' && (
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter product description"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      {newItem.image ? (
                        <div>
                          <img src={newItem.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                          <p className="text-sm text-gray-600">Click or drag to replace image</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">
                            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddItem}
                      disabled={!newItem.image || !(activeTab === 'gallery' ? newItem.title : newItem.name) || !newItem.category}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Add {activeTab === 'gallery' ? 'Image' : 'Product'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View/Edit Training Request Modal */}
        {editingItem && activeTab === 'training' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Training Request Details</h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Training Type</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.trainingType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.skillLevel}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.preferredDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.preferredTime}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.submissionDate}</p>
                  </div>
                </div>

                {editingItem.message && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editingItem.message}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-6">
                  <button
                    onClick={() => setEditingItem(null)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`https://wa.me/${editingItem.phone.replace(/[^0-9]/g, '')}?text=Hi%20${editingItem.name},%20regarding%20your%20training%20request...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                  >
                    Contact via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;