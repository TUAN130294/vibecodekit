import { FC } from 'react';
import { cn } from '@/lib/utils';

interface {{ComponentName}}Props {
  className?: string;
  children?: React.ReactNode;
  // Add your props here
}

/**
 * {{ComponentName}} - Brief description of component
 *
 * @example
 * ```tsx
 * <{{ComponentName}}>
 *   Content here
 * </{{ComponentName}}>
 * ```
 */
export const {{ComponentName}}: FC<{{ComponentName}}Props> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

{{ComponentName}}.displayName = '{{ComponentName}}';
