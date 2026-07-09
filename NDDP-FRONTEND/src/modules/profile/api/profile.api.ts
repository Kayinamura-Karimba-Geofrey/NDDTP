import { mockDelay } from '@/utils/api-mock';
import { baseApi, serviceQuery } from '@/services/api/base-api';
import { ENABLE_MOCK_API } from '@/constants/app';
import { unwrapApiResponse } from '@/utils/api-response';
import {
  MOCK_MY_PROFILE,
  type MyProfileRecord,
  type ProfileAddress,
  type ProfileEmergencyContact,
  type ProfileStatus,
} from '../constants/profile-data';

function mapAddress(raw: Record<string, unknown>): ProfileAddress {
  return {
    id: (raw.id as string) ?? `adr-${Math.random().toString(36).slice(2, 9)}`,
    type: ((raw.type as string) ?? (raw.addressType as string) ?? 'HOME').toUpperCase(),
    line1: (raw.line1 as string) ?? (raw.street as string) ?? (raw.addressLine1 as string) ?? '—',
    line2: (raw.line2 as string) ?? (raw.addressLine2 as string) ?? undefined,
    city: (raw.city as string) ?? '—',
    district: (raw.district as string) ?? (raw.province as string) ?? '—',
    country: (raw.country as string) ?? 'Rwanda',
    isPrimary: Boolean(raw.isPrimary ?? raw.primary),
  };
}

function mapContact(raw: Record<string, unknown>): ProfileEmergencyContact {
  return {
    id: (raw.id as string) ?? `ec-${Math.random().toString(36).slice(2, 9)}`,
    name: (raw.name as string) ?? (raw.fullName as string) ?? '—',
    relationship: (raw.relationship as string) ?? '—',
    phone: (raw.phone as string) ?? (raw.phoneNumber as string) ?? '—',
    email: (raw.email as string) ?? undefined,
    isPrimary: Boolean(raw.isPrimary ?? raw.primary),
  };
}

function mapProfile(raw: Record<string, unknown>): MyProfileRecord {
  const dept = raw.department as { name?: string } | string | undefined;
  const addresses = (raw.addresses as Record<string, unknown>[] | undefined) ?? [];
  const contacts = (raw.emergencyContacts as Record<string, unknown>[] | undefined) ?? [];
  return {
    id: raw.id as string,
    employeeNumber: (raw.employeeNumber as string) ?? '—',
    firstName: (raw.firstName as string) ?? '—',
    middleName: raw.middleName as string | undefined,
    lastName: (raw.lastName as string) ?? '—',
    email: (raw.email as string) ?? '—',
    phone: (raw.phone as string) ?? (raw.phoneNumber as string) ?? '—',
    jobTitle: (raw.jobTitle as string) ?? (raw.position as string) ?? '—',
    department: typeof dept === 'object' ? dept?.name ?? '—' : (dept as string) ?? '—',
    rank: (raw.rank as string) ?? '—',
    status: ((raw.status as string) ?? 'ACTIVE').toUpperCase() as ProfileStatus,
    avatarUrl: (raw.avatarUrl as string) ?? (raw.profilePhotoUrl as string) ?? undefined,
    hireDate: raw.hireDate ? String(raw.hireDate).slice(0, 10) : (raw.createdAt ? String(raw.createdAt).slice(0, 10) : '—'),
    addresses: Array.isArray(addresses) ? addresses.map(mapAddress) : [],
    emergencyContacts: Array.isArray(contacts) ? contacts.map(mapContact) : [],
  };
}

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<MyProfileRecord, void>({
      queryFn: async (_arg, _a, _b, baseQuery) => {
        if (ENABLE_MOCK_API) {
          await mockDelay(200);
          return { data: MOCK_MY_PROFILE };
        }
        const result = await baseQuery(serviceQuery('user', '/users/me'));
        if (result.error) return { data: MOCK_MY_PROFILE };
        const raw = unwrapApiResponse<Record<string, unknown>>(result.data);
        return { data: mapProfile(raw) };
      },
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
