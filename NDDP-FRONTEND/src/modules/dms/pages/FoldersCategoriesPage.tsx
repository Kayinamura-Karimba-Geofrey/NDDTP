import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiFolder, FiPlus } from 'react-icons/fi';
import { DmsSubNav } from '../components/DmsSubNav';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button, Card, CardContent } from '@/components/ui';
import { MOCK_FOLDERS, type DmsFolder } from '../constants/dms-data';

function FolderNode({ folder, depth = 0 }: { folder: DmsFolder; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <FiFolder className="h-4 w-4 text-primary" />
        <span className="font-medium">{folder.name}</span>
        <span className="text-xs text-muted-foreground">({folder.documentCount})</span>
      </button>
      {open && folder.children?.map((c) => <FolderNode key={c.id} folder={c} depth={depth + 1} />)}
    </div>
  );
}

export function FoldersCategoriesPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'DMS', path: '/dms/dashboard' }, { label: 'Folders' }]}
        title="Folders & Categories"
        description="Enterprise folder navigation — create, rename, move, archive, permissions"
        actions={<Button onClick={() => toast('Create folder')}><FiPlus className="h-4 w-4" /> Create Folder</Button>}
      />
      <DmsSubNav />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-4">
            {MOCK_FOLDERS.map((f) => <FolderNode key={f.id} folder={f} />)}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardContent className="space-y-3 pt-6 text-sm">
            <p className="font-medium">Folder actions</p>
            <div className="flex flex-wrap gap-2">
              {['Rename', 'Move', 'Copy', 'Archive', 'Set Permissions', 'Favorite'].map((a) => (
                <Button key={a} size="sm" variant="outline" onClick={() => toast(a)}>{a}</Button>
              ))}
            </div>
            <p className="pt-4 text-muted-foreground">Select a folder in the tree to browse documents. Hierarchy mirrors Personnel, Finance, and Procurement repositories.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
