import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent, Input } from '@/components/ui';

const STEPS = ['Select Files', 'Add Metadata', 'Permissions & Workflow', 'Review & Submit'] as const;

export function DocumentUploadPage() {
  const [step, setStep] = useState(0);
  const [files] = useState(['Contract.pdf', 'Budget.xlsx']);

  return (
    <div>
      <PageHeader breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Upload' }]} title="Document Upload" description="Drag & drop, metadata, virus scan, folder selection, and workflow" />
      <DmsSubNav />
      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button key={s} type="button" onClick={() => setStep(i)} className={`rounded-full px-3 py-1 text-xs font-medium ${i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
            {i + 1}. {s}
          </button>
        ))}
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {step === 0 && (
            <>
              <div
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-16 text-center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); toast('Files received'); }}
              >
                <FiUpload className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Drag & drop files here</p>
                <p className="mt-1 text-sm text-muted-foreground">PDF, DOCX, XLSX, PPTX, Images, TXT, CSV · ZIP restricted by policy</p>
                <Button className="mt-4" variant="outline" onClick={() => toast('File picker')}>Browse Files</Button>
              </div>
              <ul className="space-y-2 text-sm">
                {files.map((f) => (
                  <li key={f} className="flex items-center justify-between rounded-lg border border-border px-4 py-2">
                    <span>{f}</span>
                    <span className="text-xs text-success">Virus scan: Clean · Ready</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Category" defaultValue="Procurement" />
              <Input label="Department" defaultValue="Procurement Office" />
              <Input label="Retention Class" defaultValue="7 Years" />
              <Input label="Security Classification" defaultValue="Confidential" />
              <Input label="Tags" defaultValue="contract, office equipment, 2026" className="sm:col-span-2" />
              <Input label="Related Entity" defaultValue="PO-2026-0881" className="sm:col-span-2" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 text-sm">
              <Input label="Share with" defaultValue="Procurement Department" />
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Allow managers to view</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Allow editing by reviewers</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Send for approval</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Require digital signature</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Notify watchers on updates</label>
            </div>
          )}
          {step === 3 && (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div><dt className="text-muted-foreground">Files</dt><dd className="font-medium">2 selected</dd></div>
              <div><dt className="text-muted-foreground">Category</dt><dd className="font-medium">Procurement</dd></div>
              <div><dt className="text-muted-foreground">Department</dt><dd className="font-medium">Procurement Office</dd></div>
              <div><dt className="text-muted-foreground">Classification</dt><dd className="font-medium">Confidential</dd></div>
              <div><dt className="text-muted-foreground">Workflow</dt><dd className="font-medium">Approval + Digital Signature</dd></div>
            </dl>
          )}
          <div className="flex justify-between pt-4">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast('Saved as draft')}>Save as Draft</Button>
              {step < 3 ? (
                <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
              ) : (
                <Button onClick={() => toast.success('Documents submitted')}>Submit Documents</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
