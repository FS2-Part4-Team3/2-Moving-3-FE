export interface SendQuotationModalData {
  id: string;
  type: "SMALL" | "HOME" | "OFFICE" | "APPOINTMENT" | "WAITING";
  date: string;
  fromAddress: string;
  toAddress: string;
  owner: string;
}

export interface SendQuotationModalProps {
  onClose: () => void;
}
