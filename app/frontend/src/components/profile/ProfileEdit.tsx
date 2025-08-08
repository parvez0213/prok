import React, { useRef, useState } from 'react';

interface FormState {
  username: string;
  email: string;
  bio: string;
  skills: string;
  avatar?: string; // base64 preview
}

const ProfileEdit: React.FC = () => {
  const [form, setForm] = useState<FormState>({ username: '', email: '', bio: '', skills: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.username.trim()) next.username = 'Username is required';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) next.email = 'Valid email is required';
    if (form.bio.length > 300) next.bio = 'Bio must be under 300 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // TODO integrate with backend; mock delay
      await new Promise(res => setTimeout(res, 800));
    } finally {
      setSubmitting(false);
    }
  };

  const onPickImage = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input name="username" value={form.username} onChange={onChange} className="mt-1 w-full border rounded p-2" />
            {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={onChange} className="mt-1 w-full border rounded p-2" />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Bio</label>
            <textarea name="bio" value={form.bio} onChange={onChange} className="mt-1 w-full border rounded p-2" rows={4} />
            {errors.bio && <p className="text-sm text-red-600 mt-1">{errors.bio}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Skills (comma separated)</label>
            <input name="skills" value={form.skills} onChange={onChange} className="mt-1 w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Avatar</h2>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
            {form.avatar ? <img src={form.avatar} className="h-full w-full object-cover" /> : <span className="text-gray-400">No image</span>}
          </div>
          <div>
            <button type="button" onClick={onPickImage} className="px-3 py-2 bg-indigo-600 text-white rounded">Choose Image</button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button disabled={submitting} className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50">
          {submitting ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit; 