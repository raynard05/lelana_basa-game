'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import './login.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      // Detect if keyboard is open by checking if viewport height decreased
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      
      if (viewportHeight < windowHeight * 0.75) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    const handleFocus = () => {
      setIsKeyboardOpen(true);
      // Scroll the focused input into view
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    };

    const handleBlur = () => {
      setTimeout(() => {
        setIsKeyboardOpen(false);
      }, 100);
    };

    // Listen to visual viewport resize (better for mobile keyboard detection)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Add focus/blur listeners to all inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { username, password, rememberMe });
    
    // Redirect to menu page after successful login
    router.push('/menu');
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <div className="login-background">
        <Image
          src="/login_assets/background.png"
          alt="Background"
          fill
          priority
          className="background-image"
        />
      </div>

      {/* Content Overlay */}
      <div className={`login-content ${isKeyboardOpen ? 'keyboard-open' : ''}`}>
        {/* Lelana Basa Logo */}
        <div className="logo-container">
          <Image
            src="/login_assets/lelana_basa.png"
            alt="Lelana Basa"
            width={3000}
            height={200}
            className="logo-image"
          />
        </div>

        {/* Sugeng Rawuh Banner */}
        <div className="sugeng-rawuh-banner">
          <Image
            src="/login_assets/sugeng_rawuh.png"
            alt="Sugeng Rawuh"
            width={5000}
            height={80}
            className="sugeng-rawuh-image"
          />
        </div>

        {/* Login Form */}
        <div className="login-form-container" ref={formRef}>
          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Input */}
            <div className="input-group">
              <div className="input-wrapper-shadcn">
                <User className="input-icon-shadcn" size={20} />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-shadcn"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <div className="input-wrapper-shadcn">
                <Lock className="input-icon-shadcn" size={20} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-shadcn"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-shadcn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <Label className="remember-me">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-label">Ingat Saya</span>
              </Label>
              <a href="#" className="forgot-password">
                Lupa Kata Sandi?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2">
              Wiwiti
            </Button>

            {/* Register Link */}
            <div className="register-link">
              <span className="register-text">Belum punya akun? </span>
              <a href="/register" className="register-link-text">
                Daftar disini
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
