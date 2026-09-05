import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 border text-xs font-bold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default: 'border-signal bg-signal px-4 py-2.5 text-signal-ink hover:bg-signal-bright',
        outline:
          'border-line-strong bg-surface-raised px-4 py-2.5 text-ink hover:border-signal hover:text-signal-bright',
        ghost:
          'border-transparent bg-transparent px-3 py-2 text-ink-muted hover:bg-surface-raised hover:text-ink',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Button({
  className,
  variant,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
