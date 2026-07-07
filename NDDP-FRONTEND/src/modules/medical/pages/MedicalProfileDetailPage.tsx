import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { MedicalSubNav } from '../components/MedicalSubNav';
import { MedicalProfileHeader } from '../components/MedicalProfileHeader';
import { MedicalStatusBadge } from '../components/MedicalStatusBadge';
import { MOCK_PROFILES, MOCK_ASSESSMENTS, MOCK_APPOINTMENTS, MOCK_CLEARANCES, MOCK_VACCINATIONS, MOCK_REFERRALS } from '../constants/medical-data';

const TABS = ['Overview', 'Assessments', 'Appointments', 'Clearances', 'Vaccinations', 'Referrals', 'Restrictions', 'Timeline'] as const;

export function MedicalProfileDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<typeof TABS[number]>('Overview');
  const profile = MOCK_PROFILES.find((p) => p.id === id) ?? MOCK_PROFILES[0];
  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Medical', path: '/medical/dashboard' }, { label: 'Profiles', path: '/medical/profiles' }, { label: name }]} title="Medical Profile" description="Confidential occupational health record" />
      <MedicalSubNav />
      <MedicalProfileHeader profile={profile} />
      <div className="mb-4 mt-6 flex gap-1 overflow-x-auto border-b border-border pb-3">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>{t}</button>
        ))}
      </div>
      <Card>
        <CardContent className="pt-6">
          {tab === 'Overview' && (
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <p><strong>Department:</strong> {profile.department}</p>
              <p><strong>Emergency Contact:</strong> {profile.emergencyContact}</p>
              <p><strong>Current Status:</strong> <MedicalStatusBadge status={profile.medicalStatus} /></p>
              <p><strong>Next Assessment:</strong> {profile.nextAssessmentDate ? dayjs(profile.nextAssessmentDate).format('MMM D, YYYY') : '—'}</p>
            </div>
          )}
          {tab === 'Assessments' && MOCK_ASSESSMENTS.filter((a) => a.personnelName === name).map((a) => (
            <div key={a.id} className="mb-3 rounded-lg border border-border p-3 text-sm">{a.category} — {dayjs(a.assessmentDate).format('MMM D, YYYY')} · <MedicalStatusBadge status={a.status} /></div>
          ))}
          {tab === 'Appointments' && MOCK_APPOINTMENTS.filter((a) => a.personnelName === name).map((a) => (
            <div key={a.id} className="mb-3 rounded-lg border border-border p-3 text-sm">{a.appointmentType} — {dayjs(a.date).format('MMM D')} {a.time} · {a.location}</div>
          ))}
          {tab === 'Clearances' && MOCK_CLEARANCES.filter((c) => c.personnelName === name).map((c) => (
            <div key={c.id} className="mb-3 rounded-lg border border-border p-3 text-sm">{c.clearanceType} — expires {dayjs(c.expiryDate).format('MMM D, YYYY')}</div>
          ))}
          {tab === 'Vaccinations' && MOCK_VACCINATIONS.filter((v) => v.personnelName === name).map((v) => (
            <div key={v.id} className="mb-3 rounded-lg border border-border p-3 text-sm">{v.vaccine} {v.dose} — {dayjs(v.administrationDate).format('MMM D, YYYY')}</div>
          ))}
          {tab === 'Referrals' && MOCK_REFERRALS.filter((r) => r.personnelName === name).map((r) => (
            <div key={r.id} className="mb-3 rounded-lg border border-border p-3 text-sm">{r.referralNumber} — {r.reason} · {r.receivingFacility}</div>
          ))}
          {tab === 'Restrictions' && <p className="text-sm text-muted-foreground">{profile.fitnessStatus === 'Fit with Restrictions' ? 'No heavy lifting for 8 weeks' : 'No active restrictions'}</p>}
          {tab === 'Timeline' && (
            <div className="space-y-3 text-sm">
              {MOCK_ASSESSMENTS.filter((a) => a.personnelName === name).map((a) => (
                <div key={a.id}>{dayjs(a.assessmentDate).format('MMM D, YYYY')} — {a.category}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-4"><Link to="/medical/profiles" className="text-sm underline">← Back to profiles</Link></div>
    </div>
  );
}
