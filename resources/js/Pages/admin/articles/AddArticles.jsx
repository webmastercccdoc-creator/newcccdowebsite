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
  isViewing = false,
  departments = [],
  setIsEditing = null,
  isReviewMode = false,
  onApproveFromReview = null,
  onRejectFromReview = null
}) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    content: '',
    date: '',
    sdg: [],
    images: [],
    imagePreviews: [],
    existingImages: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSelecting, setIsAutoSelecting] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [isReviewEditing, setIsReviewEditing] = useState(false);
  const [userDepartments, setUserDepartments] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const fileInputRef = useRef(null);

  const effectiveIsEditing = isEditing || isReviewEditing;
  const isReadOnlyView = isViewing && !effectiveIsEditing;

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

  // ============================================
  // FETCH USER'S DEPARTMENTS
  // ============================================
  useEffect(() => {
    if (isOpen) {
      fetchUserDepartments();
    }
  }, [isOpen]);

  const fetchUserDepartments = async () => {
    setIsLoadingDepartments(true);
    try {
      const response = await axios.get('/user/departments');
      
      console.log('User departments response:', response.data);
      
      // Handle different response formats
      let deptList = [];
      
      if (response.data?.departments) {
        deptList = response.data.departments;
      } else if (response.data?.department_names) {
        const slugs = response.data?.department_slugs || response.data?.department_names || [];
        deptList = response.data.department_names.map((name, index) => ({
          id: slugs[index] || name,
          name: name,
          slug: slugs[index] || name
        }));
      } else if (Array.isArray(response.data)) {
        deptList = response.data;
      }
      
      // Store the department objects directly (not just names)
      const deptObjects = deptList.map(dept => {
        if (typeof dept === 'string') {
          return { id: dept, name: dept, slug: dept };
        }
        return {
          id: dept.id || dept.slug || dept.name || dept,
          name: dept.name || dept.label || dept.value || String(dept),
          slug: dept.slug || dept.value || dept.name || dept.id || String(dept)
        };
      });
      
      console.log('Processed department objects:', deptObjects);
      
      setUserDepartments(deptObjects);
      
    } catch (error) {
      console.error('Failed to fetch user departments:', error);
      // Fallback to the departments prop if API fails
      if (departments.length > 0) {
        const fallbackDepts = departments.map(dept => {
          if (typeof dept === 'string') return { id: dept, name: dept };
          return { id: dept.id || dept.name, name: dept.name || dept };
        });
        setUserDepartments(fallbackDepts);
      } else {
        setUserDepartments([
          { id: 'IT', name: 'IT' },
          { id: 'HR', name: 'HR' },
          { id: 'Finance', name: 'Finance' },
          { id: 'Marketing', name: 'Marketing' },
          { id: 'Operations', name: 'Operations' },
          { id: 'Sales', name: 'Sales' }
        ]);
      }
    } finally {
      setIsLoadingDepartments(false);
    }
  };

  // ============================================
  // POPULATE FORM WHEN EDITING
  // ============================================
  useEffect(() => {
    setIsFormReady(false);

    if (article && (effectiveIsEditing || isViewing)) {
      const imageList = article.imagePreviews || article.images || [];
      const existingImages = Array.isArray(imageList) ? imageList : [];

      const formattedSdg = (article.sdg || []).map(sdg => {
        if (typeof sdg === 'number') {
          return `sdg${sdg}`;
        }
        return sdg;
      });

      setFormData({
        title: article.title || '',
        department: article.department || '',
        content: article.content || '',
        date: article.date || new Date().toISOString().split('T')[0],
        sdg: formattedSdg,
        images: [],
        imagePreviews: existingImages,
        existingImages: existingImages
      });
    } else {
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
    
    setTimeout(() => {
      setIsFormReady(true);
    }, 0);
  }, [article, isEditing, isOpen, isViewing]);

  // ============================================
  // HANDLE FORM CHANGES
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // ============================================
  // SDG HANDLERS
  // ============================================
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

    setIsAutoSelecting(true);

    const applySuggestions = (matchedSDGs) => {
      if (matchedSDGs.length === 0) {
        setFormData(prev => ({ ...prev, sdg: [] }));
        setErrors(prev => ({
          ...prev,
          sdg: 'No confident SDGs detected. Please select manually.'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, sdg: matchedSDGs }));
      setErrors(prev => ({ ...prev, sdg: '' }));
    };

    const useLocalFallback = () => {
      const combinedText = `${title} ${content}`
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const matchedSDGs = sdgOptions
        .filter(sdg => {
          const score = sdg.keywords.reduce((total, keyword) => {
            const normalizedKeyword = keyword.toLowerCase();
            const keywordPattern = new RegExp(
              `(^|\\s)${normalizedKeyword.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(?=\\s|$)`,
              'i'
            );

            if (!keywordPattern.test(combinedText)) {
              return total;
            }

            return total + (normalizedKeyword.includes(' ') || normalizedKeyword.length >= 6 ? 2 : 1);
          }, 0);

          return score >= 2;
        })
        .map(sdg => sdg.value);

      applySuggestions(matchedSDGs);
    };

    axios.post('/admin/articles/suggest-sdgs', { title, content })
      .then(response => {
        const matchedSDGs = (response.data?.sdgs || [])
          .filter(sdg => Number(sdg.confidence) >= 0.75)
          .map(sdg => `sdg${Number(sdg.number)}`);

        applySuggestions([...new Set(matchedSDGs)]);
      })
      .catch(() => {
        useLocalFallback();
      })
      .finally(() => {
        setIsAutoSelecting(false);
      });
  };

  const handleClearSDG = () => {
    setFormData(prev => ({
      ...prev,
      sdg: []
    }));
    setErrors(prev => ({
      ...prev,
      sdg: 'Please select at least one SDG'
    }));
  };

  // ============================================
  // IMAGE HANDLERS
  // ============================================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
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
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            images: 'Please upload valid image files (JPEG, PNG, GIF, or WebP)'
          }));
          hasError = true;
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          setErrors(prev => ({
            ...prev,
            images: 'Each image must be less than 5MB'
          }));
          hasError = true;
          return;
        }

        validFiles.push(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          validPreviews.push(reader.result);
          if (validPreviews.length === validFiles.length) {
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, ...validFiles],
              imagePreviews: [...prev.imagePreviews, ...validPreviews]
            }));
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
      
      if (index < existingCount) {
        const newExisting = [...prev.existingImages];
        newExisting.splice(index, 1);
        newPreviews.splice(index, 1);
        
        return {
          ...prev,
          imagePreviews: newPreviews,
          existingImages: newExisting
        };
      } else {
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

  // ============================================
  // FORM ACTIONS
  // ============================================
  const handleClear = () => {
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
    setErrors({});
    setIsReviewEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};
    const title = (formData.title || '').trim();
    const content = (formData.content || '').trim();
    const department = (formData.department || '').trim();
    
    if (!title) {
      newErrors.title = 'Title is required';
    }
    if (!department) {
      newErrors.department = 'Department is required';
    }
    if (!content) {
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
    
    if (!isFormReady) {
      setErrors({
        title: 'Form is still loading, please wait...'
      });
      return;
    }
    
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
      
      let statusValue = effectiveIsEditing ? (article?.status || 'pending') : 'Draft';
      if (statusValue === 'Draft' || statusValue === 'draft') {
        statusValue = 'pending';
      } else if (statusValue === 'Approved' || statusValue === 'approved') {
        statusValue = 'approved';
      } else if (statusValue === 'Rejected' || statusValue === 'rejected') {
        statusValue = 'rejected';
      } else if (statusValue === 'Pending' || statusValue === 'pending') {
        statusValue = 'pending';
      }
      submitData.append('status', statusValue);

      const normalizedSdgs = formData.sdg
        .map((sdg) => {
          if (typeof sdg === 'number') return sdg;
          const digits = String(sdg).match(/\d+/g);
          return digits ? Number(digits[0]) : null;
        })
        .filter((sdg) => Number.isInteger(sdg) && sdg >= 1 && sdg <= 17);

      if (effectiveIsEditing) {
        submitData.append('_method', 'PUT');
      }

      normalizedSdgs.forEach((sdgNumber) => {
        submitData.append('sdg[]', sdgNumber);
      });

      formData.images.forEach((file) => {
        if (file instanceof File) {
          submitData.append('images[]', file);
        }
      });

      if (isEditing) {
        submitData.append('keep_existing_images_count', formData.existingImages.length);
      }

      const config = {};

      let response;
      if (effectiveIsEditing) {
        response = await axios.post(`/admin/articles/${article.id}`, submitData, config);
      } else {
        response = await axios.post('/admin/articles', submitData, config);
      }

      const savedArticle = response?.data?.article || response?.data || {
        ...formData,
        id: isEditing ? article.id : Date.now(),
        status: isEditing ? article.status : 'pending',
        imageUrls: formData.imagePreviews || [],
      };

      const responseImages = response?.data?.images || [];
      
      let displayStatus = savedArticle.status;
      if (displayStatus === 'pending' || displayStatus === 'Draft' || displayStatus === 'draft') {
        displayStatus = 'Pending';
      } else if (displayStatus === 'approved') {
        displayStatus = 'Approved';
      } else if (displayStatus === 'rejected') {
        displayStatus = 'Rejected';
      } else if (displayStatus === 'archived') {
        displayStatus = 'Archived';
      }

      if (onSave) {
        onSave({
          ...savedArticle,
          status: displayStatus,
          imagePreviews: responseImages.map(img => img.image_path || img.image),
        });
      }
      
      handleClear();
      onClose();
    } catch (error) {
      console.error('Error saving article:', error);
      
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const newErrors = {};
        Object.keys(validationErrors).forEach(field => {
          newErrors[field] = Array.isArray(validationErrors[field]) 
            ? validationErrors[field].join(', ')
            : validationErrors[field];
        });
        setErrors(newErrors);
        
        const errorDetails = Object.entries(newErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join('\n');
        setErrors(prev => ({
          ...prev,
          submit: `Validation error: ${errorDetails}`
        }));
      } else if (error.response?.status === 404) {
        setErrors(prev => ({
          ...prev,
          submit: 'Article not found. Please refresh and try again.'
        }));
      } else if (error.response?.status === 422) {
        const errorMsg = error.response?.data?.message || 'Validation failed. Check the console for details.';
        setErrors(prev => ({
          ...prev,
          submit: errorMsg
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          submit: error.response?.data?.message || 'Unable to save article. Please try again.'
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // GET DEPARTMENT OPTIONS
  // ============================================
  const getDepartmentOptions = () => {
    // userDepartments is already an array of objects with id and name
    if (userDepartments.length > 0) {
      return userDepartments;
    }
    
    // Fallback to the departments prop
    if (Array.isArray(departments) && departments.length > 0) {
      return departments.map((dept) => {
        if (typeof dept === 'string') return { id: dept, name: dept, slug: dept };
        return {
          id: dept.id ?? dept.slug ?? dept.name,
          name: dept.name ?? dept.label ?? dept.value ?? 'Unknown Department',
          slug: dept.slug ?? dept.value ?? dept.name ?? dept.id ?? 'unknown-department'
        };
      });
    }
    
    return [];
  };

  const departmentOptions = getDepartmentOptions();

  // ============================================
  // RENDER IMAGE SLOTS
  // ============================================
  const renderImageSlots = () => {
    const slots = [];
    const totalSlots = 3;
    
    for (let i = 0; i < totalSlots; i++) {
      const hasImage = i < formData.imagePreviews.length;
      
      if (hasImage) {
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

  // ============================================
  // RENDER
  // ============================================
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={effectiveIsEditing ? "Edit Article" : (isViewing ? "View Article" : (isEditing ? "Edit Article" : "Add New Article"))}
      size="full"
      fullScreen={true}
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
            disabled={isReadOnlyView}
            placeholder="Enter article title"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } ${isReadOnlyView ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          />
          {errors.title && (
            <p className="mt-1.5 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Department - Filtered by user's accessible departments */}
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1.5">
            Department <span className="text-red-500">*</span>
          </label>
          {isLoadingDepartments ? (
            <div className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 text-gray-500">
              Loading departments...
            </div>
          ) : (
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={isReadOnlyView || departmentOptions.length === 0}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none bg-white ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              } ${(isReadOnlyView || departmentOptions.length === 0) ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            >
              <option value="">
                {departmentOptions.length === 0 ? 'No departments available' : 'Select department'}
              </option>
              {departmentOptions.map((dept) => (
                <option key={dept.id} value={dept.slug ?? dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}
          {errors.department && (
            <p className="mt-1.5 text-sm text-red-500">{errors.department}</p>
          )}
          {departmentOptions.length === 0 && !isLoadingDepartments && (
            <p className="mt-1.5 text-sm text-amber-600">
              ⚠️ No departments assigned to you. Please contact your administrator.
            </p>
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
            disabled={isReadOnlyView}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } ${isReadOnlyView ? 'bg-gray-50 cursor-not-allowed' : ''}`}
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
              disabled={isReadOnlyView || formData.imagePreviews.length >= 3}
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
            disabled={isReadOnlyView}
            rows="8"
            placeholder="Write your article content here..."
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all outline-none resize-y min-h-[200px] ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            } ${isReadOnlyView ? 'bg-gray-50 cursor-not-allowed' : ''}`}
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

        {/* Form Actions - Full Width Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {isViewing && effectiveIsEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsReviewEditing(false)}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel Edit
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          ) : isViewing ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setIsReviewEditing(true)}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Edit
              </button>
              {onApproveFromReview && (
                <button
                  type="button"
                  onClick={onApproveFromReview}
                  className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Approve
                </button>
              )}
              {onRejectFromReview && (
                <button
                  type="button"
                  onClick={onRejectFromReview}
                  className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Reject
                </button>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}