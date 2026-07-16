import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const alertVariants = cva('relative flex gap-3 rounded-xl border p-4', {
  variants: {
    variant: {
      info: 'border-border bg-muted/50 text-foreground',
      success: 'border-green-200 bg-green-50 text-foreground',
      warning: 'border-amber-200 bg-amber-50 text-foreground',
      danger: 'border-red-200 bg-red-50 text-foreground',
    },
  },
  defaultVariants: { variant: 'info' },
});

const icons = {
  info: FiInfo,
  success: FiCheckCircle,
  warning: FiAlertTriangle,
  danger: FiAlertCircle,
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
}

export function Alert({ className, variant = 'info', title, children, ...props }: AlertProps) {
  const Icon = icons[variant ?? 'info'];
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
      <div>
        {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
