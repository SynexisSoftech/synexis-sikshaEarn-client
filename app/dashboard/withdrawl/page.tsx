import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function WithdrawalRequestPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Withdrawal Request</h1>
        <Badge variant="outline" className="bg-slate-800 text-white px-3 py-1 text-sm">
          Remaining Commission : Rs. 0
        </Badge>
      </div>

      <Button className="bg-teal-700 hover:bg-teal-800">Make Request</Button>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-auto">
          <div className="font-medium mb-2">From</div>
          <Select>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="thisweek">This Week</SelectItem>
              <SelectItem value="lastweek">Last Week</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="lastmonth">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <div className="font-medium mb-2">From</div>
          <Input type="date" placeholder="Select Date Range..." className="w-full md:w-64" />
        </div>
        <Button className="bg-teal-700 hover:bg-teal-800">Filter</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: 1, amount: "Rs. 800", status: "Success", date: "2025-04-27 14:04:41" },
                { id: 2, amount: "Rs. 400", status: "Success", date: "2025-04-12 15:51:20" },
                { id: 3, amount: "Rs. 400", status: "Success", date: "2025-03-08 11:27:40" },
                { id: 4, amount: "Rs. 1200", status: "Success", date: "2025-02-23 12:28:17" },
                { id: 5, amount: "Rs. 400", status: "Success", date: "2025-01-25 10:11:07" },
                { id: 6, amount: "Rs. 400", status: "Success", date: "2025-01-23 11:19:04" },
              ].map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="font-medium">{row.amount}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500">{row.status}</Badge>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
