export interface ReceiveQuoteCardProps {
  data: ReceiveQuoteCardData;
}

interface ReceiveQuoteCardData {
  id: string;
  owner: string;
  date: string;
  fromAddress: string;
  toAddress: string;
  type: "SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING";
  updatedAt: string;
}
