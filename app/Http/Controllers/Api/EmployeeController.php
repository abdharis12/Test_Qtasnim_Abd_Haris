<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    /**
     * Menampilkan semua data employee tanpa pagination & search.
     */
    public function index(): JsonResponse
    {
        $employees = Employee::orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data'    => $employees,
        ]);
    }

    /**
     * Menyimpan data employee baru.
     */
    public function store(EmployeeRequest $request): JsonResponse
    {
        $validateData = $request->validated();

        $employee = Employee::create($validateData);

        return response()->json([
            'success' => true,
            'message' => 'Employee Successfully Created',
            'data'    => $employee,
        ], 201);
    }

    /**
     * Menampilkan detail satu employee.
     */
    public function show(Employee $employee): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $employee,
        ]);
    }

    /**
     * Memperbarui data employee.
     */
    public function update(EmployeeRequest $request, Employee $employee): JsonResponse
    {
        $validateData = $request->validated();

        $employee->update($validateData);

        return response()->json([
            'success' => true,
            'message' => 'Employee Successfully Updated',
            'data'    => $employee,
        ]);
    }

    /**
     * Menghapus data employee.
     */
    public function destroy(Employee $employee): JsonResponse
    {
        $employee->delete();

        return response()->json([
            'success' => true,
            'message' => 'Employee Successfully Deleted',
        ]);
    }
}
