<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'name' => 'Abdul Haris',
                'position' => 'Manager',
                'salary' => 50000,
                'department_id' => 1
            ],
            [
                'name' => 'Anggun Purwaningsih',
                'position' => 'Accountant',
                'salary' => 40000,
                'department_id' => 2
            ],
            [
                'name' => 'John Doe',
                'position' => 'Software Engineer',
                'salary' => 30000,
                'department_id' => 3
            ]
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}
