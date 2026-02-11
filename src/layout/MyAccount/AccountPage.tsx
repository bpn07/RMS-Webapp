import AddressSection from "./AccountPage/AddressSection";
import PaymentMethods from "./AccountPage/PaymentMethods";
import PasswordSection from "./AccountPage/PasswordSection";
import SocialAccounts from "./AccountPage/SocialAccount";
import AccountDetailsTab from "./AccountPage/AccountDetails";
import ContactPref from "./AccountPage/ContactPref";
import DeleteAccount from "./AccountPage/DeleteAccount";

export default function AccountPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-10">
      <AccountDetailsTab />
      <AddressSection />
      <PaymentMethods />
      <PasswordSection />
      <SocialAccounts />
      <ContactPref />
      <DeleteAccount />
    </main>
  );
}
