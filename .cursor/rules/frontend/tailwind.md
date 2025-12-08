# Tailwind CSS Development Rules

## Setup

### Installation
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuration
```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... more shades
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## Core Principles

### Utility-First Approach
- Use utility classes directly in HTML/JSX
- Avoid custom CSS unless absolutely necessary
- Compose utilities for complex designs

### Responsive Design
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Mobile: full width, Tablet: half, Desktop: third */}
</div>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  {/* Automatic dark mode support */}
</div>
```

## Component Patterns

### Button Component
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  ghost: 'hover:bg-gray-100 text-gray-700',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-md font-medium transition-colors focus:outline-none focus:ring-2',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Card Component
```tsx
export const Card: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      {children}
    </div>
  );
};

export const CardHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mb-4 border-b pb-4">{children}</div>;
};

export const CardTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{children}</h3>;
};

export const CardContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="text-gray-700 dark:text-gray-300">{children}</div>;
};
```

## Layout Patterns

### Flex Layouts
```tsx
// Horizontal centering
<div className="flex justify-center items-center h-screen">
  <Content />
</div>

// Space between items
<div className="flex justify-between items-center">
  <Logo />
  <Navigation />
</div>

// Vertical stack with gap
<div className="flex flex-col gap-4">
  <Item1 />
  <Item2 />
</div>
```

### Grid Layouts
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>

// Auto-fit columns
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Container & Spacing
```tsx
// Centered container with max width
<div className="container mx-auto px-4 max-w-7xl">
  <Content />
</div>

// Section spacing
<section className="py-12 md:py-16 lg:py-20">
  <Content />
</section>
```

## Typography

### Headings
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
  Main Title
</h1>

<h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100">
  Section Title
</h2>

<h3 className="text-2xl font-medium text-gray-700 dark:text-gray-200">
  Subsection
</h3>
```

### Body Text
```tsx
<p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
  Body paragraph with good readability
</p>

<p className="text-sm text-gray-500">
  Small text for captions
</p>
```

## Forms

### Input Fields
```tsx
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Email
    </label>
    <input
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      placeholder="you@example.com"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Message
    </label>
    <textarea
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    />
  </div>
</div>
```

### Form with @tailwindcss/forms Plugin
```tsx
// With plugin, forms look better by default
<input type="text" className="rounded-md" />
<select className="rounded-md">
  <option>Option 1</option>
</select>
<input type="checkbox" className="rounded text-blue-600" />
```

## States & Interactions

### Hover States
```tsx
<button className="bg-blue-500 hover:bg-blue-600 transition-colors">
  Hover me
</button>

<div className="transform hover:scale-105 transition-transform">
  Scales on hover
</div>
```

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible focus
</button>
```

### Active States
```tsx
<button className="active:scale-95 transition-transform">
  Press me
</button>
```

### Disabled States
```tsx
<button className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Disabled
</button>
```

## Animations

### Built-in Animations
```tsx
<div className="animate-spin">Loading...</div>
<div className="animate-pulse">Pulsing...</div>
<div className="animate-bounce">Bouncing...</div>
```

### Custom Animations
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

## Utility Functions

### Class Name Merging (cn helper)
```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className // From props
)} />
```

## Common Patterns

### Loading Skeleton
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  <div className="h-32 bg-gray-200 rounded"></div>
</div>
```

### Modal/Dialog
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
    <h2 className="text-xl font-bold mb-4">Modal Title</h2>
    <p className="text-gray-600 dark:text-gray-400 mb-4">Modal content...</p>
    <div className="flex justify-end gap-2">
      <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### Badge
```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  Badge
</span>
```

### Alert
```tsx
<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
  <div className="flex">
    <div className="flex-shrink-0">
      <svg className="h-5 w-5 text-yellow-400" /* icon */ />
    </div>
    <div className="ml-3">
      <p className="text-sm text-yellow-700">Warning message</p>
    </div>
  </div>
</div>
```

## Responsive Design Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

```tsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text size
</div>
```

## Best Practices
- ✅ Use the `cn()` utility for conditional classes
- ✅ Extract common patterns into reusable components
- ✅ Use Tailwind's built-in classes before custom CSS
- ✅ Leverage the JIT compiler for arbitrary values: `w-[137px]`
- ✅ Use CSS variables for complex theming
- ❌ Don't use inline styles
- ❌ Avoid `@apply` in CSS files (use components instead)
- ❌ Don't mix Tailwind with other CSS frameworks

## Performance
- Use PurgeCSS (automatic in Tailwind 3+)
- Enable JIT mode for faster builds
- Split large component libraries into separate chunks
- Use CDN for production (not recommended for most apps)

## Dark Mode Setup
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
};
```

```tsx
// Toggle dark mode
<button onClick={() => document.documentElement.classList.toggle('dark')}>
  Toggle Dark Mode
</button>
```

## Plugins
- `@tailwindcss/forms` - Better form styles
- `@tailwindcss/typography` - Prose styles
- `@tailwindcss/aspect-ratio` - Aspect ratio utilities
- `@tailwindcss/line-clamp` - Line clamping (built-in v3.3+)
