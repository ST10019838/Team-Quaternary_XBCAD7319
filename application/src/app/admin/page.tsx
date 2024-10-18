import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn_ui/tabs'
import AddressesTable from '@/components/ui/addresses_table'
import ContactDetailsTable from '@/components/ui/contact_details_table'
import HorsesTable from '@/components/ui/horses_table'
import PaymentDetailsTable from '@/components/ui/payment_details_table'
import UsersTable from '@/components/ui/users_table'

export default function page() {
  return (
    <Tabs defaultValue="users" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="horses">Horses</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="contact_details">Contact Details</TabsTrigger>
        <TabsTrigger value="payment_details">Payment Details</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        {/* Insert Users Table Componenet Here */}
        <UsersTable />
      </TabsContent>
      <TabsContent value="horses">
        {/* Insert Horses Table Componenet Here */}
        <HorsesTable />
      </TabsContent>
      <TabsContent value="addresses">
        {/* Insert Addresses Table Componenet Here */}
        <AddressesTable />
      </TabsContent>
      <TabsContent value="contact_details">
        {/* Insert Contact Details Table Componenet Here */}
        <ContactDetailsTable />
      </TabsContent>
      <TabsContent value="payment_details">
        {/* Insert Payment Details Table Componenet Here */}
        <PaymentDetailsTable />
      </TabsContent>
    </Tabs>
  )
}
