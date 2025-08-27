# King Living Orders System

A unified dashboard for viewing orders from King Living's three commerce instances (APAC, UK, US) built with React and Express.js.

## 🤖 AI Development Journey

This project was built entirely using AI assistance. Below are the exact prompts used throughout the development process.

### Initial Setup Prompts

**User**: "fix this by upgrading latest packages"

**User**: "lets complete this backend and use it in the frontend"

**User**: "refactor this into single responsibility"

**User**: "lets use faker library to generate our orders"


### Development Iterations


**User**: "remove hard coded 'APAC' | 'UK' | 'US' thi should be in enum"

**User**: "not lets implement this into our client App.ts"

**User**: "setup my concurrently run"

**User**: "error"

**User**: "For the code present, we get this error: `'@tailwind base' is no longer available in v4. Use '@import "tailwindcss/preflight"' instead.` How can I resolve this? If you propose a fix, please make it concise."

**User**: "instead using useCallback lets use useTransition"

**User**: "looks like the usage of use transition is not right"

**User**: "break this down into seperate component using best practice in frontend react with single responsibility"

**User**: "we havent show this in our dashboard"

**User**: "no need for Order Statistics Breakdown - lets remove this including the backend"

**User**: "this table should be scrollable"

**User**: "it should cover across to the bottom"

**User**: "lets also fix this filter when I click the filter button the components filter status filters should be at the bottom of search and filter button components"

**User**: "I already remvoe the selection box but you add again"

**User**: "lets remove the stats and maybe create a simple one that calculate the total amount base on the current filter and the data should came from the api for example, Initial selection is all it should calculate the total of APAC order, amount(base its currency) same goes with UK and US"

**User**: "lets put this somewhere in our footer pagination component"

**User**: "it should not converted to us it should breakdown amounts base on regions with their respective currency and breakdown total orders by regions"

**User**: "remember all calculation should came from backend"

**User**: "verify if we still uses the StatsService if not lets remvoe this"


## 🏗️ Technical Design Decisions & Reasoning

### Architecture Decisions

1. **Monorepo Structure (Development Only)**
   - **Decision**: Used a root `package.json` with workspaces for `client` and `server`
   - **Reasoning**: Easier dependency management and concurrent development
   - **Production**: Separate deployments recommended for scalability and performance

2. **Single Responsibility Principle (SRP)**
   - **Decision**: Broke down large components into smaller, focused ones
   - **Reasoning**: Better maintainability, testability, and reusability
   - **Implementation**: Created separate components for Header, SearchAndFilters, OrdersTable, Pagination, etc.

3. **Backend-First Calculations**
   - **Decision**: All data processing and calculations happen server-side
   - **Reasoning**: Better performance, data consistency, and security
   - **Implementation**: Regional breakdowns calculated in `filterService.ts`

4. **TypeScript Throughout**
   - **Decision**: Used TypeScript for both frontend and backend
   - **Reasoning**: Type safety, better IDE support, reduced runtime errors

5. **Custom Hooks Pattern**
   - **Decision**: Created `useOrders` hook for data fetching logic
   - **Reasoning**: Separation of concerns, reusability, cleaner components

### Component Architecture

```
App.tsx (Orchestrator)
├── Header (Title + Actions)
├── SearchAndFilters (Search + Filter Panel)
├── OrdersTable (Table + Loading States)
│   ├── TableHeader (Sortable Headers)
│   └── OrderRow (Individual Rows)
└── Pagination (Navigation + Regional Stats)
```

### Data Flow Design

```
Frontend Request → Backend Filter Service → Regional Breakdown → Frontend Display
```

## 🚀 Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone and setup the project:**
```bash
git clone <repository-url>
cd king-living-orders-system
npm run setup
```

2. **Configure environment variables:**
```bash
# Copy the example environment file
cp client/.env.example client/.env

# Edit the API endpoint if needed (default: http://localhost:3001)
# VITE_API_BASE_URL=http://localhost:3001
```

2. **Start both client and server:**
```bash
npm run dev
```

This will start:
- **Client**: React app on `http://localhost:5173` (Vite)
- **Server**: Express API on `http://localhost:3001`

### Available Scripts

#### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm run setup` - Install all dependencies for client and server
- `npm run clean` - Clean all node_modules and dist folders

#### Individual Commands
- `npm run dev:client` - Start only the React client
- `npm run dev:server` - Start only the Express server
- `npm run build:client` - Build only the React client
- `npm run build:server` - Build only the Express server

## 📁 Project Structure

```
king-living-orders-system/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Header/
│   │   │   ├── SearchAndFilters/
│   │   │   ├── Table/
│   │   │   └── Pagination/
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main dashboard component
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # Business logic
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── routes/         # API route definitions
│   │   └── server.ts       # Main server file
│   └── package.json
└── package.json            # Root package.json with concurrently
```

## 🚀 Deployment Strategy

