import React from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const SelectComponent = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
);
SelectComponent.displayName = 'Select';

export { SelectComponent as Select };
export const SelectGroup = React.Fragment;
export const SelectValue = React.Fragment;
export const SelectTrigger = SelectComponent;
export const SelectContent = React.Fragment;
export const SelectItem = React.Fragment;
export const SelectSeparator = React.Fragment;
export const SelectScrollUpButton = React.Fragment;
export const SelectScrollDownButton = React.Fragment;
