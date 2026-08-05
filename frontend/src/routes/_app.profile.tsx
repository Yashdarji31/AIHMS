import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — AIHMS" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" description="Manage your personal details, security and activity." />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <Avatar className="h-24 w-24"><AvatarFallback className="text-2xl">DA</AvatarFallback></Avatar>
            <div>
              <div className="text-lg font-semibold">Dr. Admin</div>
              <div className="text-sm text-muted-foreground">Administrator</div>
            </div>
            <Button variant="outline" size="sm">Change photo</Button>
          </CardContent>
        </Card>
        <Card>
          <Tabs defaultValue="personal">
            <CardHeader><TabsList><TabsTrigger value="personal">Personal</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList></CardHeader>
            <CardContent>
              <TabsContent value="personal" className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First name</Label><Input defaultValue="Admin" /></div>
                  <div><Label>Last name</Label><Input defaultValue="Doe" /></div>
                </div>
                <div><Label>Email</Label><Input defaultValue="admin@aihms.io" /></div>
                <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
                <Button onClick={() => toast.success("Profile updated")}>Save</Button>
              </TabsContent>
              <TabsContent value="security" className="space-y-3">
                <div><Label>Current password</Label><Input type="password" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>New password</Label><Input type="password" /></div>
                  <div><Label>Confirm</Label><Input type="password" /></div>
                </div>
                <Button onClick={() => toast.success("Password changed")}>Update password</Button>
              </TabsContent>
              <TabsContent value="activity">
                <ul className="divide-y divide-border text-sm">
                  {[
                    ["Logged in", "Just now · Chrome · Bangalore"],
                    ["Approved invoice INV-8012", "1 hr ago"],
                    ["Ran AI Bed Occupancy prediction", "3 hrs ago"],
                    ["Added Dr. Verma to Cardiology", "yesterday"],
                  ].map(([a, b]) => (
                    <li key={a} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 py-3">
                      <div className="min-w-0"><div className="truncate font-medium">{a}</div><div className="text-xs text-muted-foreground">{b}</div></div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}