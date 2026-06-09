export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  preferredName?: string | null;
  userType: string;
  isEmailVerified: boolean;
}
