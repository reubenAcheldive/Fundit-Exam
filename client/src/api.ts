import axios from "axios";

export interface FinanceData {
  number: string;
  balance: number;
  currency: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  userIp: string;
}

export interface Borrower {
  bankruptcy: boolean;
  creditScore: number;
  ssn: number;
  financeData: FinanceData;
  user: User;
}

export interface PaginatedData {
  id: string;
  creationTime: any;
  companyName: string;
  amountReq: number;
  borrower: Borrower;
  labels: string[];
}

export interface Match {
  page: number;
  limit: number;
  paginatedData: PaginatedData[];
}

export const createApiClient = async (
  page: number
): Promise<{
  data: PaginatedData[];
  page: number;
  limit: number;
}> => {
  const { data } = await axios.get<Match>(
    `http://localhost:8888/api/match?page=${page}`
  );
  return { data: data.paginatedData, page: data.page, limit: data.limit };
};
