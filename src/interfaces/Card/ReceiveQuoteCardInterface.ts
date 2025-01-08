export interface ReceiveQuoteCardProps {
  data: ReceiveQuoteCardData;
}

interface ReceiveQuoteCardData {
  owner: string;
  date: string;
  fromAddress: string;
  toAddress: string;
  type: "SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING";
  updatedAt: string;
}
