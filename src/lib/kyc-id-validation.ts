export type KycIdTypeUi = "national_id" | "passport" | "drivers_licence" | string;

const ELEVEN_DIGITS = /^\d{11}$/;
const PASSPORT = /^[A-Za-z]\d{8}$/;
const DRIVERS_LICENCE = /^[A-Za-z0-9]{5,15}$/;

export function toElevenDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function normalizeKycIdNumber(value: string, idType: KycIdTypeUi): string {
  if (idType === "national_id") {
    return toElevenDigits(value);
  }

  if (idType === "passport") {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 9);
    if (cleaned.length === 0) return "";
    const letter = cleaned[0]!.replace(/[^A-Z]/g, "") || cleaned[0]!;
    const digits = cleaned.slice(1).replace(/\D/g, "").slice(0, 8);
    return `${letter}${digits}`.slice(0, 9);
  }

  if (idType === "drivers_licence") {
    return value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 15);
  }

  return value;
}

export function isValidBvn(bvn: string): boolean {
  return ELEVEN_DIGITS.test(bvn.trim());
}

export function isValidKycIdNumber(idType: KycIdTypeUi, idNumber: string): boolean {
  const value = idNumber.trim();
  if (!value) return false;

  switch (idType) {
    case "national_id":
      return ELEVEN_DIGITS.test(value);
    case "passport":
      return PASSPORT.test(value);
    case "drivers_licence":
      return DRIVERS_LICENCE.test(value);
    default:
      return false;
  }
}

export function kycIdNumberErrorMessage(idType: KycIdTypeUi, idNumber: string): string | null {
  if (!idNumber.trim()) return "ID number is required";
  if (isValidKycIdNumber(idType, idNumber)) return null;

  switch (idType) {
    case "national_id":
      return "NIN must be exactly 11 digits.";
    case "passport":
      return "Passport number must be 1 letter followed by 8 digits (e.g. A00123456).";
    case "drivers_licence":
      return "Driver's licence number must be 5–15 alphanumeric characters.";
    default:
      return "Please select an ID type and enter a valid ID number.";
  }
}

export function bvnErrorMessage(bvn: string): string | null {
  if (!bvn.trim()) return "BVN is required";
  if (!isValidBvn(bvn)) return "BVN must be exactly 11 digits.";
  return null;
}

/** Maps UI id number into API `nin` field (all ID types share that payload key). */
export function toApiIdNumberOrNull(idType: KycIdTypeUi, idNumber: string): string | null {
  const normalized = normalizeKycIdNumber(idNumber, idType).trim();
  return isValidKycIdNumber(idType, normalized) ? normalized : null;
}

export function toApiBvnOrNull(bvn: string): string | null {
  const normalized = toElevenDigits(bvn);
  return isValidBvn(normalized) ? normalized : null;
}
