import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { employeesUpdate, employeesIndex } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Save, ArrowLeft, Loader2, RefreshCcw } from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee Management',
        href: employeesIndex().url,
    },
    {
        title: 'Edit Employee',
        href: '#',
    },
];

interface Department {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
    department_id: number | string;
}

export default function Edit({ employee, departments }: { employee: Employee; departments: Department[] }) {
    // Inisialisasi form dengan data employee yang sudah ada
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '',
        position: employee.position || '',
        salary: employee.salary || '',
        department_id: employee.department_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(employeesUpdate(employee.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Employee - ${employee.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Employee</h1>
                    <Link
                        href={employeesIndex().url}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeft className="size-4" />
                        Back to List
                    </Link>
                </div>

                <div className="max-w-2xl overflow-hidden rounded-xl border border-sidebar-border/70 bg-white shadow-sm dark:bg-neutral-900">
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="grid gap-6">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full rounded-md border py-2 px-3 text-sm focus:outline-none focus:ring-2 dark:bg-neutral-800 ${errors.name
                                        ? 'border-red-500 focus:ring-red-200 dark:border-red-800'
                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-neutral-700'
                                        }`}
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

                            {/* Position Input */}
                            <div>
                                <label htmlFor="position" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Position
                                </label>
                                <input
                                    id="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    className={`w-full rounded-md border py-2 px-3 text-sm focus:outline-none focus:ring-2 dark:bg-neutral-800 ${errors.position
                                        ? 'border-red-500 focus:ring-red-200 dark:border-red-800'
                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-neutral-700'
                                        }`}
                                />
                                {errors.position && <p className="mt-1 text-xs text-red-500">{errors.position}</p>}
                            </div>

                            {/* Salary Input */}
                            <div>
                                <label htmlFor="salary" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Salary (IDR)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">Rp</span>
                                    <input
                                        id="salary"
                                        type="number"
                                        value={data.salary}
                                        onChange={(e) => setData('salary', e.target.value)}
                                        className={`w-full rounded-md border py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 dark:bg-neutral-800 ${errors.salary
                                            ? 'border-red-500 focus:ring-red-200 dark:border-red-800'
                                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-neutral-700'
                                            }`}
                                    />
                                </div>
                                {errors.salary && <p className="mt-1 text-xs text-red-500">{errors.salary}</p>}
                            </div>

                            {/* Department Input */}
                            <div>
                                <label htmlFor="department_id" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Department
                                </label>
                                <select
                                    id="department_id"
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className={`w-full rounded-md border py-2 px-3 text-sm focus:outline-none focus:ring-2 dark:bg-neutral-800 ${errors.department_id
                                        ? 'border-red-500 focus:ring-red-200 dark:border-red-800'
                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-neutral-700'
                                        }`}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.department_id && <p className="mt-1 text-xs text-red-500">{errors.department_id}</p>}
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-6 dark:border-neutral-800">
                            <Link
                                href={employeesIndex().url}
                                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-neutral-800"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition"
                            >
                                {processing ? (
                                    <Loader2 className="size-4 animate-spin" />
                                ) : (
                                    <RefreshCcw className="size-4" />
                                )}
                                Update Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
