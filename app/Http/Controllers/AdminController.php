<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use App\Models\AccessControl;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('admin/Dashboard');
    }

    /**
     * Get all users with their departments and permissions
     * This is the ONLY users() method - the duplicate has been removed
     */
    public function users()
    {
        $users = User::query()
            ->with('departments')
            ->select('id', 'firstname', 'middlename', 'lastname', 'name', 'email', 'email_verified_at', 'status', 'created_at')
            ->orderByRaw('status = "active" DESC') // Active users first
            ->orderBy('firstname', 'asc')
            ->get()
            ->map(function ($user) {
                $departmentNames = $user->departments->pluck('name')->toArray();
                
                // Get user permissions from access_controls table
                $permissions = DB::table('access_controls')
                    ->where('user_id', $user->id)
                    ->pluck('permission')
                    ->toArray();

                return [
                    'id' => $user->id,
                    'firstname' => $user->firstname,
                    'middlename' => $user->middlename,
                    'lastname' => $user->lastname,
                    'name' => $user->name,
                    'email' => $user->email,
                    'email_verified_at' => $user->email_verified_at ? $user->email_verified_at->format('Y-m-d H:i:s') : null,
                    'created_at' => $user->created_at ? $user->created_at->format('Y-m-d H:i:s') : null,
                    'status' => $user->status ?? 'active',
                    'departments' => $departmentNames,
                    'permissions' => $permissions,
                    'department' => $departmentNames[0] ?? 'N/A',
                    'role' => 'User',
                ];
            });

        return Inertia::render('admin/usermanagement/Users', [
            'users' => $users,
        ]);
    }

    public function getDepartments()
    {
        $departments = Department::select('name')
            ->orderBy('name')
            ->get()
            ->pluck('name')
            ->toArray();

        return response()->json([
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'departments' => 'required|array|min:1',
            'departments.*' => 'string|exists:departments,name',
            'status' => 'required|in:active,inactive',
            'password' => 'required|string|min:6',
            'access_controls' => 'required|array|min:1',
            'access_controls.*' => 'string|in:articles,approve_articles,promotions,content,research,user_management,events,settings',
        ]);

        try {
            DB::beginTransaction();

            $fullName = trim(
                $validated['first_name'] . ' ' . 
                ($validated['middle_name'] ? $validated['middle_name'] . ' ' : '') . 
                $validated['last_name']
            );

            $user = User::create([
                'firstname' => $validated['first_name'],
                'middlename' => $validated['middle_name'] ?? '',
                'lastname' => $validated['last_name'],
                'name' => $fullName,
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'status' => $validated['status'],
                'email_verified_at' => now(),
            ]);

            // Attach departments
            $departmentIds = Department::whereIn('name', $validated['departments'])->pluck('id');
            $user->departments()->attach($departmentIds);

            // Attach access controls
            $accessControls = [];
            foreach ($validated['access_controls'] as $permission) {
                $accessControls[] = [
                    'user_id' => $user->id,
                    'permission' => $permission,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            if (!empty($accessControls)) {
                DB::table('access_controls')->insert($accessControls);
            }

            DB::commit();

            $permissions = DB::table('access_controls')
                ->where('user_id', $user->id)
                ->pluck('permission')
                ->toArray();

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'departments' => $user->departments->pluck('name')->toArray(),
                    'permissions' => $permissions,
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'departments' => 'required|array|min:1',
            'departments.*' => 'string|exists:departments,name',
            'status' => 'required|in:active,inactive',
            'password' => 'nullable|string|min:6',
            'access_controls' => 'required|array|min:1',
            'access_controls.*' => 'string|in:articles,approve_articles,promotions,content,research,user_management,events,settings',
        ]);

        try {
            DB::beginTransaction();

            $fullName = trim(
                $validated['first_name'] . ' ' . 
                ($validated['middle_name'] ? $validated['middle_name'] . ' ' : '') . 
                $validated['last_name']
            );

            $user->firstname = $validated['first_name'];
            $user->middlename = $validated['middle_name'] ?? '';
            $user->lastname = $validated['last_name'];
            $user->name = $fullName;
            $user->email = $validated['email'];
            $user->status = $validated['status'];

            if (!empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }

            $user->save();

            // Sync departments
            $departmentIds = Department::whereIn('name', $validated['departments'])->pluck('id');
            $user->departments()->sync($departmentIds);

            // Sync access controls
            DB::table('access_controls')->where('user_id', $user->id)->delete();
            
            $accessControls = [];
            foreach ($validated['access_controls'] as $permission) {
                $accessControls[] = [
                    'user_id' => $user->id,
                    'permission' => $permission,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            if (!empty($accessControls)) {
                DB::table('access_controls')->insert($accessControls);
            }

            DB::commit();

            $permissions = DB::table('access_controls')
                ->where('user_id', $user->id)
                ->pluck('permission')
                ->toArray();

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'departments' => $user->departments->pluck('name')->toArray(),
                    'permissions' => $permissions,
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // Delete related records
            DB::table('access_controls')->where('user_id', $id)->delete();
            DB::table('user_departments')->where('user_id', $id)->delete();
            
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $user = User::with('departments')
            ->select('id', 'firstname', 'middlename', 'lastname', 'name', 'email', 'email_verified_at', 'status', 'created_at')
            ->findOrFail($id);

        $accessControls = DB::table('access_controls')
            ->where('user_id', $id)
            ->pluck('permission')
            ->toArray();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'first_name' => $user->firstname,
                'middle_name' => $user->middlename,
                'last_name' => $user->lastname,
                'name' => $user->name,
                'email' => $user->email,
                'status' => $user->status,
                'departments' => $user->departments->pluck('name')->toArray(),
                'access_controls' => $accessControls,
                'permissions' => $accessControls,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
            ]
        ]);
    }
}