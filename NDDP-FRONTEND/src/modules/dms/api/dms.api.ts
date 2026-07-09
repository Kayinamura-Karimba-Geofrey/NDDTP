import { baseApi } from '@/services/api/base-api';
import { mockDelay, paginate } from '@/utils/api-mock';
import type { PaginatedResponse } from '@/types';
import {
  DMS_MOCK_DOCUMENTS,
  MOCK_SHARED,
  MOCK_APPROVALS,
  MOCK_SIGNATURES,
  type DmsDocument,
  type SharedDocument,
  type ApprovalItem,
  type SignatureRequest,
} from '../constants/dms-data';



/** DMS API — mock-first until document-service is deployed. */
export const dmsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDmsDocuments: builder.query<PaginatedResponse<DmsDocument>, { page?: number; limit?: number; search?: string }>({
      queryFn: async (params) => {
        await mockDelay(200);
        let items = DMS_MOCK_DOCUMENTS;
        if (params.search?.trim()) {
          const q = params.search.toLowerCase();
          items = items.filter((d) =>
            [d.title, d.documentNumber, d.category, d.owner, d.department].some((f) => f.toLowerCase().includes(q)),
          );
        }
        return { data: paginate(items, params.page ?? 1, params.limit ?? 50) };
      },
      providesTags: ['DmsDocuments'],
    }),

    getDmsDocument: builder.query<DmsDocument | undefined, string>({
      queryFn: async (id) => {
        await mockDelay(150);
        return { data: DMS_MOCK_DOCUMENTS.find((d) => d.id === id) };
      },
      providesTags: (_r, _e, id) => [{ type: 'DmsDocuments', id }],
    }),

    getSharedDocuments: builder.query<SharedDocument[], void>({
      queryFn: async () => {
        await mockDelay(150);
        return { data: MOCK_SHARED };
      },
      providesTags: ['DmsShared'],
    }),

    getDmsApprovals: builder.query<ApprovalItem[], void>({
      queryFn: async () => {
        await mockDelay(150);
        return { data: MOCK_APPROVALS };
      },
      providesTags: ['DmsApprovals'],
    }),

    getDmsSignatures: builder.query<SignatureRequest[], void>({
      queryFn: async () => {
        await mockDelay(150);
        return { data: MOCK_SIGNATURES };
      },
      providesTags: ['DmsSignatures'],
    }),
  }),
});

export const {
  useGetDmsDocumentsQuery,
  useGetDmsDocumentQuery,
  useGetSharedDocumentsQuery,
  useGetDmsApprovalsQuery,
  useGetDmsSignaturesQuery,
} = dmsApi;
