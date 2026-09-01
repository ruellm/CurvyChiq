import Link from 'next/link';
import { deleteProduct } from '@/app/actions';
import { getProducts } from '@/db/queries';
import Image from 'next/image';

export default async function AdminDashboard() {
    const products = await getProducts();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Inventory Management</h2>
                <Link
                    href="/admin/products/create"
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    + Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 border-b font-semibold text-gray-600">Image</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Name</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Category</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Price</th>
                            <th className="p-4 border-b font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 border-b last:border-0">
                                <td className="p-4">
                                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                                        {product.image && (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                                <td className="p-4 text-gray-600">{product.category}</td>
                                <td className="p-4 text-gray-800">₱{product.price.toLocaleString()}</td>
                                <td className="p-4 flex gap-4 mt-2">
                                    <Link href={`/admin/products/${product.id}/edit`} className="text-blue-500 hover:text-blue-700 font-medium">
                                        Edit
                                    </Link>
                                    <form action={async () => {
                                        'use server';
                                        await deleteProduct(product.id);
                                    }}>
                                        <button className="text-red-500 hover:text-red-700 font-medium">
                                            Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    No products found. Add one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
