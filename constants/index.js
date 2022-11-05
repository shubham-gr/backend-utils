export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const PHONE_VERIFICATION_OTP = 'PHONE_VERIFICATION_OTP';

export function GET_REFRESH_TOKEN_KEY(id) {
  return `${REFRESH_TOKEN}_${id}`;
}
export function GET_PHONE_VERIFICATION_OTP_KEY(phone) {
  return `${PHONE_VERIFICATION_OTP}_${phone}`;
}
