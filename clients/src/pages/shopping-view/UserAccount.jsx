import { useEffect, useState } from "react";
import { User, Package, CheckCircle, Truck, ShoppingCart, ChevronRight, MapPin, Plus, X, LogOut } from "lucide-react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("account");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    type: "Home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false
  });
  const [formErrors, setFormErrors] = useState({});

  const validateAddressForm = () => {
    const errors = {};
    if (!addressForm.street.trim()) errors.street = "Street address is required";
    if (!addressForm.city.trim()) errors.city = "City is required";
    if (!addressForm.state.trim()) errors.state = "State is required";
    if (!addressForm.zipCode.trim()) errors.zipCode = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(addressForm.zipCode)) {
      errors.zipCode = "Invalid ZIP code format";
    }
    return errors;
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddressForm();
    if (Object.keys(errors).length === 0) {
      // Here you would typically make an API call to save the address
      const newAddress = {
        id: `addr${Date.now()}`,
        ...addressForm
      };
      setUser(prev => ({
        ...prev,
        addresses: [...prev.addresses, newAddress]
      }));
      setShowAddressForm(false);
      setAddressForm({
        type: "Home",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false
      });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    // Dummy user data
    const dummyUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      createdAt: "2023-01-15T12:00:00Z",
      addresses: [
        {
          id: "addr1",
          type: "Home",
          street: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          isDefault: true
        },
        {
          id: "addr2",
          type: "Office",
          street: "456 Business Ave",
          city: "New York",
          state: "NY",
          zipCode: "10002",
          isDefault: false
        }
      ],
      orders: [
        { 
          id: "12345", 
          total: 99.99, 
          status: "Shipped",
          date: "2024-03-10T10:30:00Z",
          products: [
            {
              id: "p1",
              name: "Wireless Headphones",
              price: 49.99,
              quantity: 1,
              image: "https://placehold.co/80x80"
            },
            {
              id: "p2",
              name: "Smart Watch",
              price: 50.00,
              quantity: 1,
              image: "https://placehold.co/80x80"
            }
          ]
        },
        { 
          id: "67890", 
          total: 49.99, 
          status: "Processing",
          date: "2024-03-12T15:45:00Z",
          products: [
            {
              id: "p3",
              name: "Bluetooth Speaker",
              price: 49.99,
              quantity: 1,
              image: "https://placehold.co/80x80"
            }
          ]
        }
      ]
    };
    setUser(dummyUser);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getOrderSteps = (status) => {
    const allSteps = [
      { 
        label: "Order Placed", 
        icon: ShoppingCart,
        description: "Order confirmed and payment received"
      },
      { 
        label: "Processing", 
        icon: Package,
        description: "Preparing your items for shipment"
      },
      { 
        label: "Shipped", 
        icon: Truck,
        description: "Your order is on its way"
      },
      { 
        label: "Delivered", 
        icon: CheckCircle,
        description: "Package has been delivered"
      }
    ];

    let activeStepIndex;
    switch (status.toLowerCase()) {
      case 'pending':
        activeStepIndex = 0;
        break;
      case 'processing':
        activeStepIndex = 1;
        break;
      case 'shipped':
        activeStepIndex = 2;
        break;
      case 'delivered':
        activeStepIndex = 3;
        break;
      default:
        activeStepIndex = 0;
    }

    return allSteps.map((step, index) => ({
      ...step,
      isCompleted: index <= activeStepIndex,
      isActive: index === activeStepIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <nav className="mt-6 space-y-2">
                <button 
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activePage === "account" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActivePage("account")}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activePage === "addresses" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActivePage("addresses")}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Addresses</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activePage === "orders" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setActivePage("orders")}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    <span className="font-medium">Orders</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button 
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      // Handle logout logic here
                      console.log("Logging out...");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:flex-1">
            {activePage === "account" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-500">Member Since</label>
                      <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <button className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePage === "addresses" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Saved Addresses</h2>
                  <button 
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-200"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
                        <button 
                          onClick={() => {
                            setShowAddressForm(false);
                            setFormErrors({});
                            setAddressForm({
                              type: "Home",
                              street: "",
                              city: "",
                              state: "",
                              zipCode: "",
                              isDefault: false
                            });
                          }}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address Type
                          </label>
                          <select
                            value={addressForm.type}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, type: e.target.value }))}
                            className="block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-gray-900 sm:text-sm"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                            className={`block w-full rounded-lg border ${formErrors.street ? 'border-red-300' : 'border-gray-200'} px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-gray-900 sm:text-sm`}
                            placeholder="Enter street address"
                          />
                          {formErrors.street && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.street}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={addressForm.city}
                              onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                              className={`block w-full rounded-lg border ${formErrors.city ? 'border-red-300' : 'border-gray-200'} px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-gray-900 sm:text-sm`}
                              placeholder="Enter city"
                            />
                            {formErrors.city && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              value={addressForm.state}
                              onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                              className={`block w-full rounded-lg border ${formErrors.state ? 'border-red-300' : 'border-gray-200'} px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-gray-900 sm:text-sm`}
                              placeholder="Enter state"
                            />
                            {formErrors.state && (
                              <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            value={addressForm.zipCode}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, zipCode: e.target.value }))}
                            className={`block w-full rounded-lg border ${formErrors.zipCode ? 'border-red-300' : 'border-gray-200'} px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-gray-900 sm:text-sm`}
                            placeholder="Enter ZIP code"
                          />
                          {formErrors.zipCode && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.zipCode}</p>
                          )}
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                          />
                          <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddressForm(false);
                              setFormErrors({});
                              setAddressForm({
                                type: "Home",
                                street: "",
                                city: "",
                                state: "",
                                zipCode: "",
                                isDefault: false
                              });
                            }}
                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border border-gray-100 rounded-lg p-6 hover:border-gray-200 transition-colors duration-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">{address.type}</h3>
                            {address.isDefault && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                            Edit
                          </button>
                          {!address.isDefault && (
                            <>
                              <span className="text-gray-300">|</span>
                              <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                                Set as Default
                              </button>
                              <span className="text-gray-300">|</span>
                              <button className="text-red-500 hover:text-red-600 font-medium text-sm">
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePage === "orders" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h2>
                <div className="space-y-6">
                  {user.orders.length > 0 ? (
                    user.orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-lg p-6 hover:border-gray-200 transition-colors duration-200">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Order ID</p>
                            <p className="font-medium text-gray-900">#{order.id}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                            <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Product List */}
                        <div className="border-t border-gray-100 pt-6 mb-6">
                          <h3 className="text-sm font-medium text-gray-900 mb-4">Order Items</h3>
                          <div className="space-y-4">
                            {order.products.map((product) => (
                              <div key={product.id} className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                                    <span>${product.price.toFixed(2)}</span>
                                    <span>×</span>
                                    <span>{product.quantity}</span>
                                    <span>=</span>
                                    <span className="font-medium text-gray-900">
                                      ${(product.price * product.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="relative">
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 -translate-y-1/2"></div>
                          <div className="relative flex justify-between">
                            {getOrderSteps(order.status).map((step, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                  step.isCompleted
                                    ? "bg-green-600 text-white"
                                    : step.isActive
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-400"
                                }`}>
                                  <step.icon className="w-5 h-5" />
                                </div>
                                <div className="mt-2 text-center">
                                  <p className={`text-sm font-medium ${
                                    step.isCompleted
                                      ? "text-green-600"
                                      : step.isActive
                                      ? "text-blue-600"
                                      : "text-gray-400"
                                  }`}>
                                    {step.label}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-500">When you make your first order, it will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;