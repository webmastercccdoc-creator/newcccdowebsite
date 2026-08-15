// AddArticles.jsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from '@/components/admin/Modal';

export default function AddArticles({ 
  isOpen, 
  onClose, 
  onSave, 
  article = null,
  isEditing = false,
  departments = []
}) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    content: '',
    date: '',
    sdg: [],
    images: [],
    imagePreviews: [],
    existingImages: [] // Separate array for existing images from server
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSelecting, setIsAutoSelecting] = useState(false);
  const fileInputRef = useRef(null);

  // SDG Options with keywords for auto-detection
  const sdgOptions = [
    { 
      value: 'sdg1', 
      label: 'SDG 1: No Poverty',
      keywords: ['poverty', 'poor', 'income', 'livelihood', 'social protection', 'vulnerable', 'economic inclusion']
    },
    { 
      value: 'sdg2', 
      label: 'SDG 2: Zero Hunger',
      keywords: ['hunger', 'food', 'agriculture', 'farming', 'nutrition', 'malnutrition', 'food security', 'crop']
    },
    { 
      value: 'sdg3', 
      label: 'SDG 3: Good Health and Well-being',
      keywords: ['health', 'healthcare', 'medical', 'disease', 'wellness', 'mental health', 'hospital', 'vaccine', 'pandemic']
    },
    { 
      value: 'sdg4', 
      label: 'SDG 4: Quality Education',
      keywords: ['education', 'school', 'learning', 'teacher', 'student', 'literacy', 'knowledge', 'training', 'skill']
    },
    { 
      value: 'sdg5', 
      label: 'SDG 5: Gender Equality',
      keywords: ['gender', 'women', 'girl', 'female', 'equality', 'empowerment', 'sexism', 'patriarchy', 'feminism']
    },
    { 
      value: 'sdg6', 
      label: 'SDG 6: Clean Water and Sanitation',
      keywords: ['water', 'sanitation', 'clean water', 'hygiene', 'toilet', 'sewage', 'drinking water', 'water quality']
    },
    { 
      value: 'sdg7', 
      label: 'SDG 7: Affordable and Clean Energy',
      keywords: ['energy', 'electricity', 'renewable', 'solar', 'wind', 'power', 'clean energy', 'fuel', 'grid']
    },
    { 
      value: 'sdg8', 
      label: 'SDG 8: Decent Work and Economic Growth',
      keywords: ['economy', 'employment', 'job', 'work', 'labor', 'business', 'growth', 'sustainable development']
    },
    { 
      value: 'sdg9', 
      label: 'SDG 9: Industry, Innovation and Infrastructure',
      keywords: ['industry', 'innovation', 'infrastructure', 'technology', 'research', 'development', 'engineering', 'manufacturing']
    },
    { 
      value: 'sdg10', 
      label: 'SDG 10: Reduced Inequalities',
      keywords: ['inequality', 'equal', 'discrimination', 'marginalized', 'inclusion', 'social justice', 'equity']
    },
    { 
      value: 'sdg11', 
      label: 'SDG 11: Sustainable Cities and Communities',
      keywords: ['city', 'urban', 'community', 'housing', 'transport', 'public space', 'sustainable city', 'urbanization']
    },
    { 
      value: 'sdg12', 
      label: 'SDG 12: Responsible Consumption and Production',
      keywords: ['consumption', 'production', 'waste', 'recycle', 'sustainable', 'circular economy', 'supply chain']
    },
    { 
      value: 'sdg13', 
      label: 'SDG 13: Climate Action',
      keywords: ['climate', 'climate change', 'global warming', 'emission', 'carbon', 'greenhouse', 'weather', 'environment']
    },
    { 
      value: 'sdg14', 
      label: 'SDG 14: Life Below Water',
      keywords: ['ocean', 'marine', 'sea', 'coral', 'fishery', 'aquatic', 'underwater', 'coastal', 'marine life']
    },
    { 
      value: 'sdg15', 
      label: 'SDG 15: Life on Land',
      keywords: ['forest', 'land', 'biodiversity', 'ecosystem', 'wildlife', 'conservation', 'habitat', 'deforestation']
    },
    { 
      value: 'sdg16', 
      label: 'SDG 16: Peace, Justice and Strong Institutions',
      keywords: ['peace', 'justice', 'institution', 'corruption', 'governance', 'rule of law', 'security', 'conflict']
    },
    { 
      value: 'sdg17', 
      label: 'SDG 17: Partnerships for the Goals',
      keywords: ['partnership', 'collaboration', 'cooperation', 'alliance', 'global partnership', 'multi-stakeholder']
    }
  ];

  // Populate form when editing
  useEffect(() => {
    if (article && isEditing) {
      // For existing images from server, store them in existingImages
      // imagePreviews will be the same URLs that we'll display
      const existingImages = article.imagePreviews || [];
      
      setFormData({
        title: article.title || '',
        department: article.department || '',
        content: article.content || '',
        date: article.date || new Date().toISOString().split('T')[0],
        sdg: article.sdg || [],
        images: [], // No new images by default when editing
        imagePreviews: existingImages, // Display existing images as previews
        existingImages: existingImages // Keep track of original images
      });
    } else {
      // Reset form for new article
      setFormData({
        title: '',
        department: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        sdg: [],
        images: [],
        imagePreviews: [],
        existingImages: []
      });
    }
    setErrors({});
  }, [article, isEditing, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSDGChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const newSDG = checked 
        ? [...prev.sdg, value]
        : prev.sdg.filter(sdg => sdg !== value);
      return { ...prev, sdg: newSDG };
    });
  };

  const handleAutoSelectSDG = () => {
    const title = formData.title || '';
    const content = formData.content || '';
    const combinedText = (title + ' ' + content).toLowerCase();
    
    setIsAutoSelecting(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const matchedSDGs = sdgOptions
        .filter(sdg => {
          // Check if any keyword from this SDG appears in the content
          return sdg.keywords.some(keyword => 
            combinedText.includes(keyword.toLowerCase())
          );
        })
        .map(sdg => sdg.value);
      
      // If no SDGs matched, show a message or select none
      if (matchedSDGs.length === 0) {
        // Optionally show a toast or notification
        console.log('No SDGs matched the content. Please select manually.');
        setFormData(prev => ({
          ...prev,
          sdg: []
        }));
        setErrors(prev => ({
          ...prev,
          sdg: 'No SDGs detected. Please select manually.'
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          sdg: matchedSDGs
        }));
        // Clear error if exists
        if (errors.sdg) {
          setErrors(prev => ({
            ...prev,
            sdg: ''
          }));
        }
      }
      
      setIsAutoSelecting(false);
    }, 800); // Simulate processing time
  };

  const handleClearSDG = () => {
    setFormData(prev => ({
      ...prev,
      sdg: []
    }));
    // Set error if SDG is required
    setErrors(prev => ({
      ...prev,
      sdg: 'Please select at least one SDG'
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // When editing, check total images limit against existing + new
      const totalExisting = formData.existingImages.length;
      const totalNewBefore = formData.images.length;
      const totalAfterAdd = totalExisting + totalNewBefore + files.length;
      
      if (totalAfterAdd > 3) {
        setErrors(prev => ({
          ...prev,
          images: `Maximum 3 images allowed (currently ${totalExisting} existing + ${totalNewBefore} new)`
        }));
        return;
      }

      const validFiles = [];
      const validPreviews = [];
      let hasError = false;

      files.forEach(file => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            images: 'Please upload valid image files (JPEG, PNG, GIF, or WebP)'
          }));
          hasError = true;
          return;
        }

        // Validate file size (max 5MB each)
        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            images: 'Each image must be less than 5MB'
          }));
          hasError = true;
          return;
        }

        validFiles.push(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          validPreviews.push(reader.result);
          if (validPreviews.length === validFiles.length) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...validFiles],
              imagePreviews: [...prev.imagePreviews, ...validPreviews]
            }));
            // Clear image error if exists
            if (errors.images) {
              setErrors(prev => ({
                ...prev,
                images: ''
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });

      if (hasError) {
        return;
      }
    }
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const newPreviews = [...prev.imagePreviews];
      const newImages = [...prev.images];
      const existingCount = prev.existingImages.length;
      
      // Check if removing an existing image or a new image
      if (index < existingCount) {
        // Removing an existing image from server
        const newExisting = [...prev.existingImages];
        newExisting.splice(index, 1);
        newPreviews.splice(index, 1);
        
        return {
          ...prev,
          imagePreviews: newPreviews,
          existingImages: newExisting
        };
      } else {
        // Removing a newly added image
        const newImageIndex = index - existingCount;
        newImages.splice(newImageIndex, 1);
        newPreviews.splice(index, 1);
        
        return {
          ...prev,
          images: newImages,
          imagePreviews: newPreviews
        };
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (formData.sdg.length === 0) {
      newErrors.sdg = 'Please select at least one SDG';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('department', formData.department);
      submitData.append('content', formData.content.trim());
      submitData.append('date', formData.date);
      submitData.append('status', isEditing ? (article?.status || 'pending') : 'Draft');

      formData.sdg.forEach((sdg) => {
        // Extract number from 'sdg1', 'sdg2', etc. to get 1, 2, etc.
        const sdgNumber = parseInt(sdg.replace('sdg', ''), 10);
        submitData.append('sdg[]', sdgNumber);
      });

      // Only append new images (not existing ones)
      formData.images.forEach((file) => {
        if (file instanceof File) {
          submitData.append('images[]', file);
        }
      });

      // When editing, send the count of existing images to keep
      if (isEditing) {
        submitData.append('keep_existing_images_count', formData.existingImages.length);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      let response;
      if (isEditing) {
        // Use PUT for updates
        response = await axios.put(`/admin/articles/${article.id}`, submitData, config);
      } else {
        // Use POST for create
        response = await axios.post('/admin/articles', submitData, config);
      }

      const savedArticle = response?.data?.article || {
        ...formData,
        id: isEditing ? article.id : Date.now(),
        status: isEditing ? article.status : 'Draft',
        imageUrls: formData.imagePreviews || [],
      };

      onSave({
        ...savedArticle,
        status: savedArticle.status === 'pending' ? 'Draft' : savedArticle.status,
      });
      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Unable to save article. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const departmentOptions = Array.isArray(departments)
    ? departments.map((dept) => {
        if (typeof dept === 'string') return { id: dept, name: dept };
        return {
          id: dept.id ?? dept.slug ?? dept.name,
          name: dept.name ?? dept.label ?? dept.value ?? 'Unknown Department'
        };
      })
    : [];

  // Function to render image slots
  const renderImageSlots = () => {
    const slots = [];
    const totalSlots = 3;
    
    for (let i = 0; i < totalSlots; i++) {
      const hasImage = i < formData.imagePreviews.length;
      
      if (hasImage) {
        // Show uploaded image
        slots.push(
          <div key={i} className="relative group">
            <img 
              src={formData.imagePreviews[i]} 
              alt={`Preview ${i + 1}`} 
              className="w-full h-24 rounded-lg border border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
              {i + 1}
            </div>
          </div>
        );
      } else {
        // Show grey placeholder
        slots.push(
          <div key={i} className="w-full h-24 rounded-lg bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-gray-400">Slot {i + 1}</span>
            </div>
          </div>
        );
      }
    }
    
    return slots;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? "Edit Article" : "Add New Article"}
      size="full"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title - Full Width */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1.5">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none bg-white ${
              errors.department ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select department</option>
            {departmentOptions.map((dept) => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
          {errors.department && (
            <p className="mt-1.5 text-sm text-red-500">{errors.department}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="mt-1.5 text-sm text-red-500">{errors.date}</p>
          )}
        </div>

        {/* Images - Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Featured Images <span className="text-red-500">*</span>
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Max 3 images)
            </span>
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-2.5 border-2 border-dashed rounded-lg transition-colors text-sm flex items-center gap-2 ${
                errors.images 
                  ? 'border-red-500 text-red-600 hover:border-red-400' 
                  : formData.imagePreviews.length > 0
                    ? 'border-green-500 text-green-600 hover:border-green-400'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
              disabled={formData.imagePreviews.length >= 3}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formData.imagePreviews.length > 0 
                ? `Upload More (${formData.imagePreviews.length}/3)` 
                : 'Upload Images'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            {formData.imagePreviews.length > 0 && (
              <span className="text-sm text-gray-500">
                {formData.existingImages.length > 0 && `${formData.existingImages.length} existing + `}
                {formData.imagePreviews.length - formData.existingImages.length} new
              </span>
            )}
          </div>
          {errors.images && (
            <p className="mt-1.5 text-sm text-red-500">{errors.images}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB each
          </p>
          
          {/* Image Previews Grid - Always shows 3 slots */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {renderImageSlots()}
          </div>
        </div>

        {/* Content - Full Width */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1.5">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            placeholder="Write your article content here..."
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none resize-y min-h-[200px] ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.content && (
            <p className="mt-1.5 text-sm text-red-500">{errors.content}</p>
          )}
        </div>

        {/* SDG - Full Width with Auto Select Button */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Sustainable Development Goals (SDG) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAutoSelectSDG}
                disabled={isAutoSelecting || (!formData.title && !formData.content)}
                className={`px-3 py-1 text-xs font-medium text-white rounded-lg transition-colors flex items-center gap-1 ${
                  isAutoSelecting || (!formData.title && !formData.content)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isAutoSelecting ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  '🤖 Auto Detect SDG'
                )}
              </button>
              <button
                type="button"
                onClick={handleClearSDG}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-4 border border-gray-300 rounded-lg">
            {sdgOptions.map(sdg => (
              <label key={sdg.value} className="flex items-start gap-2 text-sm hover:bg-gray-50 p-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  value={sdg.value}
                  checked={formData.sdg.includes(sdg.value)}
                  onChange={handleSDGChange}
                  className="mt-0.5 text-gray-800 focus:ring-gray-800 rounded"
                />
                <span className="text-gray-700">{sdg.label}</span>
              </label>
            ))}
          </div>
          {errors.sdg && (
            <p className="mt-1.5 text-sm text-red-500">{errors.sdg}</p>
          )}
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              {isAutoSelecting ? 'Analyzing content...' : 'Select one or more SDGs that this article relates to'}
            </p>
            <span className="text-xs text-gray-500">
              {formData.sdg.length} of {sdgOptions.length} selected
            </span>
          </div>
          {formData.sdg.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.sdg.map(sdg => {
                const option = sdgOptions.find(opt => opt.value === sdg);
                return option ? (
                  <span key={sdg} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                    {option.label.split(':')[0]}
                  </span>
                ) : null;
              })}
            </div>
          )}
          {!formData.title && !formData.content && (
            <p className="mt-2 text-xs text-amber-600">
              ⚠️ Please add a title and content first for auto-detection
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{isEditing ? 'Update Article' : 'Create Article'}</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}