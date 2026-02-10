<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search', '');
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 2);

        $query = Employee::with('department');

        // Apply search filter
        if (!empty($search)) {
            $query->where('name', 'LIKE', "%{$search}%")->orWhere('position', 'LIKE', "%{$search}%");
        }

        // Get paginated results
        $employees = $query->orderBy('id', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('employee/index', [
            'employees' => $employees,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
        $departments = Departement::orderBy('name')->get();

        return Inertia::render('employee/create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'position' => 'required|string|max:50',
            'salary' => 'required|numeric|min:0.01',
            'department_id' => 'nullable|integer|exists:departments,id',
        ], [
            'name.required' => 'Name is required and cannot be empty',
            'name.max' => 'Name cannot exceed 100 characters',
            'position.required' => 'Position is required and cannot be empty',
            'position.max' => 'Position cannot exceed 50 characters',
            'salary.required' => 'Salary is required',
            'salary.numeric' => 'Salary must be a valid number',
            'salary.min' => 'Salary must be greater than 0',
            'department_id.exists' => 'The selected department does not exist',
        ]);

        Employee::create($validated);

        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): Response
    {
        $departments = Departement::orderBy('name')->get();

        return Inertia::render('employee/edit', [
            'employee' => $employee->load('department'),
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'position' => 'required|string|max:50',
            'salary' => 'required|numeric|min:0.01',
            'department_id' => 'nullable|integer|exists:departments,id',
        ], [
            'name.required' => 'Name is required and cannot be empty',
            'name.max' => 'Name cannot exceed 100 characters',
            'position.required' => 'Position is required and cannot be empty',
            'position.max' => 'Position cannot exceed 50 characters',
            'salary.required' => 'Salary is required',
            'salary.numeric' => 'Salary must be a valid number',
            'salary.min' => 'Salary must be greater than 0',
            'department_id.exists' => 'The selected department does not exist',
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
}
