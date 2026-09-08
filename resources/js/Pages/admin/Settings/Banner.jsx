import Modal from '@/components/admin/Modal';
import React, { useState } from 'react';

export default function Banner() {
	// State for modal visibility
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	// Sample banner data - replace with your actual data
	const [banners] = useState([
		{ id: 1, image: 'banner-1.jpg', altText: 'Summer Sale', status: 'Active' },
		{ id: 2, image: 'banner-2.png', altText: 'Winter Collection', status: 'Inactive' },
		{ id: 3, image: 'banner-3.gif', altText: 'Flash Deal', status: 'Active' },
		{ id: 4, image: 'banner-4.jpg', altText: 'New Arrival', status: 'Active' },
		{ id: 5, image: 'banner-5.png', altText: 'Holiday Special', status: 'Inactive' },
		{ id: 6, image: 'banner-6.jpg', altText: 'Spring Collection', status: 'Active' },
	]);

	// Filter banners based on search term
	const filteredBanners = banners.filter(banner =>
		banner.altText.toLowerCase().includes(searchTerm.toLowerCase()) ||
		banner.image.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination calculations
	const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBanners = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);

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

	return (
		<div className="space-y-6 h-full overflow-y-auto pr-2">
			{/* Custom scrollbar styles */}
			<style>{`
				/* For WebKit browsers (Chrome, Safari, etc.) */
				.overflow-y-auto::-webkit-scrollbar {
					width: 6px;
				}
				.overflow-y-auto::-webkit-scrollbar-track {
					background: #f1f1f1;
					border-radius: 10px;
				}
				.overflow-y-auto::-webkit-scrollbar-thumb {
					background: #c1c1c1;
					border-radius: 10px;
				}
				.overflow-y-auto::-webkit-scrollbar-thumb:hover {
					background: #a8a8a8;
				}
				/* For Firefox */
				.overflow-y-auto {
					scrollbar-width: thin;
					scrollbar-color: #c1c1c1 #f1f1f1;
				}
			`}</style>

			{/* Header with Banner Settings and Button */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium text-gray-900">Banner Settings</h3>
				<button 
					className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
					onClick={() => setIsModalOpen(true)}
				>
					View All Banners
				</button>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Current Banner</label>
					<div className="mt-1 flex items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
						<div className="text-center">
							<svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
								<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<p className="mt-2 text-sm text-gray-600">Click to upload banner image</p>
							<p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
						</div>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Banner Alt Text</label>
					<input
						type="text"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter banner description"
					/>
				</div>
				<div className="flex items-center">
					<input
						type="checkbox"
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label className="ml-2 block text-sm text-gray-700">Active Banner</label>
				</div>
				<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-fit">
					Save Changes
				</button>
			</div>

			{/* Modal Component */}
			<Modal
			isOpen={isModalOpen}
			onClose={() => setIsModalOpen(false)}
			title="All Banners"
			size="xl"
			>
				<div className="w-full">
					{/* Modal Body */}
					<div className="flex-1 overflow-y-auto p-4">
						{/* Search and results */}
						<div className="bg-gray-100 border border-gray-200 shadow-sm p-4 mb-6">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
							<input
								type="text"
								placeholder="Search banners..."
								value={searchTerm}
								onChange={handleSearchChange}
								className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm bg-white"
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

						</div>
						<div className="mt-3 text-sm text-gray-600">
							{filteredBanners.length > 0 ? (
								<span>
									Showing <span className="font-medium text-gray-800">{indexOfFirstItem + 1}</span> to{' '}
									<span className="font-medium text-gray-800">{Math.min(indexOfLastItem, filteredBanners.length)}</span> of{' '}
									<span className="font-medium text-gray-800">{filteredBanners.length}</span> banners
								</span>
							) : (
								'No banners found'
							)}
						</div>
						</div>

						{/* Banners Table */}
						<div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
							<table className="w-full table-fixed text-sm">
								<thead>
									<tr>
										<th className="w-[8%] text-left py-4 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 bg-gray-700 text-white">
											ID
										</th>
										<th className="w-[22%] text-left py-4 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 bg-gray-700 text-white">
											Image
										</th>
										<th className="w-[30%] text-left py-4 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 bg-gray-700 text-white">
											Alt Text
										</th>
										<th className="w-[15%] text-left py-4 px-3 font-semibold text-xs uppercase tracking-wider border-r border-gray-600 bg-gray-700 text-white">
											Status
										</th>
										<th className="w-[25%] text-center py-4 px-3 font-semibold text-xs uppercase tracking-wider bg-gray-700 text-white">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{currentBanners.length > 0 ? (
										currentBanners.map((banner) => (
											<tr key={banner.id} className={`${banner.id % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
												<td className="py-3 px-3 text-gray-500 text-xs font-medium border-r border-gray-200">
													{banner.id}
												</td>
												<td className="py-3 px-3 border-r border-gray-200">
													<code className="block px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 break-all" title={banner.image}>
														{banner.image}
													</code>
												</td>
												<td className="py-3 px-3 text-gray-800 border-r border-gray-200 break-words" title={banner.altText}>
													{banner.altText}
												</td>
												<td className="py-3 px-3 border-r border-gray-200">
													<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
														banner.status === 'Active' 
															? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
															: 'bg-gray-100 text-gray-700 border-gray-200'
													}`}>
														{banner.status}
													</span>
												</td>
												<td className="py-3 px-3">
													<div className="flex items-center justify-center gap-2">
													<button
														className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-all shadow-sm hover:shadow"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
														</svg>
														Edit
													</button>
													<button
														className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-sm hover:shadow"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
														</svg>
														Delete
													</button>
													</div>
												</td>
											</tr>
										))
									) : (
										<tr>
													<td colSpan="5" className="py-12 text-center bg-gray-50">
														<div className="flex flex-col items-center justify-center">
															<svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm4 12l2.5-3 2 2.5 2 2.5 2.5-3L18 17H8z" />
															</svg>
															<p className="text-gray-500 font-medium">No banners found</p>
															<p className="text-gray-400 text-sm mt-1">
																{searchTerm ? `Try adjusting your search for "${searchTerm}"` : 'Add a banner to see it listed here.'}
															</p>
														</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50">
								<p className="text-sm text-gray-600">
									Showing <span className="font-medium text-gray-800">{indexOfFirstItem + 1}</span> to{' '}
									<span className="font-medium text-gray-800">{Math.min(indexOfLastItem, filteredBanners.length)}</span> of{' '}
									<span className="font-medium text-gray-800">{filteredBanners.length}</span> banners
								</p>
								<div className="flex gap-1">
									<button
										onClick={handlePrevPage}
										disabled={currentPage === 1}
										className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
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
															? 'bg-gray-700 text-white hover:bg-gray-800 shadow-sm'
															: 'text-gray-600 hover:bg-white border border-transparent hover:border-gray-300 bg-white'
												}`}
											>
												{pageNum}
											</button>
										))}
									</div>
									<button
										onClick={handleNextPage}
										disabled={currentPage === totalPages}
										className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
									>
										Next
									</button>
								</div>
							</div>
						)}
					</div>

				</div>
			</Modal>
		</div>
	);
}