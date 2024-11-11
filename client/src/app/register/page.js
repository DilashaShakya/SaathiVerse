// import React, { useState } from 'react';

// function App() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const validateForm = () => {
//     const newErrors = {
//       username: '',
//       email: '',
//       password: '',
//     };

//     if (formData.username.length < 3) {
//       newErrors.username = 'Username must be at least 3 characters';
//     }

//     if (!formData.email.includes('@')) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }

//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error !== '');
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Join Buzzie</h1>
//           <p className="text-gray-600 mt-2">Create your account today</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.username ? 'border-red-500' : 'border-gray-300'
//               } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData({ ...formData, username: e.target.value })
//               }
//               placeholder="Enter your username"
//             />
//             {errors.username && (
//               <p className="mt-1 text-sm text-red-500">{errors.username}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.email ? 'border-red-500' : 'border-gray-300'
//               } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className={`w-full px-4 py-2 rounded-lg border ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               placeholder="Create a password"
//             />
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="text-center mt-6 text-sm text-gray-600">
//           Already have an account?{' '}
//           <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
//             Sign in
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;