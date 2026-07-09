export const USER_TYPE = { STUDENT: 0, PROFESSOR: 1 }

const TEACHER_EMAIL_REGEX = /^[a-zA-Z]+\.[a-zA-Z]{2}@veracruz\.tecnm\.mx$/

export function userTypeFromEmail(email) {
  return TEACHER_EMAIL_REGEX.test(email) ? USER_TYPE.PROFESSOR : USER_TYPE.STUDENT
}
