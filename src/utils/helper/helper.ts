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

/**
 * Generate last 12 months options for dashboard
 * @returns Array of month options with value (YYYY-MM) and label (Mon YYYY)
 */
export const generateLast12Months = (): Array<{ value: string; label: string }> => {
  const months: Array<{ value: string; label: string }> = [];
  const now = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    months.push({
      value: `${year}-${String(month + 1).padStart(2, '0')}`,
      label: `${monthNames[month]} ${year}`
    });
  }
  
  return months;
};

/**
 * Generate daily data points for a month (15 points, one per 2 days)
 * @param year - Year number
 * @param month - Month number (1-12)
 * @returns Array of date strings in YYYY-MM-DD format
 */
export const generateDailyDataPoints = (year: number, month: number): string[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const points: string[] = [];
  
  for (let day = 1; day <= daysInMonth; day += 2) {
    const date = new Date(year, month - 1, day);
    points.push(date.toISOString().split('T')[0]);
  }
  
  return points;
};

/**
 * Format date for display (e.g., "1-2", "3-4", etc.)
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date range string
 */
export const formatDateRange = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const nextDay = day + 1;
  return `${day}-${nextDay}`;
};