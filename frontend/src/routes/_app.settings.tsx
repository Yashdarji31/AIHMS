import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — AIHMS" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <PageHeader title="Settings" description="Hospital, users, permissions, notifications and appearance." />
      <Tabs defaultValue="hospital">
        <TabsList>
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="hospital" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Hospital information</CardTitle><CardDescription>Basic organisation details.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Name</Label><Input defaultValue="AIHMS General Hospital" /></div>
              <div><Label>Registration ID</Label><Input defaultValue="HOSP-A1-2019" /></div>
              <div><Label>Address</Label><Input defaultValue="12 Care Blvd, Bangalore, KA 560001" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input defaultValue="+91 80 4000 1200" /></div>
                <div><Label>Email</Label><Input defaultValue="contact@aihms.io" /></div>
              </div>
              <Button onClick={() => toast.success("Saved")}>Save changes</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Language & region</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><Label>Language</Label>
                <Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Timezone</Label>
                <Select defaultValue="ist"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card><CardContent className="space-y-4 pt-6">
            {["Emergency alerts","Appointment reminders","Inventory alerts","AI insights digest","Weekly reports"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><div className="text-sm font-medium">{n}</div><div className="text-xs text-muted-foreground">Delivered via email & in-app</div></div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card><CardContent className="pt-6">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div><div className="text-sm font-medium">Dark mode</div><div className="text-xs text-muted-foreground">Reduce glare in low-light clinical settings.</div></div>
              <Switch checked={theme === "dark"} onCheckedChange={toggle} />
            </div>
          </CardContent></Card>
        </TabsContent>

        {["departments","users","permissions"].map((v) => (
          <TabsContent key={v} value={v} className="mt-4">
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              Placeholder — wire up <code>GET /settings/{v}</code>.
            </CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}