'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, LogOut, Edit2, X, Eye, EyeOff } from 'lucide-react';
import { getCurrentUser, updateProfile, updatePassword } from '@/app/actions/auth';
import './profil.css';

export default function ProfilPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    jenengJangkep: '',
    username: '',
    klas: '',
    nomerAbsen: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingField, setEditingField] = useState<{key: string, label: string, value: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setFormData({
            jenengJangkep: user.nama_lengkap || '',
            username: user.username || '',
            klas: user.kelas || '',
            nomerAbsen: user.nomor_absen?.toString() || ''
          });
        }
      } catch (err) {
        console.error('Error fetching user', err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = (key: string, label: string) => {
    setEditingField({ key, label, value: formData[key as keyof typeof formData] });
  };

  const handleModalSave = async () => {
    if (editingField) {
      if (editingField.key === 'kataSandi') {
        if (!currentUser) return;
        setIsLoading(true);
        try {
          const result = await updatePassword(currentUser.id, editingField.value);
          if (result.success) {
            setMessage({ type: 'success', text: 'Kata sandi kasil dianyari!' });
          } else {
            setMessage({ type: 'error', text: result.error || 'Gagal nganyari kata sandi' });
          }
        } catch (err) {
          setMessage({ type: 'error', text: 'Kesalahan sistem' });
        } finally {
          setIsLoading(false);
          setEditingField(null);
          setShowPassword(false);
        }
      } else {
        setFormData({ ...formData, [editingField.key]: editingField.value });
        setEditingField(null);
        setShowPassword(false);
      }
    }
  };

  const handleBack = () => {
    router.push('/menu');
  };

  const handleSave = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await updateProfile(currentUser.id, {
        namaLengkap: formData.jenengJangkep,
        username: formData.username,
        kelas: formData.klas,
        absen: formData.nomerAbsen
      });
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Profil kasil dianyari!' });
        setCurrentUser(result.user);
      } else {
        setMessage({ type: 'error', text: result.error || 'Gagal nganyari profil' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Kesalahan sistem' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profil-container">
      {/* Background Images */}
      {/* Mobile Background */}
      <div className="profil-bg-mobile">
        <Image 
          src="/login_assets/background.png" 
          alt="Mobile Background" 
          fill 
          className="profil-bg-img"
          priority
        />
      </div>
      {/* Desktop Background */}
      <div className="profil-bg-desktop">
        <Image 
          src="/login_assets/login_regis.webp" 
          alt="Desktop Background" 
          fill 
          className="profil-bg-img"
          priority
        />
      </div>

      {/* Main Card Container */}
      <div className="profil-card">
        
        {/* Sidebar */}
        <div className="profil-sidebar">
          <div className="profil-sidebar-header">
            <h2 className="profil-sidebar-title">{formData.jenengJangkep || 'User Name'}</h2>
          </div>
          
          <div className="profil-sidebar-content">
            <p className="profil-sidebar-label">Akunmu</p>
            
            <button className="profil-btn-active">
              <User className="w-5 h-5" />
              <span>Profil</span>
            </button>
            
            <button 
              onClick={handleBack}
              className="profil-btn-inactive"
            >
              <LogOut className="w-5 h-5 rotate-180" />
              <span>Mbalik ing Menu</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="profil-main">
          <div className="profil-main-header">
            <h1 className="profil-main-title">Akun</h1>
          </div>
          
          {message.text && (
            <div className={`mx-6 md:mx-8 mt-4 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
          
          <div className="profil-main-content">
            <div className="space-y-6">
              {/* Form Grid */}
              <div className="profil-form-grid">
                
                {/* Jeneng Jangkep */}
                <div>
                  <label className="profil-form-label">Jeneng Jangkep</label>
                  <div className="profil-form-input-container">
                    <input 
                      type="text" 
                      value={formData.jenengJangkep}
                      readOnly
                      className="profil-input bg-gray-50 text-gray-800 font-medium cursor-not-allowed"
                    />
                    <button 
                      onClick={() => handleEditClick('jenengJangkep', 'Jeneng Jangkep')}
                      className="profil-edit-btn"
                    >
                      <Edit2 className="w-4 h-4 text-[#78350f]" />
                    </button>
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="profil-form-label">Username</label>
                  <div className="profil-form-input-container">
                    <input 
                      type="text" 
                      value={formData.username}
                      readOnly
                      className="profil-input bg-gray-50 text-gray-800 font-medium cursor-not-allowed"
                    />
                    <button 
                      onClick={() => handleEditClick('username', 'Username')}
                      className="profil-edit-btn"
                    >
                      <Edit2 className="w-4 h-4 text-[#78350f]" />
                    </button>
                  </div>
                </div>

                {/* Klas */}
                <div>
                  <label className="profil-form-label">Klas</label>
                  <div className="profil-form-input-container">
                    <input 
                      type="text" 
                      value={formData.klas}
                      readOnly
                      className="profil-input bg-gray-50 text-gray-800 font-medium cursor-not-allowed"
                    />
                    <button 
                      onClick={() => handleEditClick('klas', 'Klas')}
                      className="profil-edit-btn"
                    >
                      <Edit2 className="w-4 h-4 text-[#78350f]" />
                    </button>
                  </div>
                </div>

                {/* Nomer Absen */}
                <div>
                  <label className="profil-form-label">Nomer Absen</label>
                  <div className="profil-form-input-container">
                    <input 
                      type="text" 
                      value={formData.nomerAbsen}
                      readOnly
                      className="profil-input bg-gray-50 text-gray-800 font-medium cursor-not-allowed"
                    />
                    <button 
                      onClick={() => handleEditClick('nomerAbsen', 'Nomer Absen')}
                      className="profil-edit-btn"
                    >
                      <Edit2 className="w-4 h-4 text-[#78350f]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="profil-password-section">
              <div className="profil-password-container">
                <div>
                  <h3 className="profil-password-title">Kata Sandi</h3>
                  <p className="profil-password-desc">
                    Mlebu nganggo tembung sandhi tinimbang nggunakake kode mlebu sementara.
                  </p>
                </div>
                <button 
                  onClick={() => { setEditingField({ key: 'kataSandi', label: 'Kata Sandi Anyar', value: '' }); setShowPassword(false); }}
                  className="profil-btn-outline"
                >
                  Ubah Sandi
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="profil-actions">
              <button 
                onClick={handleBack}
                className="profil-btn-cancel"
              >
                Batal
              </button>
              <button 
                onClick={handleSave}
                className="profil-btn-save"
                disabled={isLoading}
              >
                {isLoading ? 'Nyimpen...' : 'Simpen'}
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingField && (
        <div className="profil-modal-overlay">
          <div className="profil-modal-content popup-card">
            <button 
              onClick={() => { setEditingField(null); setShowPassword(false); }}
              className="profil-modal-close-btn"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            <h2 className="profil-modal-title">{editingField.label}</h2>
            
            <div className="relative w-full">
              <input 
                type={editingField.key === 'kataSandi' ? (showPassword ? 'text' : 'password') : 'text'}
                value={editingField.value}
                onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                className="profil-modal-input"
                autoFocus
              />
              {editingField.key === 'kataSandi' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
            {editingField.key === 'kataSandi' && (
              <p className="text-xs text-gray-500 text-center -mt-2">Minimal 3 karakter</p>
            )}

            <div className="profil-modal-actions">
              <button 
                onClick={() => { setEditingField(null); setShowPassword(false); }}
                className="profil-modal-btn-cancel"
              >
                Batal
              </button>
              <button 
                onClick={handleModalSave}
                className="profil-modal-btn-save"
              >
                Simpen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
