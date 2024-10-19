import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/tabs'
import AddressesTable from '@/components/ui/addresses-table'
import ContactDetailsTable from '@/components/ui/contact-details-table'
import { DataTable } from '@/components/shadcn-ui/data-table'
import { columns } from '@/components/shadcn-ui/data-table-column-template'
import HorsesTable from '@/components/ui/horses-table'
import PaymentDetailsTable from '@/components/ui/payment-details-table'
import UsersTable from '@/components/ui/users-table'

export default function page() {
  return (
    // <Tabs defaultValue="users" className="w-[400px]">
    //   <TabsList>
    //     <TabsTrigger value="users">Users</TabsTrigger>
    //     <TabsTrigger value="horses">Horses</TabsTrigger>
    //     <TabsTrigger value="addresses">Addresses</TabsTrigger>
    //     <TabsTrigger value="contact_details">Contact Details</TabsTrigger>
    //     <TabsTrigger value="payment_details">Payment Details</TabsTrigger>
    //   </TabsList>
    //   <TabsContent value="users">
    //     {/* Insert Users Table Componenet Here */}
    //     <UsersTable />
    //   </TabsContent>
    //   <TabsContent value="horses">
    //     {/* Insert Horses Table Componenet Here */}
    //     <HorsesTable />
    //   </TabsContent>
    //   <TabsContent value="addresses">
    //     {/* Insert Addresses Table Componenet Here */}
    //     <AddressesTable />
    //   </TabsContent>
    //   <TabsContent value="contact_details">
    //     {/* Insert Contact Details Table Componenet Here */}
    //     <ContactDetailsTable />
    //   </TabsContent>
    //   <TabsContent value="payment_details">
    //     {/* Insert Payment Details Table Componenet Here */}
    //     <PaymentDetailsTable />
    //   </TabsContent>
    // </Tabs>

    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={payments} />
    </div>
  )
}

// Test data for table
type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
