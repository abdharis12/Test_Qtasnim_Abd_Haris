<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepartmentResource;
use App\Models\Departement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    // List semua department
    public function index(): JsonResponse
    {
        $departments = Departement::all();
        return response()->json([
            'success' => true,
            'data' => DepartmentResource::collection($departments)
        ]);
    }

    // Simpan data baru
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:departments,name',
        ]);

        $department = Departement::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Department created successfully',
            'data' => new DepartmentResource($department)
        ], 201);
    }

    // Detail satu department
    public function show(Departement $departement): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => new DepartmentResource($departement)
        ]);
    }

    // Update data
    public function update(Request $request, Departement $departement): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'string|unique:departments,name,' . $departement->id,
        ]);

        $departement->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Department updated successfully',
            'data' => new DepartmentResource($departement)
        ]);
    }

    // Hapus data
    public function destroy(Departement $departement): JsonResponse
    {
        $departement->delete();
        return response()->json([
            'success' => true,
            'message' => 'Department deleted successfully'
        ]);
    }
}
