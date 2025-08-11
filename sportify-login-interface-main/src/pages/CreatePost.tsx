import type React from "react"

import { useState } from "react"
import { Upload, X, Camera, ArrowLeft, Check, Sparkles, Smile } from "lucide-react"
import { Link } from "react-router-dom";
import axios from 'axios';

const POPULAR_EMOJIS = [
  "🏏",
  "🎯",
  "🔥",
  "⚡",
  "🏆",
  "🎉",
  "💪",
  "👏",
  "🚀",
  "⭐",
  "💯",
  "🎊",
  "🙌",
  "👑",
  "🏅",
  "🎈",
  "❤️",
  "😍",
  "😎",
  "🤩",
  "😊",
  "🥳",
  "💥",
  "✨",
]

export default function CreatePostPage() {
  const [caption, setCaption] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

 const handleSubmitPost = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior

  // --- IMPORTANT: Replace these with your actual state variables ---
  const selectedImage: File | null = null; // Placeholder: Get from your actual state
  const caption: string = "My awesome post!"; // Placeholder: Get from your actual state
  const userId: number = 1; // Placeholder: Get from your actual user context/state
  // --- END Placeholder ---

  // if (!selectedImage || !caption) {
  //   console.error('Please select an image and enter a caption.');
  //   // You might want to show a user-friendly message here (e.g., using a modal)
  //   return;
  // }

  // Create a FormData object
  const formData = new FormData();

  // Append the image file. 'file' is the name the backend will expect for the image part.
  formData.append('file', selectedImage);

  // Append the other post data (caption, user ID) as a JSON string.
  // 'post' is the name the backend will expect for the JSON part.
  const postData = {
    caption: caption,
    user: {
      id: userId // Send only the user ID to link the post to an existing user
    }
  };
  formData.append('post', JSON.stringify(postData));

  try {
    // Use axios.post to send the FormData
    const response = await axios.post('http://localhost:8080/post', formData, {
      headers: {
        // Axios automatically sets 'Content-Type: multipart/form-data' when sending FormData,
        // so you typically don't need to specify it here.
        // 'Content-Type': 'multipart/form-data'
      },
    });

    console.log('Post created successfully:', response.data);
    // You can add success feedback to the user here (e.g., a success message, clear form)
    // setCaption('');
    // setSelectedImage(null);
    // setImagePreview(null);
  } catch (error) {
    // Axios provides error details directly in the error object
    if (axios.isAxiosError(error)) {
      console.error('Error creating post:', error.response?.data || error.message);
      // Show error feedback to the user, potentially using error.response.data for backend messages
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};

  const removeImage = () => {
    setImagePreview(null)
    setSelectedImage(null)
  }


  const addEmoji = (emoji: string) => {
    setCaption((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md w-full border border-white/20 animate-in fade-in-0 zoom-in-95 duration-500">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Post Created Successfully!
          </h2>
          <p className="text-gray-600 text-lg">Your cricket moment has been shared with the community.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/Home">
            <button
              className="p-3 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Create New Post
              </h1>
              <p className="text-gray-600 mt-1">Share your cricket journey with the world</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-10">
            <form onSubmit={handleSubmitPost} className="space-y-8">
              {/* Image Upload - Now at the top */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-800 uppercase tracking-wide">Upload Image</label>
                {!imagePreview ? (
                  <div className="relative group">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-80 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group-hover:border-blue-400 group-hover:scale-[1.02]"
                    >
                      <div className="flex flex-col items-center justify-center pt-8 pb-8">
                        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200">
                          <Upload className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-700 mb-3">Drop your cricket moment here</p>
                        <p className="text-lg text-gray-500 mb-2">or click to browse</p>
                        <p className="text-sm text-gray-400">PNG, JPG, or GIF up to 10MB</p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-lg hover:scale-110"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Caption with Emoji Picker */}
              <div className="space-y-3">
                <label htmlFor="caption" className="block text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Caption
                </label>
                <div className="relative">
                  <textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's your cricket story today? Share your achievements, match highlights, or training moments..."
                    className="w-full px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 resize-none text-lg placeholder-gray-400 pr-16"
                    rows={5}
                    required
                  />
                  <div className="absolute bottom-4 right-16 text-sm text-gray-400">{caption.length}/500</div>

                  {/* Emoji Button */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                      <div className="grid grid-cols-8 gap-2 max-w-xs">
                        {POPULAR_EMOJIS.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => addEmoji(emoji)}
                            className="w-10 h-10 text-xl hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center hover:scale-110 transform duration-150"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center">Click to add emoji</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!caption.trim() || !imagePreview || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Post...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-6 w-6" />
                      <span>Share Your Cricket Moment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced Tips Section */}
        <div className="mt-10 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pro Tips for Amazing Posts</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Use high-quality, well-lit images that capture the action</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Write engaging captions that tell your unique story</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Add emojis to make your posts more expressive 🏏✨</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">Connect and inspire fellow cricket enthusiasts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close emoji picker */}
      {showEmojiPicker && <div className="fixed inset-0 z-10" onClick={() => setShowEmojiPicker(false)} />}
    </div>
  )
}