import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorAlert } from "@/components/error-alert";
import { FieldError } from "@/components/field-error";
import { Toast } from "@/components/toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Loader2 } from 'lucide-react';
import axiosInstance from "@/axiosConfig";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  interface FormErrors {
  name?: string
  username?:string
  dateOfBirth?: string
  gender?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

useEffect(() => {
  loadUsers();
}, []);

const loadUsers = async () => {
  const result = await axiosInstance.get("http://localhost:8080/users");
  console.log(result.data);
};
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
    isVisible: boolean
  }>({
    message: "",
    type: "success",
    isVisible: false,
  })

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }


  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear field-specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
    
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters"
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13) {
        newErrors.dateOfBirth = "You must be at least 13 years old"
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})
    setIsLoading(true)


    try {
      // Validate form
      const formErrors = validateForm()
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        setIsLoading(false)
        showToast("Please fix the errors below", "error")
        return
      }

      // Simulate API call
      const response = await axios.post('http://localhost:8080/register', formData);
      console.log( response);


      if (response.status === 201) {
        showToast("Account created successfully! Welcome to Sportify!", "success")
        setTimeout(() => {
          navigate('/signin');
        }, 2000)
      } else {
        throw new Error("Email address is already registered")
      }
    } catch (error: any) {
      setErrors({ general: error.message || "Registration failed. Please try again." })
      showToast("Registration failed", "error")
    } finally {
      setIsLoading(false)
    }
      
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        {/* Background Image */}
      <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat  "
        style={{
          backgroundImage: `url('/Images/sports-tools.jpg')`,
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-sky-800/80 to-blue-700/90 z-10"></div>
       </div>

       {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-md">
       {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20">
              <img src="/Images/Logo 2.png" alt="Logo" className="w-10 h-10 object-contain" />
            </div> */}
            <h1 className="text-3xl font-bold text-white mb-2">Join Sportify</h1>
            <p className="text-white/80 text-lg">Create your account to get started</p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
            <CardHeader className="text-center space-y-1 pb-6">
              <p className="text-gray-600 px-10" >Please enter your details below</p>
            </CardHeader>
            
            <CardContent className="space-y-5 ">
            {/* General Error Alert */}
              {errors.general && (
                <ErrorAlert
                  error={errors.general}
                  onClose={() => setErrors(prev => ({ ...prev, general: undefined }))}
                />
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                      errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <FieldError error={errors.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </Label>
                  <Input
                    id="usern"
                    type="text"
                    placeholder="Enter a unique username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                      errors.username ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <FieldError error={errors.username} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                        errors.dateOfBirth ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                      }`}
                    />
                    <FieldError error={errors.dateOfBirth} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                      Gender
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                        errors.gender ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                      }`}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError error={errors.gender} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                      errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <FieldError error={errors.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <FieldError error={errors.password} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : ""
                    }`}
                  />
                  <FieldError error={errors.confirmPassword} />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", !!checked)}
                    className="mt-1 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor="terms" className="text-sm leading-5 text-gray-600">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-700 underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={!formData.agreeToTerms || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                
              </form>

              {/* <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-all duration-200 bg-transparent"
                disabled={isLoading}
              >
              <img src="/Images/Google_logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                Continue with Google
              </Button> */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/signin"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                  >
                    Sign in 
                  </Link>
                </p>
              </div>

            </CardContent>
          </Card>
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Sportify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
    </div>   
  );
};

export default Signup;