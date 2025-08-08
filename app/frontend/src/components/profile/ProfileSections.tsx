import React, { useState } from 'react';
import { Profile } from '../../types';

interface Props {
  profile: Profile;
  phone?: string;
}

const Section: React.FC<{ title: string; accent: string; children: React.ReactNode; defaultOpen?: boolean }>
  = ({ title, accent, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-xl border bg-white shadow p-4 border-${accent}-200`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between">
        <h3 className={`text-lg font-semibold text-${accent}-800`}>{title}</h3>
        <span className={`text-sm text-${accent}-600`}>{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && <div className="mt-3 text-gray-700">{children}</div>}
    </div>
  );
};

const ProfileSections: React.FC<Props> = ({ profile, phone }) => {
  return (
    <div className="space-y-4">
      <Section title="About" accent="indigo" defaultOpen>
        <p>{profile.bio}</p>
      </Section>
      <Section title="Skills" accent="emerald" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((s, i) => (
            <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">{s}</span>
          ))}
        </div>
      </Section>
      <Section title="Experience" accent="sky" defaultOpen>
        <div className="space-y-3">
          {profile.experience.map(exp => (
            <div key={exp.id} className="border-l-4 border-sky-400 pl-3">
              <div className="font-medium">{exp.title} • {exp.company}</div>
              <div className="text-sm text-gray-500">{exp.start_date} → {exp.end_date}</div>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Education" accent="violet" defaultOpen>
        <div className="space-y-3">
          {profile.education.map(edu => (
            <div key={edu.id} className="border-l-4 border-violet-400 pl-3">
              <div className="font-medium">{edu.degree}</div>
              <div className="text-sm text-gray-500">{edu.school} • {edu.field}</div>
              <div className="text-sm text-gray-500">{edu.start_date} → {edu.end_date}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Contact" accent="rose" defaultOpen>
        <div className="text-sm text-gray-700 space-y-1">
          <div>Location: {profile.location}</div>
          {phone && <div>PH: {phone}</div>}
        </div>
      </Section>
    </div>
  );
};

export default ProfileSections;