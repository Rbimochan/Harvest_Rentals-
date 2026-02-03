
import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  FileText, 
  Users, 
  Camera, 
  Plus, 
  Trash2, 
  ChevronLeft,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface RegisterResidentProps {
  onCancel: () => void;
  // Fix: onSuccess should accept the newly created resident data to match App.tsx usage
  onSuccess: (resident: any) => void;
}

const RegisterResident: React.FC<RegisterResidentProps> = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    docType: 'Citizenship',
    docNumber: '',
    subTenantCount: 0,
    subTenantNames: [] as string[]
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSubTenantCount = (count: number) => {
    const validCount = Math.max(0, count);
    const newNames = [...formData.subTenantNames];
    if (validCount > newNames.length) {
      for (let i = newNames.length; i < validCount; i++) newNames.push('');
    } else {
      newNames.length = validCount;
    }
    setFormData({ ...formData, subTenantCount: validCount, subTenantNames: newNames });
  };

  const handleSubTenantNameChange = (index: number, name: string) => {
    const newNames = [...formData.subTenantNames];
    newNames[index] = name;
    setFormData({ ...formData, subTenantNames: newNames });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Fix: Construct and pass the resident object back to allow App.tsx to update the global state
      const newResident = {
        id: `t-${Math.random().toString(36).substr(2, 5)}`,
        name: formData.name,
        unitId: 'u1', 
        balance: 0,
        dailyRate: 65,
        daysRemaining: 0,
        lastKwhReading: 0,
        moveInDate: new Date().toISOString().split('T')[0],
        avatarUrl: photoPreview || undefined
      };
      onSuccess(newResident);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <button 
            onClick={onCancel}
            className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-[#050B3E] hover:border-[#050B3E] transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-5xl font-black text-[#050B3E] tracking-tighter uppercase">Register Resident</h2>
            <p className="text-slate-400 font-bold text-sm mt-2">Provisioning a new node into the rentapp infrastructure.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Basic Info & Identity */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-[#050B3E] mb-10 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              PROFILE CONFIGURATION
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Full Legal Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Subash Gurung"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Phone Network ID</label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <input 
                    type="tel" 
                    required
                    placeholder="+977 98XXXXXXXX"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Identity Document Type</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 px-8 text-sm font-bold outline-none transition-all appearance-none cursor-pointer"
                    value={formData.docType}
                    onChange={(e) => setFormData({...formData, docType: e.target.value})}
                  >
                    <option>Citizenship</option>
                    <option>Passport</option>
                    <option>Driving License</option>
                    <option>Voter ID</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">Document Serial No.</label>
                <div className="relative group">
                  <FileText className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#050B3E] transition-colors" size={20} />
                  <input 
                    type="text" 
                    required
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[28px] py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                    value={formData.docNumber}
                    onChange={(e) => setFormData({...formData, docNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-[#050B3E] flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                SUB-TENANT REGISTRY
              </h3>
              <div className="flex items-center gap-4 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
                 <button 
                  type="button" 
                  onClick={() => updateSubTenantCount(formData.subTenantCount - 1)}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
                 <span className="text-sm font-black text-[#050B3E] min-w-[20px] text-center">{formData.subTenantCount}</span>
                 <button 
                  type="button" 
                  onClick={() => updateSubTenantCount(formData.subTenantCount + 1)}
                  className="text-slate-400 hover:text-emerald-500 transition-colors"
                 >
                   <Plus size={16} />
                 </button>
              </div>
            </div>

            {formData.subTenantCount > 0 ? (
              <div className="space-y-6">
                {formData.subTenantNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-6 animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100">
                      {index + 1}
                    </div>
                    <div className="flex-1 relative group">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-[#050B3E] transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder={`Sub-tenant ${index + 1} name`}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-[#050B3E]/10 focus:bg-white rounded-[24px] py-4 pl-14 pr-6 text-sm font-bold outline-none transition-all"
                        value={name}
                        onChange={(e) => handleSubTenantNameChange(index, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 border-2 border-dashed border-slate-100 rounded-[32px] text-center">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">No sub-tenants mapped to this node</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Photo & Actions */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-[#050B3E] rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              BIOMETRIC ID
            </h3>
            
            <div className="relative aspect-square rounded-[40px] bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center transition-all group-hover:border-white/40 cursor-pointer overflow-hidden">
              {photoPreview ? (
                <>
                  <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={48} />
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="p-6 bg-white/10 rounded-[28px] mb-6 inline-block">
                    <Camera size={40} className="text-white/60" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Headshot Photo Capture</p>
                  <p className="text-[10px] text-white/40 mt-2 font-medium">Clear front-facing image required</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                 <CheckCircle size={16} className="text-emerald-500" /> Identity verification active
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                 <CheckCircle size={16} className="text-emerald-500" /> Encryption enabled
              </div>
            </div>
            
            {/* Design accents */}
            <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none" />
          </div>

          <div className="space-y-4 pt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-[#050B3E] text-white rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  DEPLOY RESIDENT
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full py-6 bg-white border-2 border-slate-100 text-slate-400 rounded-[32px] font-black text-xs uppercase tracking-[0.4em] hover:bg-slate-50 transition-all active:scale-95"
            >
              Cancel Operation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterResident;
