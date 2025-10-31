/**
 * Utility functions for date and time formatting
 */

/**
 * Formats a date string to a short readable date format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Mon, Oct 31")
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a date string to a long readable date format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Monday, October 31, 2025")
 */
export const formatDateLong = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a date string to a readable time format
 * @param dateString - ISO date string
 * @returns Formatted time string (e.g., "02:30 PM")
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};