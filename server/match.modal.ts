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
  
  export interface Data {
    id: string;
    creationTime: any;
    companyName: string;
    amountReq: number;
    borrower: Borrower;
    labels: string[];
  }
  
