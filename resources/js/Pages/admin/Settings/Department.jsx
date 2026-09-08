import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Department() {
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	// Form state
	const [formData, setFormData] = useState({
		id: null,
		name: '',
		slug: '',
		description: ''
	});

	// Departments data
	const [departments, setDepartments] = useState([]);
	const [editingId, setEditingId] = useState(null);

	// Fetch departments on component mount
	useEffect(() => {
		fetchDepartments();
	}, []);

	// Fetch departments from API
	const fetchDepartments = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get('/admin/departments');
			setDepartments(response.data);
		} catch (error) {
			console.error('Error fetching departments:', error);
			alert('Failed to load departments. Please refresh the page.');
		} finally {
			setIsLoading(false);
		}
	};

	// Filter departments based on search term
	const filteredDepartments = departments.filter(dept =>
		dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		dept.slug.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination calculations
	const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);

	// Reset to first page when search changes
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// Get page numbers to display
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - 2);
		let end = Math.min(totalPages, start + maxVisible - 1);
		
		if (end - start < maxVisible - 1) {
			start = Math.max(1, end - maxVisible + 1);
		}
		
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	// Auto-generate slug from name
	const generateSlug = (name) => {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/-+/g, '-'); // Replace multiple hyphens with single
	};

	// Handle name change with auto-slug generation
	const handleNameChange = (e) => {
		const name = e.target.value;
		setFormData(prev => ({
			...prev,
			name: name,
			slug: generateSlug(name)
		}));
	};

	// Reset form
	const resetForm = () => {
		setFormData({
			id: null,
			name: '',
			slug: '',
			description: ''
		});
		setEditingId(null);
	};

	// Handle edit button click
	const handleEdit = (department) => {
		setFormData({
			id: department.id,
			name: department.name,
			slug: department.slug,
			description: department.description || ''
		});
		setEditingId(department.id);
	};

	// Handle form submit (Create/Update)
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!formData.name.trim()) {
			alert('Department name is required.');
			return;
		}

		setIsSubmitting(true);

		try {
			const payload = {
				name: formData.name.trim(),
				slug: formData.slug || generateSlug(formData.name),
				description: formData.description || null
			};

			let response;
			if (editingId) {
				// Update existing department
				response = await axios.put(`/admin/departments/${editingId}`, payload);
				alert('Department updated successfully!');
			} else {
				// Create new department
				response = await axios.post('/admin/departments', payload);
				alert('Department created successfully!');
			}

			// Refresh the list
			await fetchDepartments();
			resetForm();
			
		} catch (error) {
			console.error('Error saving department:', error);
			const errorMessage = error.response?.data?.message || 'Failed to save department. Please try again.';
			alert(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Handle delete
	const handleDelete = async (id, name) => {
		if (!confirm(`Are you sure you want to delete "${name}"?`)) {
			return;
		}

		try {
			await axios.delete(`/admin/departments/${id}`);
			alert('Department deleted successfully!');
			await fetchDepartments();
			if (editingId === id) {
				resetForm();
			}
		} catch (error) {
			console.error('Error deleting department:', error);
			const errorMessage = error.response?.data?.message || 'Failed to delete department. Please try again.';
			alert(errorMessage);
		}
	};

	// Handle cancel edit
	const handleCancelEdit = () => {
		resetForm();
	};

	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium text-gray-900">Department Settings</h3>
			<div className="grid grid-cols-2 gap-6">
				{/* Left side - Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					{editingId && (
						<div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-sm text-blue-700">
							Editing: <span className="font-medium">{formData.name}</span>
							<button
								type="button"
								onClick={handleCancelEdit}
								className="ml-3 text-blue-600 hover:text-blue-800 underline"
							>
								Cancel
							</button>
						</div>
					)}
					<div>
						<label className="block text-sm font-medium text-gray-700">Department Name <span className="text-red-500">*</span></label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleNameChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter department name"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Slug</label>
						<input
							type="text"
							name="slug"
							value={formData.slug}
							onChange={handleInputChange}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
							placeholder="auto-generated from name"
						/>
						<p className="mt-1 text-xs text-gray-500">
							URL-friendly version of the department name (auto-generated)
						</p>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							rows={4}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter department description"
						/>
					</div>
					<div className="flex gap-3">
						<button 
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
									</svg>
									Saving...
								</span>
							) : (
								editingId ? 'Update Department' : 'Save Changes'
							)}
						</button>
						{editingId && (
							<button
								type="button"
								onClick={handleCancelEdit}
								className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
							>
								Cancel
							</button>
						)}
					</div>
				</form>

				{/* Right side - Table with Search and Pagination */}
				<div>
					<div className="flex items-center justify-between mb-3">
						<h4 className="text-md font-medium text-gray-900">Existing Departments</h4>
						<span className="text-sm text-gray-500">
							Total: {departments.length}
						</span>
					</div>
					
					{/* Search Bar */}
					<div className="mb-3 relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<input
							type="text"
							placeholder="Search departments..."
							value={searchTerm}
							onChange={handleSearchChange}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						/>
						{searchTerm && (
							<button
								onClick={() => {
									setSearchTerm('');
									setCurrentPage(1);
								}}
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
							>
								<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						)}
					</div>

					{/* Results Count */}
					<div className="mb-2 text-sm text-gray-500">
						{isLoading ? (
							'Loading departments...'
						) : filteredDepartments.length > 0 ? (
							`Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, filteredDepartments.length)} of ${filteredDepartments.length} departments`
						) : (
							'No departments found'
						)}
					</div>

					{/* Table - Only Name, Slug, and Actions */}
					<div className="border border-gray-200 rounded-md overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full table-fixed divide-y divide-gray-200">
								<thead className="bg-gray-700">
									<tr>
										<th className="w-[45%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Name
										</th>
										<th className="w-[25%] px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
											Slug
										</th>
										<th className="w-[30%] px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider whitespace-nowrap">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{isLoading ? (
										<tr>
											<td colSpan="3" className="px-4 py-6 text-center text-sm text-gray-500">
												<div className="flex items-center justify-center gap-2">
													<svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
														<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
														<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
													</svg>
													Loading...
												</div>
											</td>
										</tr>
									) : currentDepartments.length > 0 ? (
										currentDepartments.map((dept) => (
											<tr key={dept.id} className={editingId === dept.id ? 'bg-blue-50' : ''}>
												<td className="px-4 py-3 text-sm text-gray-900 break-words" title={dept.name}>
													{dept.name}
												</td>
												<td className="px-4 py-3 text-sm">
													<code className="px-2 py-1 bg-gray-100 rounded text-xs truncate block max-w-full" title={dept.slug}>
														{dept.slug}
													</code>
												</td>
												<td className="px-4 py-3 text-sm whitespace-nowrap text-center">
													<button
														onClick={() => handleEdit(dept)}
														className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors mr-1 inline-flex items-center gap-1"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
														</svg>
														Edit
													</button>
													<button
														onClick={() => handleDelete(dept.id, dept.name)}
														className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors inline-flex items-center gap-1"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
														</svg>
														Delete
													</button>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="3" className="px-4 py-6 text-center text-sm text-gray-500">
												{searchTerm ? (
													`No departments found matching "${searchTerm}"`
												) : (
													'No departments available. Create your first department!'
												)}
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>

					{/* Pagination */}
					{totalPages > 1 && !isLoading && (
						<div className="mt-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<button
									onClick={handlePrevPage}
									disabled={currentPage === 1}
									className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Previous
								</button>
								<div className="flex gap-1">
									{getPageNumbers().map((pageNum) => (
										<button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
												currentPage === pageNum
													? 'bg-indigo-600 text-white'
													: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
											}`}
										>
											{pageNum}
										</button>
									))}
								</div>
								<button
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
									className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									Next
								</button>
							</div>
							<span className="text-sm text-gray-500">
								Page {currentPage} of {totalPages}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}