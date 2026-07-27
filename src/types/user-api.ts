export interface UserCompanyProfile {
  companyLegalName?: string | null;
  tradingBrandName?: string | null;
  registrationType?: string | null;
  registrationNumber?: string | null;
  companyLoginEmail?: string | null;
  dateOfRegistration?: string | null;
  companyWebsite?: string | null;
  businessAddress?: string | null;
  registeredAddress?: string | null;
  companyEmail?: string | null;
  companyPhone?: string | null;
  cacVerifiedCompanyName?: string | null;
  cacVerifiedRegistrationNumber?: string | null;
  cacVerifiedCompanyType?: string | null;
  cacVerificationStatus?: string | null;
  cacVerifiedAt?: string | null;
  cacIncorporationDate?: string | null;
  representativeFullName?: string | null;
  representativeJobTitle?: string | null;
  representativePhoneNumber?: string | null;
  representativeDateOfBirth?: string | null;
  representativeEmail?: string | null;
  representativeNationality?: string | null;
  representativeCountryOfResidence?: string | null;
  representativeAddress?: string | null;
}

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  preferredName?: string | null;
  userType: string;
  isEmailVerified: boolean;
  dateOfBirth?: string | null;
  nationality?: string | null;
  countryOfResidence?: string | null;
  stateOfResidence?: string | null;
  residentialAddress?: string | null;
  hasAgreedToTerms?: boolean;
  company?: UserCompanyProfile | null;
}
