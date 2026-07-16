import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiMoreVertical } from 'react-icons/fi';
import { Button } from '@/components/ui';

export interface HierarchyNode {
  id: string;
  name: string;
  children?: HierarchyNode[];
}

interface RoleHierarchyTreeProps {
  nodes: HierarchyNode[];
  onEdit?: (node: HierarchyNode) => void;
  onDelete?: (node: HierarchyNode) => void;
  onCreateChild?: (node: HierarchyNode) => void;
}

function TreeNode({
  node,
  depth,
  onEdit,
  onDelete,
  onCreateChild,
}: {
  node: HierarchyNode;
  depth: number;
  onEdit?: (node: HierarchyNode) => void;
  onDelete?: (node: HierarchyNode) => void;
  onCreateChild?: (node: HierarchyNode) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className="group flex items-center gap-2 rounded-lg py-2 pr-2 hover:bg-muted"
        style={{ paddingLeft: `${depth * 24 + 8}px` }}
      >
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center text-muted-foreground"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {hasChildren ? (expanded ? <FiChevronDown className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />) : <span className="w-4" />}
        </button>
        <span className="flex-1 text-sm font-medium text-foreground">{node.name}</span>
        <div className="hidden gap-1 group-hover:flex">
          <Button variant="ghost" size="sm" onClick={() => onCreateChild?.(node)}>Add Child</Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit?.(node)}>Edit</Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete?.(node)}>Delete</Button>
        </div>
        <FiMoreVertical className="h-4 w-4 text-muted-foreground group-hover:hidden" />
      </div>
      {expanded && hasChildren && node.children!.map((child) => (
        <TreeNode key={child.id} node={child} depth={depth + 1} onEdit={onEdit} onDelete={onDelete} onCreateChild={onCreateChild} />
      ))}
    </div>
  );
}

export function RoleHierarchyTree({ nodes, onEdit, onDelete, onCreateChild }: RoleHierarchyTreeProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex gap-2">
        <Button variant="outline" size="sm">Expand All</Button>
        <Button variant="outline" size="sm">Collapse All</Button>
      </div>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} depth={0} onEdit={onEdit} onDelete={onDelete} onCreateChild={onCreateChild} />
      ))}
    </div>
  );
}
