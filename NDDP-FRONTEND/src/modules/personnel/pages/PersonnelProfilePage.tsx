import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useGetPersonnelByIdQuery } from '../api/personnel.api';
import { PersonnelProfileHeader } from '../components/PersonnelProfileHeader';
import { PersonnelSubNav } from '../components/PersonnelSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { MOCK_AWARDS, MOCK_DEPENDENTS, MOCK_EMERGENCY_CONTACTS, MOCK_DOCUMENTS, MOCK_SKILLS } from '../constants/personnel-data';

const TABS = [
  'Overview', 'Personal', 'Employment', 'Organization', 'Qualifications', 'Skills', 'Certifications',
  'Training', 'Performance', 'Transfers', 'Promotions', 'Awards', 'Documents', 'Dependents',
  'Emergency Contacts', 'Assets', 'Leave', 'Medical', 'Activity',
] as const;

export function PersonnelProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: person, isLoading } = useGetPersonnelByIdQuery(id!);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  if (isLoading) return <div className="data-table-empty">Loading personnel record...</div>;
  if (!person) return <div className="data-table-empty">Personnel record not found</div>;

  const awards = MOCK_AWARDS.filter((a) => a.personnelId === person.id);
  const dependents = MOCK_DEPENDENTS.filter((d) => d.personnelId === person.id);
  const contacts = MOCK_EMERGENCY_CONTACTS.filter((c) => c.personnelId === person.id);
  const documents = MOCK_DOCUMENTS.filter((d) => d.personnelId === person.id);
  const skills = MOCK_SKILLS.filter((s) => s.personnelId === person.id);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'Personnel', path: '/personnel/dashboard' }, { label: 'Directory', path: '/personnel/directory' }, { label: `${person.firstName} ${person.lastName}` }]} title="Personnel Profile" />
      <PersonnelSubNav />
      <PersonnelProfileHeader person={person} />
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border pb-0">
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-3 py-2 text-xs font-medium sm:text-sm ${tab === t ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>{t}</button>
        ))}
      </div>
      <Card className="mt-4">
        <CardContent className="pt-6">
          {tab === 'Overview' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Years of Service', value: `${person.yearsOfService} yrs` },
                { label: 'Current Position', value: person.position },
                { label: 'Department', value: person.department },
                { label: 'Manager', value: person.supervisor ?? '—' },
                { label: 'Performance Rating', value: person.performanceRating ?? '—' },
                { label: 'Leave Balance', value: person.leaveBalance != null ? `${person.leaveBalance} days` : '—' },
                { label: 'Employment Type', value: person.employmentType },
                { label: 'Work Location', value: person.workLocation },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border p-4">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'Personal' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Full Name</dt><dd className="font-medium">{person.firstName} {person.lastName}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Email</dt><dd>{person.email}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Phone</dt><dd>{person.phone ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">National ID</dt><dd>{person.nationalId ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Marital Status</dt><dd>{person.maritalStatus ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Address</dt><dd>{person.address ?? '—'}</dd></div>
            </dl>
          )}
          {tab === 'Employment' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Personnel Number</dt><dd>{person.serviceNumber}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Employment Type</dt><dd>{person.employmentType}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Hire Date</dt><dd>{dayjs(person.hireDate).format('MMM D, YYYY')}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Contract End</dt><dd>{person.contractEndDate ? dayjs(person.contractEndDate).format('MMM D, YYYY') : '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Supervisor</dt><dd>{person.supervisor ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Office</dt><dd>{person.office ?? person.workLocation}</dd></div>
            </dl>
          )}
          {tab === 'Organization' && (
            <dl className="grid gap-4 sm:grid-cols-2">
              <div><dt className="text-sm text-muted-foreground">Department</dt><dd>{person.department}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Division</dt><dd>{person.division ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Unit</dt><dd>{person.unit}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Team</dt><dd>{person.team ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Manager</dt><dd>{person.supervisor ?? '—'}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Work Location</dt><dd>{person.workLocation}</dd></div>
            </dl>
          )}
          {tab === 'Qualifications' && <p className="text-sm text-muted-foreground"><Link to="/personnel/qualifications" className="underline">View qualifications registry</Link></p>}
          {tab === 'Skills' && (
            skills.length ? (
              <ul className="space-y-2">{skills.map((s) => <li key={s.id} className="flex justify-between border-b border-border pb-2"><span>{s.skill} <span className="text-muted-foreground">({s.category})</span></span><span className="text-sm font-medium">{s.level}</span></li>)}</ul>
            ) : <p className="text-sm text-muted-foreground">No skills recorded.</p>
          )}
          {tab === 'Certifications' && <p className="text-sm text-muted-foreground"><Link to="/personnel/certifications" className="underline">View certifications</Link></p>}
          {tab === 'Training' && <p className="text-sm text-muted-foreground">Training data from Training Service — completed and upcoming courses.</p>}
          {tab === 'Performance' && (
            <p className="text-sm text-muted-foreground">
              Performance reviews from Performance Service. Rating: {person.performanceRating ?? 'Not rated'}.{' '}
              <Link to="/performance/my-performance" className="underline">View my performance</Link>
            </p>
          )}
          {tab === 'Transfers' && <p className="text-sm text-muted-foreground"><Link to="/personnel/transfers" className="underline">View transfer history</Link></p>}
          {tab === 'Promotions' && <p className="text-sm text-muted-foreground"><Link to="/personnel/promotions" className="underline">View promotion history</Link></p>}
          {tab === 'Awards' && (
            awards.length ? (
              <ul className="space-y-2">{awards.map((a) => <li key={a.id} className="border-b border-border pb-2"><p className="font-medium">{a.title}</p><p className="text-xs text-muted-foreground">{a.type} · {dayjs(a.date).format('MMM D, YYYY')} · {a.issuedBy}</p></li>)}</ul>
            ) : <p className="text-sm text-muted-foreground">No awards recorded.</p>
          )}
          {tab === 'Documents' && (
            documents.length ? (
              <ul className="space-y-2">{documents.map((d) => <li key={d.id} className="flex justify-between border-b border-border pb-2"><span>{d.name}</span><Button variant="ghost" size="sm">Download</Button></li>)}</ul>
            ) : <p className="text-sm text-muted-foreground"><Link to="/personnel/documents" className="underline">Manage documents</Link></p>
          )}
          {tab === 'Dependents' && (
            dependents.length ? (
              <ul className="space-y-2">{dependents.map((d) => <li key={d.id} className="border-b border-border pb-2"><p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.relationship} · DOB {dayjs(d.dateOfBirth).format('MMM D, YYYY')}</p></li>)}</ul>
            ) : <p className="text-sm text-muted-foreground"><Link to="/personnel/dependents" className="underline">Manage dependents</Link></p>
          )}
          {tab === 'Emergency Contacts' && (
            contacts.length ? (
              <ul className="space-y-2">{contacts.map((c) => <li key={c.id} className="border-b border-border pb-2"><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.relationship} · {c.phone}</p></li>)}</ul>
            ) : <p className="text-sm text-muted-foreground"><Link to="/personnel/emergency-contacts" className="underline">Manage emergency contacts</Link></p>
          )}
          {tab === 'Assets' && <p className="text-sm text-muted-foreground">Assigned assets from Asset Management. <Link to="/assets/registry" className="underline">View asset registry</Link></p>}
          {tab === 'Leave' && <p className="text-sm text-muted-foreground">Leave balance: {person.leaveBalance ?? '—'} days. <Link to="/leave/my-leave" className="underline">View leave history</Link></p>}
          {tab === 'Medical' && <p className="text-sm text-muted-foreground">Medical clearance: {person.medicalClearance ?? 'Not available'}. <Link to="/medical/my-medical" className="underline">Medical summary</Link></p>}
          {tab === 'Activity' && <p className="text-sm text-muted-foreground"><Link to="/personnel/employment-history" className="underline">View full activity timeline</Link></p>}
        </CardContent>
      </Card>
    </div>
  );
}
