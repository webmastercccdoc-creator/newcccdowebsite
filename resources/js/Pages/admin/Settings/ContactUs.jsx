export default function ContactUs() {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium text-gray-900">Contact Us Settings</h3>
			<div className="grid grid-cols-1 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">Email Address</label>
					<input
						type="email"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter contact email"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Phone Number</label>
					<input
						type="tel"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter contact phone number"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Address</label>
					<textarea
						rows={3}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="Enter physical address"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">Office Hours</label>
					<input
						type="text"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="e.g., Mon-Fri 9:00 AM - 5:00 PM"
					/>
				</div>
				<button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-fit">
					Save Changes
				</button>
			</div>
		</div>
	);
}
