export type DeliveryMethod = "email" | "pdf" | "post";

export type EmailDelivery = {
  method: "email";
  recipientEmail: string;
  scheduledDate: string | null;
};

export type PostDelivery = {
  method: "post";
  postalOption: string;
  recipientName: string;
  postCode: string;
};

export type PdfDelivery = {
  method: "pdf";
};

export type DeliveryDetails = EmailDelivery | PostDelivery | PdfDelivery;
export type VoucherPersonalisation = {
  senderName: string;
  recipientName: string;
  message: string;
  delivery: DeliveryDetails;
};