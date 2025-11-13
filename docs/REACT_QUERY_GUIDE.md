# React Query Setup Guide

This project uses **@tanstack/react-query** (formerly React Query) for efficient data fetching, caching, and state management.

## 📁 File Structure

```
src/
├── lib/
│   ├── queryClient.ts       # React Query client configuration
│   └── apiClient.ts          # Axios instance with interceptors
├── provider/
│   └── QueryProvider.tsx     # React Query provider wrapper
├── hooks/
│   ├── useDashboard.ts       # Dashboard-specific hooks
│   └── useApiHooks.ts        # Common API hooks utilities
├── services/
│   └── dashboardService.ts   # API service functions
```

## 🚀 Usage

### 1. Using Query Hooks

```tsx
import { useDashboardData } from '../hooks/useDashboard';

function DashboardComponent() {
  const { data, isLoading, error, refetch } = useDashboardData('2025-11');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render dashboard data */}</div>;
}
```

### 2. Using Mutations

```tsx
import { useApiMutation } from '../hooks/useApiHooks';
import { useFeedback } from '../provider/FeedbackProvider';

function CreateMovieForm() {
  const { showSnackbar } = useFeedback();
  
  const mutation = useApiMutation(
    (data) => api.post('/movies', data),
    {
      onSuccess: () => {
        showSnackbar('Movie created successfully!', 'success');
      },
      onError: (error) => {
        showSnackbar('Failed to create movie', 'error');
      },
    }
  );
  
  const handleSubmit = (movieData) => {
    mutation.mutate(movieData);
  };
  
  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### 3. Creating New API Services

```typescript
// src/services/movieService.ts
import { api } from '../lib/apiClient';
import type { MovieDTO } from '../utils/dtos/movieDTO';

export const movieApi = {
  getAll: async () => {
    const response = await api.get<MovieDTO[]>('/movies');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<MovieDTO>(`/movies/${id}`);
    return response.data;
  },
  
  create: async (data: Omit<MovieDTO, 'movie_id'>) => {
    const response = await api.post<MovieDTO>('/movies', data);
    return response.data;
  },
};
```

### 4. Creating New Query Hooks

```typescript
// src/hooks/useMovies.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { movieApi } from '../services/movieService';

export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  detail: (id: string) => [...movieKeys.all, 'detail', id] as const,
};

export const useMovies = () => {
  return useQuery({
    queryKey: movieKeys.lists(),
    queryFn: movieApi.getAll,
  });
};

export const useMovie = (id: string) => {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => movieApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: movieApi.create,
    onSuccess: () => {
      // Invalidate and refetch movies list
      queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
    },
  });
};
```

## ⚙️ Configuration

### API Base URL

Set your API base URL in `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Query Client Options

Modify `src/lib/queryClient.ts` to adjust default options:

- `staleTime`: How long data is considered fresh (default: 5 minutes)
- `gcTime`: How long inactive queries are cached (default: 30 minutes)
- `retry`: Number of retry attempts for failed requests (default: 1)
- `refetchOnWindowFocus`: Refetch data when window regains focus (default: false)

### Authentication

The API client automatically adds the auth token from localStorage to requests. Store your token after login:

```typescript
localStorage.setItem('auth_token', 'your-jwt-token');
```

## 🔧 Advanced Features

### Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateMovie,
  onMutate: async (newMovie) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: movieKeys.detail(newMovie.id) });
    
    // Snapshot previous value
    const previousMovie = queryClient.getQueryData(movieKeys.detail(newMovie.id));
    
    // Optimistically update
    queryClient.setQueryData(movieKeys.detail(newMovie.id), newMovie);
    
    return { previousMovie };
  },
  onError: (err, newMovie, context) => {
    // Rollback on error
    queryClient.setQueryData(
      movieKeys.detail(newMovie.id),
      context?.previousMovie
    );
  },
});
```

### Prefetching Data

```typescript
import { usePrefetchQuery } from '../hooks/useApiHooks';

function MoviesList() {
  const prefetch = usePrefetchQuery();
  
  const handleMouseEnter = (movieId: string) => {
    prefetch(
      movieKeys.detail(movieId),
      () => movieApi.getById(movieId)
    );
  };
  
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id} onMouseEnter={() => handleMouseEnter(movie.id)}>
          {movie.title}
        </div>
      ))}
    </div>
  );
}
```

## 📚 Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Query Essentials](https://tanstack.com/query/latest/docs/react/guides/queries)
- [Mutations Guide](https://tanstack.com/query/latest/docs/react/guides/mutations)
