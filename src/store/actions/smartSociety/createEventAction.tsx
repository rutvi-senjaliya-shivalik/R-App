import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CREATE_EVENT } from "../../../services/httpService";
import * as types from "../../actionType";
import PrefManager from "../../../utils/prefManager";
import { STRING } from "../../../constants";
import { getSocietyIdFromToken } from "../../../utils/tokenHelper";

export const createEventAction = (eventData: {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  eventType?: string;
  status?: string;
  imageUrl?: string | null;
  isPaid?: boolean;
  amount?: number;
  priority?: string;
  maxCapacity?: number | null;
  registrationDeadline?: string | null;
  societyId?: string;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(createEventRequest());

      console.log('Creating Event', eventData);

      // Get society ID from params first, otherwise extract from token
      let societyId = eventData?.societyId || null;

      if (!societyId) {
        // Get token and extract society ID
        const token = await PrefManager.getValue(STRING.TOKEN);
        
        // Handle token if it's stored as JSON string
        let cleanToken = token;
        if (token && typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
          try {
            cleanToken = JSON.parse(token);
          } catch (e) {
            cleanToken = token;
          }
        }

        if (cleanToken) {
          try {
            societyId = getSocietyIdFromToken(cleanToken);
            console.log('🏢 Society ID extracted from token:', societyId);
          } catch (error) {
            console.error('❌ Error extracting society ID from token:', error);
          }
        }
      }

      // Prepare form data - handle both JSON and FormData
      let requestData: any = {
        // Use title if provided, otherwise use name
        title: eventData.title || eventData.name,
        name: eventData.name || eventData.title, // Keep for backward compatibility
        description: eventData.description,
        eventType: eventData.eventType || 'General',
        visibility: eventData.visibility || 'Public', // Must be one of: Public, Private, Members Only, Committee Only
        startDate: eventData.startDate || (eventData.date ? new Date(eventData.date).toISOString() : null),
        endDate: eventData.endDate || null,
        startTime: eventData.startTime || eventData.time || null,
        endTime: eventData.endTime || null,
        // Legacy fields for backward compatibility
        date: eventData.date || (eventData.startDate ? new Date(eventData.startDate).toISOString().split('T')[0] : null),
        time: eventData.time || eventData.startTime || null,
        location: eventData.location,
        venue: eventData.venue || undefined,
        maxParticipants: eventData.maxParticipants || eventData.maxCapacity || undefined,
        maxCapacity: eventData.maxCapacity || eventData.maxParticipants || undefined, // Keep for backward compatibility
        requiresRegistration: eventData.requiresRegistration !== undefined ? eventData.requiresRegistration : false,
        registrationDeadline: eventData.registrationDeadline 
          ? (typeof eventData.registrationDeadline === 'string' 
              ? eventData.registrationDeadline 
              : eventData.registrationDeadline instanceof Date 
                ? eventData.registrationDeadline.toISOString()
                : new Date(eventData.registrationDeadline).toISOString())
          : undefined,
        estimatedBudget: eventData.estimatedBudget || undefined,
        agenda: eventData.agenda || undefined,
        contactPerson: eventData.contactPerson || undefined,
        images: eventData.images || undefined,
        bannerImage: eventData.bannerImage || undefined,
        imageUrl: eventData.imageUrl || eventData.bannerImage || undefined, // Keep for backward compatibility
        isPaid: eventData.isPaid !== undefined ? eventData.isPaid : false,
        amount: eventData.isPaid && eventData.amount ? eventData.amount : undefined,
        status: eventData.status || 'Draft',
        priority: eventData.priority || 'Medium',
        ...(societyId && { societyId }),
      };

      // If image exists, use FormData
      let apiHeaders: Record<string, string> = {};
      const hasImage = eventData.imageUrl || eventData.bannerImage || (eventData.images && eventData.images.length > 0);
      
      if (hasImage) {
        // React Native FormData is a global object
        const formData = new FormData();
        
        // Append all text fields
        formData.append('title', requestData.title || requestData.name);
        if (requestData.name) formData.append('name', requestData.name);
        formData.append('description', requestData.description);
        formData.append('eventType', requestData.eventType || 'General');
        formData.append('visibility', requestData.visibility || 'Public');
        
        if (requestData.startDate) formData.append('startDate', requestData.startDate);
        if (requestData.endDate) formData.append('endDate', requestData.endDate);
        if (requestData.startTime) formData.append('startTime', requestData.startTime);
        if (requestData.endTime) formData.append('endTime', requestData.endTime);
        
        // Legacy fields
        if (requestData.date) formData.append('date', requestData.date);
        if (requestData.time) formData.append('time', requestData.time);
        if (requestData.location) formData.append('location', requestData.location);
        if (requestData.venue) formData.append('venue', requestData.venue);
        
        if (requestData.maxParticipants) formData.append('maxParticipants', requestData.maxParticipants.toString());
        if (requestData.maxCapacity) formData.append('maxCapacity', requestData.maxCapacity.toString());
        if (requestData.requiresRegistration !== undefined) {
          formData.append('requiresRegistration', requestData.requiresRegistration.toString());
        }
        if (requestData.registrationDeadline) {
          // Ensure registrationDeadline is a valid ISO 8601 date string
          const deadlineDate = requestData.registrationDeadline;
          const isoDate = deadlineDate instanceof Date 
            ? deadlineDate.toISOString() 
            : deadlineDate;
          formData.append('registrationDeadline', isoDate);
        }
        if (requestData.estimatedBudget) formData.append('estimatedBudget', requestData.estimatedBudget.toString());
        if (requestData.agenda) formData.append('agenda', requestData.agenda);
        if (requestData.contactPerson) {
          formData.append('contactPerson', JSON.stringify(requestData.contactPerson));
        }
        if (requestData.images && Array.isArray(requestData.images)) {
          formData.append('images', JSON.stringify(requestData.images));
        }
        
        formData.append('status', requestData.status || 'Draft');
        if (requestData.priority) formData.append('priority', requestData.priority);
        if (requestData.isPaid !== undefined) {
          formData.append('isPaid', requestData.isPaid.toString());
        }
        if (requestData.isPaid && requestData.amount) {
          formData.append('amount', requestData.amount.toString());
        }
        if (societyId) {
          formData.append('societyId', societyId);
        }
        
        // Add banner image if exists
        if (eventData.bannerImage) {
          let bannerUri = eventData.bannerImage;
          if (!bannerUri.startsWith('file://') && !bannerUri.startsWith('content://')) {
            bannerUri = `file://${bannerUri}`;
          }
          formData.append('bannerImage', {
            uri: bannerUri,
            type: 'image/jpeg',
            name: 'banner-image.jpg',
          } as any);
        }
        
        // Add event image/poster if exists
        if (eventData.imageUrl) {
          let imageUri = eventData.imageUrl;
          if (!imageUri.startsWith('file://') && !imageUri.startsWith('content://')) {
            imageUri = `file://${imageUri}`;
          }
          formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'event-image.jpg',
          } as any);
        }

        requestData = formData;
      }

      const response = await MakeApiRequest({
        apiUrl: CREATE_EVENT,
        apiMethod: POST,
        apiData: requestData,
        apiHeaders,
      });

      dispatch(createEventSuccess(response));
      return response;
    } catch (error: any) {
      console.error('Create Event Error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        isNetworkError: error?.isNetworkError,
      });
      dispatch(createEventFailure(error));
      throw error;
    }
  };
};

export const createEventRequest = () => ({
  type: types.CREATE_EVENT_REQUEST,
});

export const createEventSuccess = (payload: any) => ({
  type: types.CREATE_EVENT_SUCCESS,
  payload,
});

export const createEventFailure = (payload: any) => ({
  type: types.CREATE_EVENT_FAILURE,
  payload,
});

export const createEventClear = () => ({
  type: types.CREATE_EVENT_CLEAR,
});

