export default function Banner() {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-medium text-gray-900">Banner Settings</h3>
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
				<div>
					<label className="block text-sm font-medium text-gray-700">Banner Link</label>
					<input
						type="url"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
						placeholder="https://example.com"
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
		</div>
	);
}
