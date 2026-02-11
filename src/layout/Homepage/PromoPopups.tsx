import { ReactNode } from "react";

export const PROMOTION_POPUPS: Record<string, ReactNode> = {
  "menu-discount": (
    <div className="space-y-2 text-sm">
      <p>• Minimum order £20</p>
      <p>• New customers only</p>
      <p>• Alcohol excluded</p>
    </div>
  ),

  "delivery-info": (
    <div className="space-y-2 text-sm">
      <p>Live tracking is unavailable.</p>
      <p>Customer support is still available.</p>
    </div>
  ),

  "bank-offer": (
    <div className="space-y-2 text-sm">
      <p>• Valid on XYZ Bank debit & credit cards</p>
      <p>• Max discount £5</p>
      <p>• Once per user</p>
    </div>
  ),
};
