import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs'
import AddressesTable from '@/components/ui/addresses-table'
import ContactDetailsTable from '@/components/ui/contact-details-table'
import HorsesTable from '@/components/ui/horses-table'
import PaymentDetailsTable from '@/components/ui/payment-details-table'
import UsersTable from '@/components/ui/users-table'

export default function Page() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="w-auto flex justify-start space-x-4">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="horses">Horses</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="contact_details">Contact Details</TabsTrigger>
        <TabsTrigger value="payment_details">Payment Details</TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="w-full">
        <UsersTable />
      </TabsContent>
      <TabsContent value="horses" className="w-full">
        <HorsesTable />
      </TabsContent>
      <TabsContent value="addresses" className="w-full">
        <AddressesTable />
      </TabsContent>
      <TabsContent value="contact_details" className="w-full">
        <ContactDetailsTable />
      </TabsContent>
      <TabsContent value="payment_details" className="w-full">
        <PaymentDetailsTable />
      </TabsContent>
    </Tabs>
  )
}
