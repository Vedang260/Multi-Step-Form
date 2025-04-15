// utils/years.ts
export const generateYearOptions = (startOffset = 50, endOffset = 1) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    
    for (let year = currentYear + endOffset; year >= currentYear - startOffset; year--) {
      years.push(year);
    }
    
    return years;
  };