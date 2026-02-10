import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { employeesCreate, employeesEdit, employeesIndex } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Pencil, Trash2, UserPlus, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employee Management', href: employeesIndex().url },
];

export default function Index({ employees, filters }: { employees: any; filters: any }) {
    const [search, setSearch] = useState(filters.search || '');

    // Fungsi Search (Debounce atau Trigger on Enter/Button)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(employeesIndex().url, { search }, { preserveState: true });
    };

    const handleDelete = (employee: any) => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
            router.delete(route('employeesDestroy', employee.id));
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee List" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Employees</h1>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2 md:max-w-md">
                        <form onSubmit={handleSearch} className="relative flex w-full">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search employee name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-800 dark:border-neutral-700"
                            />
                        </form>
                    </div>

                    <Link
                        href={employeesCreate().url}
                        className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        <UserPlus className="size-4" />
                        Add Employee
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white shadow-sm dark:bg-neutral-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
                            <thead className="bg-gray-50 dark:bg-neutral-800/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Position</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Salary</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Joined At</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                                {employees.data.length > 0 ? (
                                    employees.data.map((employee: any) => (
                                        <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/30">
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{employee.id}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{employee.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{employee.position}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{formatCurrency(employee.salary)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(employee.created_at)}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium">
                                                <div className="flex justify-center gap-3">
                                                    <Link href={employeesEdit(employee.id).url} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(employee)} className="text-red-600 hover:text-red-900 dark:text-red-400">
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-500">No data found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-800 px-6 py-4 bg-gray-50 dark:bg-neutral-800/20">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {employees.from} to {employees.to} of {employees.total} results
                        </div>
                        <div className="flex gap-1">
                            {employees.links.map((link: any, i: number) => (
                                <Link
                                    key={i}
                                    href={link.url || ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 text-sm rounded-md border ${link.active
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-300'
                                        } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                    preserveState
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
