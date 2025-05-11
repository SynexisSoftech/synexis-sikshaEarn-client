// utils/kyc-validation.ts

/**
 * Comprehensive KYC validation and security utilities
 */

import { createHash } from 'crypto';

// ID document types with their validation rules
const ID_TYPES = {
  passport: {
    pattern: /^[A-Z0-9]{6,12}$/i,
    minLength: 6,
    maxLength: 12
  },
  nationalId: {
    pattern: /^[A-Z0-9]{8,15}$/i,
    minLength: 8,
    maxLength: 15
  },
  drivingLicense: {
    pattern: /^[A-Z0-9]{5,20}$/i,
    minLength: 5,
    maxLength: 20
  }
};

// Country-specific ID validation patterns (example)
const COUNTRY_ID_PATTERNS = {
  'US': {
    ssn: /^\d{3}-\d{2}-\d{4}$/,
    drivingLicense: /^[A-Z0-9]{1,16}$/i
  },
  'UK': {
    nationalInsurance: /^[A-Z]{2}\d{6}[A-Z]$/i,
    drivingLicense: /^[A-Z0-9]{5,20}$/i
  }
  // Add more countries as needed
};

/**
 * Validate ID number based on ID type and nationality
 */
export function validateIdNumber(idNumber: string, idType: string, nationality?: string): { 
  valid: boolean; 
  message?: string 
} {
  // Basic validation
  if (!idNumber) {
    return { valid: false, message: 'ID number is required' };
  }
  
  // Check for common ID type validations
  const idTypeRules = ID_TYPES[idType as keyof typeof ID_TYPES];
  
  if (idTypeRules) {
    // Check length
    if (idNumber.length < idTypeRules.minLength || idNumber.length > idTypeRules.maxLength) {
      return { 
        valid: false, 
        message: `${idType} number must be between ${idTypeRules.minLength} and ${idTypeRules.maxLength} characters` 
      };
    }
    
    // Check pattern
    if (!idTypeRules.pattern.test(idNumber)) {
      return { 
        valid: false, 
        message: `Invalid ${idType} number format` 
      };
    }
  }
  
  // Country-specific validation if nationality is provided
  if (nationality && COUNTRY_ID_PATTERNS[nationality as keyof typeof COUNTRY_ID_PATTERNS]) {
    const countryRules = COUNTRY_ID_PATTERNS[nationality as keyof typeof COUNTRY_ID_PATTERNS];
    const countrySpecificPattern = countryRules[idType as keyof typeof countryRules];
    
    if (countrySpecificPattern && !countrySpecificPattern.test(idNumber)) {
      return { 
        valid: false, 
        message: `Invalid ${idType} format for ${nationality}` 
      };
    }
  }
  
  return { valid: true };
}

/**
 * Validate date of birth (must be 18+ years old)
 */
export function validateDateOfBirth(dob: string): {
  valid: boolean;
  message?: string
} {
  if (!dob) {
    return { valid: false, message: 'Date of birth is required' };
  }
  
  const dobDate = new Date(dob);
  
  // Check if date is valid
  if (isNaN(dobDate.getTime())) {
    return { valid: false, message: 'Invalid date format' };
  }
  
  // Check if date is in the future
  if (dobDate > new Date()) {
    return { valid: false, message: 'Date of birth cannot be in the future' };
  }
  
  // Check if person is at least 18 years old
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  
  if (age < 18 || (age === 18 && monthDiff < 0) || 
      (age === 18 && monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    return { valid: false, message: 'Must be at least 18 years old' };
  }
  
  return { valid: true };
}

/**
 * Validate address (basic validation)
 */
export function validateAddress(address: string): {
  valid: boolean;
  message?: string
} {
  if (!address) {
    return { valid: false, message: 'Address is required' };
  }
  
  // Minimum length check
  if (address.length < 10) {
    return { valid: false, message: 'Address must be at least 10 characters' };
  }
  
  // Maximum length check to prevent abuse
  if (address.length > 200) {
    return { valid: false, message: 'Address cannot exceed 200 characters' };
  }
  
  return { valid: true };
}

/**
 * Check for suspicious patterns in uploaded documents
 * This is a basic implementation - in production, you'd use more sophisticated methods
 */
export function detectSuspiciousDocuments(frontIdPath: string, backIdPath: string): {
  suspicious: boolean;
  reason?: string
} {
  // In a real system, you would:
  // 1. Use OCR to extract text from images
  // 2. Compare extracted text with submitted information
  // 3. Check for signs of image manipulation
  // 4. Use AI models to detect fake IDs
  
  // For now, we'll just implement a placeholder
  return { suspicious: false };
}

/**
 * Hash sensitive data for security logs (don't store raw data in logs)
 */
export function hashSensitiveData(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Generate a secure filename for uploaded documents
 */
export function generateSecureFilename(userId: string, documentType: string, originalFilename: string): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 10);
  const extension = originalFilename.split('.').pop() || 'unknown';
  
  return `${userId}-${documentType}-${timestamp}-${randomStr}.${extension}`;
}

/**
 * Risk score algorithm for KYC submissions
 * Higher score means higher risk (0-100)
 */
export function calculateRiskScore(kycData: {
  nationality: string;
  documentQuality?: 'high' | 'medium' | 'low';
  addressVerified?: boolean;
  previousRejections?: number;
  idType: string;
}): {
  score: number;
  factors: string[];
} {
  let score = 0;
  const factors: string[] = [];
  
  // High-risk countries list (example)
  const highRiskCountries = ['country1', 'country2', 'country3'];
  
  // Check nationality risk
  if (highRiskCountries.includes(kycData.nationality.toLowerCase())) {
    score += 30;
    factors.push('High-risk nationality');
  }
  
  // Document quality assessment
  if (kycData.documentQuality) {
    if (kycData.documentQuality === 'low') {
      score += 25;
      factors.push('Low document quality');
    } else if (kycData.documentQuality === 'medium') {
      score += 10;
      factors.push('Medium document quality');
    }
  }
  
  // Address verification
  if (kycData.addressVerified === false) {
    score += 15;
    factors.push('Address not verified');
  }
  
  // Previous rejections
  if (kycData.previousRejections && kycData.previousRejections > 0) {
    score += Math.min(kycData.previousRejections * 10, 30);
    factors.push(`${kycData.previousRejections} previous rejection(s)`);
  }
  
  // ID type risk assessment
  if (kycData.idType !== 'passport') {
    score += 5;
    factors.push('Non-passport ID');
  }
  
  return {
    score: Math.min(score, 100), // Cap at 100
    factors
  };
}