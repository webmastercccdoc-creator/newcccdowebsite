export default function Department() {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium text-gray-900">Department Settings</h3>
			<div className="grid grid-cols-2 gap-6">
				{/* Left side - Form */}
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">Department Name</label>
						<input
							type="text"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter department name"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">Description</label>
						<textarea
							rows={4}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="Enter department description"
						/>
					</div>
					<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-fit">
						Save Changes
					</button>
				</div>

				{/* Right side - Table */}
				<div>
					<h4 className="text-md font-medium text-gray-900 mb-3">Existing Departments</h4>
					<div className="border border-gray-200 rounded-md overflow-hidden">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-700">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
										Name
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
										Description
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-4 py-3 text-sm text-gray-900">Engineering</td>
									<td className="px-4 py-3 text-sm text-gray-500">Software development team</td>
									<td className="px-4 py-3 text-sm">
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors mr-2 inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											Edit
										</button>
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											Delete
										</button>
									</td>
								</tr>
								<tr>
									<td className="px-4 py-3 text-sm text-gray-900">Marketing</td>
									<td className="px-4 py-3 text-sm text-gray-500">Brand and communications</td>
									<td className="px-4 py-3 text-sm">
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors mr-2 inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											Edit
										</button>
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											Delete
										</button>
									</td>
								</tr>
								<tr>
									<td className="px-4 py-3 text-sm text-gray-900">Finance</td>
									<td className="px-4 py-3 text-sm text-gray-500">Accounting and budgeting</td>
									<td className="px-4 py-3 text-sm">
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors mr-2 inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
											</svg>
											Edit
										</button>
										<button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors inline-flex items-center gap-1">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}