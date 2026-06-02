# FinLeg Frontend

A modern, professional financial ledger management system built with Next.js 16, React 19, and TypeScript.

## Architecture

### Directory Structure

```
frontend/
├── app/
│   ├── (auth)/                    # Authentication pages (login, register, forgot-password)
│   ├── (dashboard)/               # Dashboard pages (main app)
│   │   ├── dashboard/             # Dashboard home
│   │   ├── journal-entries/       # Journal entries management
│   │   ├── ledger/                # General ledger view
│   │   ├── trial-balance/         # Trial balance report
│   │   ├── reports/               # Financial reports
│   │   └── settings/              # User settings
│   ├── (marketting)/              # Public pages (home, about, pricing)
│   ├── api/                       # API routes (backend integration)
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── layout/                # Layout components (navbar, sidebar)
│   │   └── fintech/               # Fintech-specific components
│   ├── lib/                       # Utilities and types
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Root page (redirects to dashboard)
│   └── globals.css                # Global styles with dark/light theme
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts

```

## Design System

### Colors & Theme

- **Light mode**: Clean white background with dark text
- **Dark mode**: Professional dark background with light text
- **Primary**: Professional blue (#3b82f6)
- **Accent**: Purple accent (#8b5cf6)
- **Status colors**: Green for success, Red for errors

### Components

#### UI Components
- `Button`: Multiple variants (default, secondary, destructive, outline, ghost)
- `Input`: Text input with focus states
- `Card`: Container with header, content, and footer
- `Badge`: Status indicators
- `Label`: Form labels
- `Textarea`: Multi-line text input

#### Fintech Components
- `StatCard`: Key metrics display
- `TransactionList`: Transaction history
- `FinanceChart`: Line and bar charts for financial data

### Dark/Light Theme

Using `next-themes` for seamless theme switching. Users can select:
- Light theme
- Dark theme
- System preference (default)

Theme preference is persisted in localStorage.

## Dependencies

### Core
- `next`: ^16.2.6
- `react`: ^19.2.4
- `react-dom`: ^19.2.4
- `typescript`: ^5

### Styling
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4

### Features
- `next-themes`: Theme management
- `lucide-react`: Icon library
- `recharts`: Charts and graphs
- `clsx`: Utility for conditional classes
- `react-hook-form`: Form state management
- `zod`: Schema validation
- `date-fns`: Date utilities

## Authentication Flow

```
/login → /register → /forgot-password
   ↓
/dashboard (protected)
```

## Pages

### Authentication
- `/login` - User login
- `/register` - Account creation
- `/forgot-password` - Password reset

### Dashboard
- `/dashboard` - Overview with stats and charts
- `/journal-entries` - Journal entry management
- `/ledger` - General ledger view
- `/trial-balance` - Trial balance report
- `/reports` - Financial reports
- `/settings` - User preferences

### Marketing
- `/` - Landing page (redirects to /dashboard)
- `/about` - About us
- `/pricing` - Pricing plans

## Key Features

### 1. Dashboard
- Key financial metrics (Assets, Liabilities, Net Income)
- Monthly revenue charts
- Expense distribution
- Recent transactions list

### 2. Journal Entries
- Create and manage journal entries
- Search and filter functionality
- Status tracking (draft/posted)

### 3. General Ledger
- View all accounts
- Track debits and credits
- See account balances
- Account type classification

### 4. Trial Balance
- Verify accounting equation (Debits = Credits)
- Balance status indicator
- Account summary

### 5. Reports
- Pre-built financial reports
- Custom report generation
- Export functionality

### 6. Settings
- Company information management
- Theme preferences
- Account management

## Best Practices

### TypeScript
- Strict type checking enabled
- Interfaces for all props
- Proper generic typing

### React Patterns
- Functional components with hooks
- Server Components for data fetching (where applicable)
- Client Components for interactivity (`'use client'`)
- Proper component composition

### Styling
- Utility-first CSS with Tailwind
- CSS custom properties for theming
- Mobile-first responsive design
- Dark mode support throughout

### Performance
- Code splitting via dynamic imports
- Image optimization
- Lazy loading for heavy components
- Memoization where needed

### Accessibility
- Semantic HTML
- Proper ARIA labels
- Keyboard navigation
- Color contrast compliance

## Development

### Install Dependencies
```bash
cd frontend
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
pnpm build
pnpm start
```

### Lint
```bash
pnpm lint
```

## API Integration

All API endpoints should be called from:
- Server Components (using `fetch`)
- API Routes in `/api`
- Client Components using `fetch` with proper error handling

Example API routes:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/accounts`
- `GET /api/reports`

## Future Enhancements

- [ ] Multi-user support with role-based access
- [ ] Real-time collaboration
- [ ] Advanced filtering and sorting
- [ ] Custom report builder
- [ ] Bulk import from CSV
- [ ] Mobile app
- [ ] Webhook integrations
- [ ] Audit logs
- [ ] Financial forecasting

## Contributing

Please follow the existing code style and patterns. All components should:
- Be fully typed with TypeScript
- Include proper error handling
- Be accessible (WCAG 2.1 AA)
- Have responsive mobile design
- Work in both light and dark modes
