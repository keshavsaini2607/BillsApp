import {getAllDocs} from './firebase';

export const getLastBill = async (clientId: string) => {
  try {
    const allBills: any = await getAllDocs('Bills');
    const clientBills = allBills.filter(
      (bill: any) => bill.client === clientId,
    );

    const sortedClientBills = clientBills.sort(
      (a: any, b: any) =>
        new Date(b.billDate).getTime() - new Date(a.billDate).getTime(),
    );

    const lastBill = sortedClientBills[0];

    return lastBill;
  } catch (error) {
    console.log('error fetching client balance', error);
  }
};
