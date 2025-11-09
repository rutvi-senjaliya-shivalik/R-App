/**
 * Utility functions for JWT token operations
 */

/**
 * Base64 decode for React Native (compatible with both web and native)
 */
const base64Decode = (str: string): string => {
  try {
    // For React Native, we can use a simple base64 decode
    // This is a basic implementation that works in React Native
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    
    str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    
    for (let i = 0; i < str.length; i += 4) {
      const enc1 = chars.indexOf(str.charAt(i));
      const enc2 = chars.indexOf(str.charAt(i + 1));
      const enc3 = chars.indexOf(str.charAt(i + 2));
      const enc4 = chars.indexOf(str.charAt(i + 3));
      
      const chr1 = (enc1 << 2) | (enc2 >> 4);
      const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      const chr3 = ((enc3 & 3) << 6) | enc4;
      
      output += String.fromCharCode(chr1);
      
      if (enc3 !== 64) {
        output += String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output += String.fromCharCode(chr3);
      }
    }
    
    return output;
  } catch (error) {
    console.error('Base64 decode error:', error);
    throw error;
  }
};

/**
 * Decode JWT token and extract payload
 * @param token - JWT token string
 * @returns Decoded payload object or null if invalid
 */
export const decodeJWT = (token: string): any => {
  try {
    if (!token) return null;
    
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace(/^Bearer\s+/, '');
    
    // JWT has 3 parts: header.payload.signature
    const parts = cleanToken.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT token format');
      return null;
    }
    
    // Decode the payload (second part)
    const payload = parts[1];
    
    // Add padding if needed for base64 decoding
    let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    
    // Decode base64
    const decoded = base64Decode(base64);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

/**
 * Extract society ID from JWT token
 * @param token - JWT token string
 * @returns Society ID string or null
 */
export const getSocietyIdFromToken = (token: string): string | null => {
  try {
    if (!token) {
      console.warn('⚠️ No token provided to getSocietyIdFromToken');
      return null;
    }
    
    const decoded = decodeJWT(token);
    if (!decoded) {
      console.warn('⚠️ Failed to decode JWT token');
      return null;
    }
    
    console.log('🔍 Decoded token payload keys:', Object.keys(decoded));
    
    // Try different possible field names for society ID
    const societyId = decoded.societyId || decoded.society_id || decoded.societyID || decoded.societyId || null;
    
    if (societyId) {
      console.log('✅ Society ID found in token:', societyId);
    } else {
      console.warn('⚠️ Society ID not found in token. Available keys:', Object.keys(decoded));
    }
    
    return societyId;
  } catch (error) {
    console.error('❌ Error extracting society ID from token:', error);
    return null;
  }
};

/**
 * Extract user ID from JWT token
 * @param token - JWT token string
 * @returns User ID string or null
 */
export const getUserIdFromToken = (token: string): string | null => {
  try {
    if (!token) {
      console.warn('⚠️ No token provided to getUserIdFromToken');
      return null;
    }
    
    const decoded = decodeJWT(token);
    if (!decoded) {
      console.warn('⚠️ Failed to decode JWT token');
      return null;
    }
    
    // Try different possible field names for user ID
    const userId = decoded.id || decoded.userId || decoded.user_id || decoded.userID || null;
    
    if (userId) {
      console.log('✅ User ID found in token:', userId);
    } else {
      console.warn('⚠️ User ID not found in token. Available keys:', Object.keys(decoded));
    }
    
    return userId;
  } catch (error) {
    console.error('❌ Error extracting user ID from token:', error);
    return null;
  }
};

/**
 * Extract building ID from JWT token
 * @param token - JWT token string
 * @returns Building ID string or null
 */
export const getBuildingIdFromToken = (token: string): string | null => {
  try {
    if (!token) {
      console.warn('⚠️ No token provided to getBuildingIdFromToken');
      return null;
    }
    
    const decoded = decodeJWT(token);
    if (!decoded) {
      console.warn('⚠️ Failed to decode JWT token');
      return null;
    }
    
    // Try different possible field names for building ID
    const buildingId = decoded.buildingId || decoded.building_id || decoded.buildingID || decoded.buildingId || null;
    
    if (buildingId) {
      console.log('✅ Building ID found in token:', buildingId);
    } else {
      console.warn('⚠️ Building ID not found in token. Available keys:', Object.keys(decoded));
    }
    
    return buildingId;
  } catch (error) {
    console.error('❌ Error extracting building ID from token:', error);
    return null;
  }
};

