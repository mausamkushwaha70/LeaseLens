import { apiClient } from "@/lib/axios";
import type { LeaseRecord } from "@/types/lease.types";

/** API adapter. The lease management UI currently uses local mock data. */
export const leaseService = {
  async list(): Promise<LeaseRecord[]> {
    const response = await apiClient.get<LeaseRecord[]>("/leases");
    return response.data;
  },
  async getById(id: string): Promise<LeaseRecord> {
    const response = await apiClient.get<LeaseRecord>(`/leases/${encodeURIComponent(id)}`);
    return response.data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/leases/${encodeURIComponent(id)}`);
  },
};