### **Development (Monorepo)**
- **Structure**: Single repository with `client/` and `server/` directories
- **Purpose**: Local development, testing, and code sharing
- **Benefits**: 
  - Shared TypeScript types between frontend and backend
  - Concurrent development with `npm run dev`
  - Single source of truth for project configuration

### **Production (Separate Deployments)**
- **Recommended Approach**: Deploy client and server separately
- **Client Deployment**: 
  - Build static files: `npm run build:client`
  - Deploy to CDN/static hosting (Netlify, Vercel, AWS S3, etc.)
  - Configure environment variables for API endpoint
- **Server Deployment**:
  - Build server: `npm run build:server`
  - Deploy to cloud platform (Heroku, AWS EC2, Google Cloud, etc.)
  - Configure CORS for production domain
  - Set up environment variables for production settings

### **Environment Configuration**
```bash
# Development
VITE_API_BASE_URL=http://localhost:3001

# Production
VITE_API_BASE_URL=https://api.kingliving.com
```

### **Benefits of Separate Deployments**
- ✅ **Scalability**: Frontend and backend can scale independently
- ✅ **Performance**: Static frontend served from CDN
- ✅ **Security**: Backend isolated with proper security measures
- ✅ **Cost Optimization**: Use appropriate hosting for each part
- ✅ **Maintenance**: Independent updates and deployments

## 🌐 API Endpoints

- `GET /api/orders` - Get all orders with filtering, pagination, and regional breakdowns
- `GET /api/health` - Health check endpoint

## 📊 Features

### Dashboard Features
- **Unified View**: Display orders from APAC, UK, and US regions
- **Real-time Filtering**: Filter by region, status, payment, and shipment
- **Search**: Search by order number or store name
- **Sorting**: Sort by any order field
- **Pagination**: Navigate through large datasets
- **Regional Breakdowns**: View totals by region with native currencies

### Mock Data
- **APAC**: 3,500 orders (AUD currency) - Order numbers: KLAP000123456
- **UK**: 2,800 orders (GBP currency) - Order numbers: KLUK000789012
- **US**: 3,600 orders (USD currency) - Order numbers: KLUS000345678
- **Total**: ~9,900 realistic orders

## 🎨 Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Express.js
- TypeScript
- Faker.js (mock data generation)
- CORS enabled

## 🤔 Assumptions Made

1. **Data Structure**: Assumed CommerceTools-like order structure initially, then simplified based on requirements
2. **Currency Handling**: Initially converted all to USD, then changed to native currencies per region
3. **UI/UX**: Assumed modern dashboard design with filtering, sorting, and pagination
4. **Performance**: Assumed in-memory data storage was sufficient for POC
5. **Responsive Design**: Assumed desktop-first design for office display usage
6. **Real-time Updates**: Assumed filters should update results immediately
7. **Regional Breakdowns**: Assumed users want to see totals by region with native currencies
8. **Order Numbering**: Assumed logical prefixes (KLAP, KLUK, KLUS) for brand consistency

## 🤖 AI Development Reflection

### How AI Helped

1. **Rapid Prototyping**: AI enabled quick iteration from basic setup to full-featured dashboard
2. **Problem Solving**: AI helped resolve complex TypeScript configuration issues and dependency conflicts
3. **Code Quality**: AI suggested best practices like SRP, custom hooks, and proper component architecture
4. **Error Resolution**: AI quickly identified and fixed linter errors, import issues, and type mismatches
5. **Architecture Decisions**: AI helped design clean separation between frontend and backend responsibilities

### How AI Hindered

1. **Over-Engineering**: AI sometimes suggested complex solutions when simpler ones were needed
2. **Inconsistent Patterns**: AI occasionally reverted to previous patterns (like adding back selection checkboxes)
3. **Context Switching**: AI sometimes lost context of previous decisions and needed reminders
4. **Dependency Issues**: AI suggested package versions that caused conflicts, requiring manual resolution

### Key Learnings

1. **Clear Communication**: Being specific about requirements and constraints is crucial
2. **Iterative Approach**: Breaking down complex features into smaller, manageable requests works better
3. **Validation**: Always verify AI suggestions against project requirements
4. **Consistency**: Maintaining consistent patterns throughout the codebase requires careful oversight
5. **Problem Context**: Providing full context helps AI make better decisions

### Overall Assessment

AI significantly accelerated the development process, especially for:
- Initial project setup and configuration
- Component architecture and refactoring
- Problem diagnosis and resolution
- Code generation and boilerplate

However, it required careful oversight to ensure:
- Requirements were properly understood and implemented
- Code quality and consistency were maintained
- Technical decisions aligned with project goals

The result is a well-architected, maintainable application that demonstrates the power of AI-assisted development when used thoughtfully.

## 📝 Notes

- The server generates realistic mock data using Faker.js
- All data is in-memory (no database required)
- CORS is enabled for local development
- The client uses environment variables for API configuration (see `client/.env.example`)
- All calculations happen server-side for better performance and consistency

# klexam
