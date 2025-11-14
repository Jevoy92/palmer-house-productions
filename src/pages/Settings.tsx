import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetaTags } from '@/components/seo/MetaTags';
import { User, Bell, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({ 
          fullName: data.full_name || '',
        });
      }
    };

    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: profile.fullName,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <>
      <MetaTags 
        title="Settings - Palmer House Content OS"
        description="Manage your account settings and preferences"
      />

      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                />
              </div>
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <div className="flex items-center gap-2">
                <LogOut className="w-5 h-5 text-destructive" />
                <CardTitle>Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleSignOut}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}
