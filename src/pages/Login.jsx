import React from 'react'
import GoogleSignIn from "../components/GoogleAuth";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950/40 to-slate-950 flex items-center justify-center lg:px-4 px-3 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Floating Cinema Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-amber-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 right-16 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-32 right-12 w-12 h-12 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-amber-200 text-white bg-clip-text text-transparent mb-3">
              Welcome to
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent">
                MovieMood
              </span>
              <span className="text-2xl animate-bounce">🎬</span>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Discover your perfect movie experience with personalized recommendations and seamless booking
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            <span className="text-white text-sm font-medium">Sign in to continue</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          </div>

          {/* Google Sign In */}
          <div className="space-y-6">
            <GoogleSignIn />
            
            {/* Additional Info */}
            <div className="text-center">
              <p className="text-xs text-white">
                By signing in, you agree to our{' '}
                <span className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-sm">
            New to cinema booking?{' '}
            <span className="text-amber-400 hover:text-amber-300 cursor-pointer transition-colors font-medium">
              Learn more
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default Login