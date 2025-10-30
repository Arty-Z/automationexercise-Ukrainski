import { faker } from '@faker-js/faker';

export const COUNTRIES = {
  US: 'United States',
  CANADA: 'Canada',
  UK: 'United Kingdom',
} as const;

export const STATES = {
  ILLINOIS: 'Illinois',
  CALIFORNIA: 'California',
  TEXAS: 'Texas',
  NEW_YORK: 'New York',
} as const;

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateRandomString(length: number = 10): string {
  return faker.string.alphanumeric(length);
}

export function generateRandomEmail(): string {
  return faker.internet.email({ provider: 'example.com' });
}

export function generateRandomName(): string {
  return faker.person.firstName();
}

export function generateRandomFirstName(): string {
  return faker.person.firstName();
}

export function generateRandomLastName(): string {
  return faker.person.lastName();
}

export function generateRandomPassword(): string {
  return faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*]/ });
}

// Returns adult DOB between 1970-2000
export function generateRandomDOB(): { day: string; month: string; year: string } {
  const birthDate = faker.date.birthdate({ min: 25, max: 55, mode: 'age' });
  return {
    day: birthDate.getDate().toString(),
    month: (birthDate.getMonth() + 1).toString(),
    year: birthDate.getFullYear().toString()
  };
}

export function generateRandomCompany(): string {
  return faker.company.name();
}

export function generateRandomAddress(): {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  mobileNumber: string;
} {
  return {
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: STATES.ILLINOIS,
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number()
  };
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
