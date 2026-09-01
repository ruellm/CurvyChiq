import { addProduct } from '@/app/actions';
import { redirect } from 'next/navigation';

export default function CreateProductPage() {
    async function create(formData: FormData) {
        'use server';
        await addProduct(formData);
        redirect('/admin');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h2>

            <form action={create} className="bg-white p-8 rounded-lg shadow space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="e.g. Silk Blouse"
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
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            placeholder="e.g. 1500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                        <select
                            id="category"
                            name="category"
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        >
                            <option value="New Arrival">New Arrival</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
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
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="/linen-blend-dress.png"
                        defaultValue="/linen-blend-dress.png"
                    />
                    <p className="text-sm text-gray-500 mt-1">For now, use local paths like /linen-blend-dress.png</p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Product details..."
                    ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
