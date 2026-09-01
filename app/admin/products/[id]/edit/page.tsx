import { getProductById, updateProduct } from '@/app/actions';
import { redirect } from 'next/navigation';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center bg-white shadow rounded">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
                <p className="text-gray-600">The product you are trying to edit does not exist.</p>
            </div>
        );
    }

    async function edit(formData: FormData) {
        'use server';
        await updateProduct(id, formData);
        redirect('/admin');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h2>

            <form action={edit} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={product.name}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price (₱)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            defaultValue={product.price}
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            required
                            defaultValue={product.category}
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                            <option value="New Arrival">New Arrival</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        defaultValue={product.image}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        defaultValue={product.description || ''}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
