export interface RejectQuotationModalProps {
  onClose: () => void;
  data: {
    id: string;
    owner: {
      name: string;
    };
    date: string;
    fromAddress: string;
    toAddress: string;
    serviceType: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
    isSpecificRequest: boolean;
  };
}
