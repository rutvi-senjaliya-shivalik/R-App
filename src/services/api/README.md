# API Services Structure

## Overview
This directory contains all API service modules organized by feature/collection.

## Structure
```
src/services/api/
├── apiClient.ts          # Base HTTP client with interceptors
├── auth.service.ts       # Authentication APIs
├── leads.service.ts      # Leads management APIs (to be created)
├── projects.service.ts   # Projects APIs (to be created)
├── index.ts             # Export all services
└── README.md            # This file
```

## Usage

### 1. Using Auth Service

```typescript
import { authService } from '../services/api';

// Login
const response = await authService.login({
  email: 'testuser@example.com',
  password: 'secret123'
});

// Send OTP
const otpResponse = await authService.sendPhoneOtp({
  phone: '+919876543210'
});

// Verify OTP
const verifyResponse = await authService.verifyPhoneOtp({
  phone: '+919876543210',
  otp: '123456',
  otpId: 'otp-id-from-send-response'
});
```

### 2. Using Auth Hook (Recommended)

```typescript
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'testuser@example.com',
        password: 'secret123'
      });
      // Navigate to home
    } catch (err) {
      // Error is already set in the hook
      console.error(err);
    }
  };

  return (
    // Your UI
  );
};
```

## Configuration

Update the API base URL in `src/config/env.ts`:

```typescript
export const ENV = {
  API_BASE_URL: 'https://your-api-domain.com',
  API_VERSION: 'v1',
};
```

## Features

- ✅ Automatic token management
- ✅ Request/Response interceptors
- ✅ Error handling
- ✅ TypeScript support
- ✅ Centralized configuration
- ✅ Easy to extend for new modules

## Adding New Service

1. Create a new service file (e.g., `leads.service.ts`)
2. Define types and interfaces
3. Create service class with methods
4. Export from `index.ts`

Example:
```typescript
// leads.service.ts
import apiClient from './apiClient';

export interface Lead {
  id: string;
  name: string;
  // ... other fields
}

class LeadsService {
  async getLeads(page: number = 1): Promise<Lead[]> {
    return await apiClient.get(`/leads?page=${page}`);
  }

  async createLead(data: Partial<Lead>): Promise<Lead> {
    return await apiClient.post('/leads', data);
  }
}

export default new LeadsService();
```
