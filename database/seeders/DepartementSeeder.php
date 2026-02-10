<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departements = [
            [
                'name' => 'Manager',
            ],
            [
                'name' => 'Accountant',
            ],
            [
                'name' => 'Software Engineer',
            ]
        ];
    }
}
