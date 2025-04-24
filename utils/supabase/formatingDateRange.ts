export const formatingDateRange = (dateRangeString: string): string => {
	// Validate input format with regex
	const isValidFormat = /^\d{8}~\d{8}$/.test(dateRangeString);
	
	if (!isValidFormat) {
	  throw new Error('Invalid date range format. Expected format: YYYYMMDD~YYYYMMDD');
	}
	
	// Split the date range
	const [startDate, endDate] = dateRangeString.split('~');
	
	// Format each date
	const formatDate = (dateStr: string): string => {
	  const year = dateStr.substring(0, 4);
	  const month = dateStr.substring(4, 6);
	  const day = dateStr.substring(6, 8);
	  return `${year}.${month}.${day}`;
	};
	
	// Apply formatting to both dates and join them back
	return [startDate, endDate]
	  .map(formatDate)
	  .join('~');
  };
  