import * as React from "react"

const buttonVariants = {
  variant: {
    default: "text-white bg-[#00854d] hover:bg-[#025231] text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    destructive: "text-white hover:bg-red-500/90 bg-red-500 text-sm",
    clear: "text-black hover:bg-gray-200 bg-gray-100 text-sm",
  },
  size: {
    default: "h-8 pb-[1px] px-2 rounded",
    lg: "h-11 px-8 rounded",
    sm: "h-7 rounded px-2 text-xs",
    icon: "h-10 w-10 rounded",
  },
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Component = asChild ? "span" : "button"
    const variantClass = buttonVariants.variant[variant]
    const sizeClass = buttonVariants.size[size]

    return (
      <Component
        className={`${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }