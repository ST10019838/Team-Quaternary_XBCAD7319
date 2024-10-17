import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn_ui/tabs'

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
      </TabsContent>
      <TabsContent value="horses">
        {/* Insert Horses Table Componenet Here */}
      </TabsContent>
      <TabsContent value="addresses">
        {/* Insert Addresses Table Componenet Here */}
      </TabsContent>
      <TabsContent value="contact_details">
        {/* Insert Contact Details Table Componenet Here */}
      </TabsContent>
      <TabsContent value="payment_details">
        {/* Insert Payment Details Table Componenet Here */}
      </TabsContent>
    </Tabs>
  )
}
