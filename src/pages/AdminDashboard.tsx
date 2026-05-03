import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../store';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Edit2,
  Trash2,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  const { view, setView, isAdminAuthenticated, setAdminAuthenticated, storeProducts, addStoreProduct, updateStoreProduct, removeStoreProduct } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeTab = view.adminTab || 'dashboard';

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setView({ name: 'admin-login' });
    }
  }, [isAdminAuthenticated, setView]);

  if (!isAdminAuthenticated) return null;

  const navigateTo = (tab: 'dashboard' | 'products' | 'orders' | 'users') => {
    setView({ name: 'admin-dashboard', adminTab: tab });
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setView({ name: 'home' });
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="font-serif text-xl font-bold">Admin Portal</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-10
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-200 hidden md:block">
          <h1 className="font-serif text-2xl font-bold tracking-widest text-center">Spotify<span className="text-[#ff3f6c]">.</span></h1>
          <p className="text-xs text-center text-gray-500 mt-1 uppercase tracking-widest font-bold">Admin Panel</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as any)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-black' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <Icon size={18} className={`mr-3 ${isActive ? 'text-[#ff3f6c]' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'products' && <ProductsTab storeProducts={storeProducts} addStoreProduct={addStoreProduct} updateStoreProduct={updateStoreProduct} removeStoreProduct={removeStoreProduct} />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'users' && <UsersTab />}
        </motion.div>
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// --- Dashboard Component ---
function DashboardTab() {
  const { storeProducts } = useAppStore();
  const stats = [
    { label: 'Total Products', value: storeProducts.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Orders', value: '1,248', icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Total Users', value: '4,521', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Revenue', value: '$124.5k', icon: LayoutDashboard, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 flex items-center justify-center text-gray-400">
        <p>Chart Placeholder</p>
      </div>
    </div>
  );
}

// --- Products Component ---
function ProductsTab({ storeProducts, addStoreProduct, updateStoreProduct, removeStoreProduct }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = storeProducts.filter((p: any) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.designer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: 'new_' + Date.now(),
      name: '',
      designer: '',
      price: 0,
      image: '',
      images: [],
      category: '',
      department: 'Women',
      description: ''
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    // Auto populate images array if empty but image provided
    if (editingProduct.images.length === 0 && editingProduct.image) {
      editingProduct.images = [editingProduct.image];
    }
    
    if (storeProducts.some((p: any) => p.id === editingProduct.id)) {
      updateStoreProduct(editingProduct.id, editingProduct);
    } else {
      addStoreProduct(editingProduct);
    }
    setIsEditing(false);
  };

  if (isEditing && editingProduct) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{storeProducts.some((p: any) => p.id === editingProduct.id) ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input required type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand / Designer</label>
              <input required type="text" value={editingProduct.designer} onChange={(e) => setEditingProduct({...editingProduct, designer: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input required type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select value={editingProduct.department} onChange={(e) => setEditingProduct({...editingProduct, department: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black bg-white">
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input required type="text" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
              <input required type="url" value={editingProduct.image} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full border border-gray-200 rounded p-2 outline-none focus:border-black" />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors">
              Save Product
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <button onClick={handleAddNew} className="flex items-center px-4 py-2 bg-[#ff3f6c] text-white rounded-lg text-sm font-medium hover:bg-[#e0355f] transition-colors">
          <Plus size={16} className="mr-2" /> Add Product
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
           <div className="relative w-full max-w-sm">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search products..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md outline-none focus:border-black transition-colors"
             />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Dept / Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.slice(0, 20).map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 flex items-center">
                    <img src={product.image} alt="" className="w-10 h-10 rounded-sm object-cover mr-3 bg-gray-200" />
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">{product.designer}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 font-medium">${product.price}</td>
                  <td className="px-6 py-3">
                    <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {product.department} &bull; {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 p-1 mr-2 bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => { if(confirm('Are you sure?')) removeStoreProduct(product.id) }} className="text-red-600 hover:text-red-900 p-1 bg-red-50 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length > 20 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 text-sm">
                       Showing top 20 of {filteredProducts.length} matching products. Use search to find specific items.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Orders Component (Mock) ---
function OrdersTab() {
  const orders = [
    { id: 'ORD-7652', customer: 'Eleanor Vance', date: 'Oct 24, 2024', total: '$850.00', status: 'Delivered' },
    { id: 'ORD-7653', customer: 'James Holden', date: 'Oct 25, 2024', total: '$1,240.00', status: 'Shipped' },
    { id: 'ORD-7654', customer: 'Amos Burton', date: 'Oct 26, 2024', total: '$345.50', status: 'Pending' },
    { id: 'ORD-7655', customer: 'Naomi Nagata', date: 'Oct 26, 2024', total: '$2,100.00', status: 'Pending' },
    { id: 'ORD-7656', customer: 'Chrisjen Avasarala', date: 'Oct 27, 2024', total: '$7,800.00', status: 'Pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select className="text-xs border-gray-200 rounded bg-white" defaultValue={order.status}>
                       <option value="Pending">Pending</option>
                       <option value="Shipped">Shipped</option>
                       <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Users Component (Mock) ---
function UsersTab() {
  const users = [
    { id: 1, name: 'Eleanor Vance', email: 'eleanor@example.com', role: 'Customer', joined: 'Mar 12, 2024' },
    { id: 2, name: 'James Holden', email: 'j.holden@rocinante.com', role: 'Customer', joined: 'Apr 05, 2024' },
    { id: 3, name: 'Admin Spotify', email: 'admin@spotify.com', role: 'Admin', joined: 'Jan 01, 2024' },
    { id: 4, name: 'Naomi Nagata', email: 'naomi@example.com', role: 'Customer', joined: 'May 22, 2024' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center">
                     <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold mr-3">
                        {user.name.charAt(0)}
                     </div>
                     {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}
