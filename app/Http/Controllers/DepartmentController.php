<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the departments.
     */
    public function index()
    {
        try {
            $departments = Department::orderBy('name')->get();
            return response()->json($departments);
        } catch (\Exception $e) {
            \Log::error('Department index error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch departments',
                'message' => 'Unable to load departments.'
            ], 500);
        }
    }

    /**
     * Store a newly created department.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:departments,name',
                'slug' => 'nullable|string|max:255|unique:departments,slug',
                'description' => 'nullable|string'
            ]);

            // Auto-generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $department = Department::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Department created successfully.',
                'department' => $department
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Department store error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to create department',
                'message' => 'Unable to create department.'
            ], 500);
        }
    }

    /**
     * Display the specified department.
     */
    public function show($id)
    {
        try {
            $department = Department::findOrFail($id);
            return response()->json($department);
        } catch (\Exception $e) {
            \Log::error('Department show error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Department not found',
                'message' => 'Unable to load department.'
            ], 404);
        }
    }

    /**
     * Update the specified department.
     */
    public function update(Request $request, $id)
    {
        try {
            $department = Department::findOrFail($id);

            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('departments')->ignore($id)
                ],
                'slug' => [
                    'nullable',
                    'string',
                    'max:255',
                    Rule::unique('departments')->ignore($id)
                ],
                'description' => 'nullable|string'
            ]);

            // Auto-generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $department->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Department updated successfully.',
                'department' => $department
            ]);
        } catch (\Exception $e) {
            \Log::error('Department update error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to update department',
                'message' => 'Unable to update department.'
            ], 500);
        }
    }

    /**
     * Remove the specified department.
     */
    public function destroy($id)
    {
        try {
            $department = Department::findOrFail($id);
            
            // Check if department has articles before deleting
            if ($department->articles()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete department because it has associated articles.'
                ], 422);
            }

            $department->delete();

            return response()->json([
                'success' => true,
                'message' => 'Department deleted successfully.'
            ]);
        } catch (\Exception $e) {
            \Log::error('Department destroy error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to delete department',
                'message' => 'Unable to delete department.'
            ], 500);
        }
    }

    /**
     * Get departments for dropdown/select inputs.
     */
    public function getOptions()
    {
        try {
            $departments = Department::orderBy('name')->get(['id', 'name', 'slug']);
            return response()->json($departments);
        } catch (\Exception $e) {
            \Log::error('Department options error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch department options',
                'message' => 'Unable to load department options.'
            ], 500);
        }
    }
}