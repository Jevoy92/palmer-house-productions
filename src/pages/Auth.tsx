import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndustrySelection } from '@/components/dashboard/IndustrySelection';
import { toast } from 'sonner';
import { MetaTags } from '@/components/seo/MetaTags';

export default function Auth() {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showIndustryOnboarding, setShowIndustryOnboarding] = useState(false);
  
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      checkIndustryOnboarding();
    }
  }, [user]);

  const checkIndustryOnboarding = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('industry')
      .eq('id', user.id)
      .single();

    if (!data?.industry) {
      setShowIndustryOnboarding(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created successfully!');
    }

    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <MetaTags 
        title="Sign In - Palmer House Content OS"
        description="Access your Palmer House Productions content creation dashboard"
      />
      
      {showIndustryOnboarding && user && (
        <IndustrySelection
          open={showIndustryOnboarding}
          userId={user.id}
          onComplete={() => {
            setShowIndustryOnboarding(false);
            navigate('/dashboard');
          }}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to Content OS</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
