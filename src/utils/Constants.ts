export interface ClientInterface {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  amountBalance: number;
}

export interface BillItem {
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
}

export interface BillInterface {
  billId: string;
  billDate: Date;
  client: string;
  orderItems: BillItem[];
  totalBillAmount: string;
  userId: string;
  balanceAmount: number;
}

export interface TransactionInterface {
  id: string;
  amountReceived: string;
  amountSent: string;
  client: string;
  mode: string;
  reasonOfPayment: string;
  typeOfTransaction: string;
  dateOfPayment: string;
}
