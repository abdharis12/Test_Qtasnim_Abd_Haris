import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { employeesCreate, employeesDestroy, employeesEdit, employeesIndex } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Pencil, Trash2, UserPlus, Search, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import DeleteAction from '@/components/delete-action';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employee Management', href: employeesIndex().url },
];

interface Employee {
    id: number;
    name: string;
    position: string;
    salary: number;
    created_at: string;
    department?: {
        name: string;
    };
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    employees: {
        data: Employee[];
        from: number;
        to: number;
        total: number;
        links: PaginationLinks[];
    };
    filters: {
        search: string;
    };
}

export default function Index({ employees, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { id: 'flash-success' });
        }
        if (flash?.error) {
            toast.error(flash.error, { id: 'flash-error' });
        }
    }, [flash]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(employeesIndex().url, { search }, {
            preserveState: true,
            replace: true
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee List" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employees</h1>
                            <p className="text-sm text-gray-500">Manage your workforce data</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full sm:w-64 rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-neutral-800 dark:border-neutral-700"
                                />
                            </form>

                            <Link
                                href={employeesCreate().url}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                            >
                                <UserPlus className="size-4" />
                                Add Employee
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-white shadow-sm dark:bg-neutral-900">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-800">
                                <thead className="bg-gray-50 dark:bg-neutral-800/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Salary</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Joined At</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                                    {employees.data.length > 0 ? (
                                        employees.data.map((employee: any) => (
                                            <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/30">
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{employees.data.indexOf(employee) + 1}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{employee.id}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{employee.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{employee.position}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                                                        {employee.department?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300">{formatCurrency(employee.salary)}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(employee.created_at)}</td>
                                                <td className="px-6 py-4 text-center text-sm font-medium">
                                                    <div className="flex justify-center gap-3">
                                                        <Button className='bg-amber-400 hover:bg-amber-500 px-3'>
                                                            <Link href={employeesEdit(employee.id).url}>
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>
                                                        <DeleteAction
                                                            url={employeesDestroy(employee.id).url}
                                                            id={employee.id}
                                                            entityName={employee.name}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">No data found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-neutral-800 px-6 py-4 bg-gray-50 dark:bg-neutral-800/20">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {employees.from || 0} to {employees.to || 0} of {employees.total} results
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
                </Card>
            </div>
        </AppLayout>
    );
}
