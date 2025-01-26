export interface SendQuotationModalData {
  id: string;
  type: 'SMALL' | 'HOME' | 'OFFICE' | 'APPOINTMENT' | 'WAITING';
  date: string;
  fromAddress: string;
  toAddress: string;
  owner: string;
}

export interface SendQuotationModalProps {
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
