import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import sportsHero from '@/assets/sports-hero.jpg';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #000 2px, transparent 0), radial-gradient(circle at 75px 75px, #000 2px, transparent 0)`,
              
            }}
          ></div>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo and Branding */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20">
                  <img src="/Images/Logo 2.png" alt="Logo" className="w-10 h-20 object-contain" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Sportify
              </h1>
              </div>
              
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-600 text-lg">Sign in to your sports management account</p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-2xl shadow-gray-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardDescription className="text-gray-600">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 h-12 bg-blue-50/30 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                  </span>
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <Button
                variant="outline"
                size="lg"
                className="w-full h-12 border-gray-200 hover:bg-gray-400 transition-all duration-200 bg-transparent"
              >
              <img src="/Images/Google_logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                Continue with Google
              </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>© 2024 Sportify. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Sports Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-sky-800/80 to-blue-700/90 z-10"></div>
        <img
          src="/Images/american-football.jpg?height=800&width=600"
          alt="Sports athletes in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
          <div className="text-center text-white space-y-8 max-w-lg">
            <div className="space-y-4">
              <h3 className="text-5xl font-bold leading-tight">
                Elevate Your
                <span className="block bg-gradient-to-r from-sky-200 to-blue-200 bg-clip-text text-transparent">
                  Sports Journey
                </span>
              </h3>
              <p className="text-xl text-sky-100 leading-relaxed">
                The complete platform for teams, athletes, and sports organizations to achieve excellence
              </p>
            </div>

            

            <div className="pt-4">
              <div className="flex items-center justify-center space-x-1 text-sky-200">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Trusted by professionals worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;