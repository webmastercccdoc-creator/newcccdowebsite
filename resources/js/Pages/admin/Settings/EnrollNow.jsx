export default function EnrollNow() {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium text-gray-900">Enroll Now Settings</h3>
			<div className="grid grid-cols-1 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Application Status</label>
					<select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
						<option>Open</option>
						<option>Closed</option>
						<option>Limited</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Application Deadline</label>
					<input
						type="date"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Enrollment Link</label>
					<input
						type="url"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="https://example.com/enroll"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Application Fee ($)</label>
					<input
						type="number"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter application fee"
					/>
				</div>
				<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-fit">
					Save Changes
				</button>
			</div>
		</div>
	);
}
