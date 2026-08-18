import { useState, useEffect } from 'react';
import Modal from '@/components/admin/Modal';
import axios from 'axios';

export default function AddUser({ 
  isOpen, 
  onClose, 
  onSave, 
  user = null,
  isEditing = false,
  departments = []
}) {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    departments: [],
    status: 'active',
    password: '',
    password_confirmation: '',
    access_controls: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departmentList, setDepartmentList] = useState(departments || []);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Access Control Options - Updated with Content and Research
  const accessControlOptions = [
    { id: 'articles', label: 'Articles' },
    { id: 'approve_articles', label: 'Approve Articles' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'research', label: 'Research' },
    { id: 'content', label: 'Content' },
    { id: 'user_management', label: 'User Management' },
    { id: 'events', label: 'Events' },
    { id: 'settings', label: 'Settings' }
  ];

  // Populate form when editing
  useEffect(() => {
    if (isOpen && user && isEditing) {
      setFormData({
        first_name: user.first_name || user.firstname || '',
        middle_name: user.middle_name || user.middlename || '',
        last_name: user.last_name || user.lastname || '',
        email: user.email || '',
        departments: user.departments || [],
        status: user.status || 'active',
        password: '',
        password_confirmation: '',
        access_controls: user.access_controls || user.permissions || []
      });
    } else if (isOpen && !isEditing) {
      // Reset form for new user
      setFormData({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        departments: [],
        status: 'active',
        password: '',
        password_confirmation: '',
        access_controls: []
      });
    }
    setErrors({});
  }, [isOpen, user, isEditing]);

  // Fetch departments when modal opens and no departments provided
  useEffect(() => {
    if (isOpen && departmentList.length === 0 && departments.length === 0) {
      fetchDepartments();
    }
  }, [isOpen]);

  const fetchDepartments = async () => {
    setIsLoadingDepartments(true);
    try {
      const response = await axios.get('/admin/departments');
      const deptData = response.data?.departments || response.data || [];
      
      const deptList = deptData.map(dept => {
        if (typeof dept === 'string') return dept;
        return dept.name || dept.label || dept.value || dept;
      });
      
      setDepartmentList(deptList);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      setDepartmentList(['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales']);
    } finally {
      setIsLoadingDepartments(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStatusToggle = () => {
    setFormData(prev => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active'
    }));
    if (errors.status) {
      setErrors(prev => ({ ...prev, status: '' }));
    }
  };

  const handleDepartmentToggle = (dept) => {
    setFormData(prev => {
      const currentDepartments = prev.departments || [];
      const newDepartments = currentDepartments.includes(dept)
        ? currentDepartments.filter(d => d !== dept)
        : [...currentDepartments, dept];
      
      return { ...prev, departments: newDepartments };
    });
  };

  const handleRemoveDepartment = (dept) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.filter(d => d !== dept)
    }));
  };

  const handleAccessControlToggle = (accessId) => {
    setFormData(prev => {
      const currentAccess = prev.access_controls || [];
      const newAccess = currentAccess.includes(accessId)
        ? currentAccess.filter(a => a !== accessId)
        : [...currentAccess, accessId];
      
      return { ...prev, access_controls: newAccess };
    });
  };

  const getFilteredDepartments = () => {
    if (!searchTerm) return departmentList;
    return departmentList.filter(dept => 
      dept.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.status) newErrors.status = 'Status is required';
    
    // Only validate password for new users
    if (!isEditing) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
    } else {
      // For editing, only validate password if it's provided
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password && formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      departments: [],
      status: 'active',
      password: '',
      password_confirmation: '',
      access_controls: []
    });
    setErrors({});
    setSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        name: `${formData.first_name} ${formData.middle_name ? formData.middle_name + ' ' : ''}${formData.last_name}`.trim()
      };
      
      // Remove empty password fields when editing
      if (isEditing) {
        if (!submitData.password) {
          delete submitData.password;
          delete submitData.password_confirmation;
        }
        // Add user ID for update
        submitData.id = user?.id;
      }
      
      await onSave(submitData);
      handleClear();
      onClose();
    } catch (error) {
      console.error('Failed to save user:', error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to save user. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDepartments = getFilteredDepartments();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit User" : "Add New User"}
      size="full"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {errors.submit}
          </div>
        )}

        {/* Name Fields - First, Middle, Last */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none ${
                errors.first_name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter first name"
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Middle Name
            </label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter middle name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none ${
                errors.last_name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter last name"
            />
            {errors.last_name && (
              <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter email address"
            disabled={isEditing}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
          {isEditing && (
            <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
          )}
        </div>
        
        {/* Departments - Full Width (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Departments
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Optional - Select one or more)
            </span>
          </label>

          {/* Department Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isLoadingDepartments}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-left flex items-center justify-between ${
                errors.departments ? 'border-red-500' : 'border-gray-200'
              } ${isLoadingDepartments ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
              <span className={isLoadingDepartments ? 'text-gray-500' : 'text-gray-700'}>
                {isLoadingDepartments 
                  ? 'Loading departments...' 
                  : formData.departments.length > 0
                  ? `${formData.departments.length} department${formData.departments.length > 1 ? 's' : ''} selected`
                  : 'Select departments (optional)'}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && !isLoadingDepartments && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-hidden">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search departments..."
                      className="w-full pl-8 pr-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Department List */}
                <div className="overflow-y-auto max-h-32">
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map(dept => (
                      <label
                        key={dept}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={formData.departments.includes(dept)}
                          onChange={() => handleDepartmentToggle(dept)}
                          className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 rounded"
                        />
                        <span className="text-gray-700">{dept}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500 text-center">
                      No departments found
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-2 border-t border-gray-200 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        departments: departmentList
                      }));
                      setErrors(prev => ({ ...prev, departments: '' }));
                    }}
                    className="flex-1 px-2 py-1 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, departments: [] }));
                    }}
                    className="flex-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Selected Departments Display */}
          <div className={`mt-2 p-3 border rounded-lg min-h-[52px] ${
            errors.departments ? 'border-red-500' : 'border-gray-200'
          } ${formData.departments.length === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            {formData.departments.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {formData.departments.map(dept => (
                  <span 
                    key={dept} 
                    className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
                  >
                    {dept}
                    <button
                      type="button"
                      onClick={() => handleRemoveDepartment(dept)}
                      className="hover:text-emerald-900 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-sm text-gray-400">No departments selected</span>
            )}
          </div>

          {errors.departments && (
            <p className="mt-1 text-xs text-red-500">{errors.departments}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.departments.length} department{formData.departments.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        {/* Access Control - Checkbox Selection (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Access Control
            <span className="text-xs font-normal text-gray-500 ml-2">
              (Optional - Select one or more)
            </span>
          </label>
          
          <div className={`p-3 border rounded-lg ${
            errors.access_controls ? 'border-red-500' : 'border-gray-200'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {accessControlOptions.map(option => (
                <label
                  key={option.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    formData.access_controls.includes(option.id)
                      ? 'bg-emerald-50 border border-emerald-500'
                      : 'bg-gray-50 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.access_controls.includes(option.id)}
                    onChange={() => handleAccessControlToggle(option.id)}
                    className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {errors.access_controls && (
            <p className="mt-1 text-xs text-red-500">{errors.access_controls}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.access_controls.length} access control{formData.access_controls.length !== 1 ? 's' : ''} selected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password {!isEditing && <span className="text-red-500">*</span>}
              {isEditing && <span className="text-xs font-normal text-gray-500 ml-2">(Leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder={isEditing ? "Enter new password (optional)" : "Enter password (min 6 characters)"}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm Password {!isEditing && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none ${
                errors.password_confirmation ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-xs text-red-500">{errors.password_confirmation}</p>
            )}
          </div>
        </div>

        {/* Status Toggle - Below password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Status <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={handleStatusToggle}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none flex items-center justify-between ${
                errors.status ? 'border-red-500' : 'border-gray-200'
              } bg-white`}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  formData.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {formData.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  Click to toggle
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                formData.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out mt-0.5 ${
                  formData.status === 'active' ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {formData.status === 'active' 
              ? 'User will have full access to the system' 
              : 'User will be restricted from accessing the system'}
          </p>
          {errors.status && (
            <p className="mt-1 text-xs text-red-500">{errors.status}</p>
          )}
        </div>
        
        {/* Footer Buttons - Full Width */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoadingDepartments}
            className="flex-1 px-6 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>{isEditing ? 'Update User' : 'Add User'}</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}