import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react'; 
import { Button } from './Button'; 
import { Input } from './Input';
import { Label } from './Label';
import { Alert, AlertDescription } from './Alert';
import { Card, CardHeader, CardContent, CardFooter } from './Card';


interface ConsentPopupProps {
  onAccept: () => void;
}

const ConsentText = () => {
  return (
    <div className="text-sm space-y-4 text-left">
      <p className="font-medium">
        YOU ARE ACCESSING A U.S. GOVERNMENT (USG) INFORMATION SYSTEM (IS) THAT IS 
        PROVIDED FOR USG-AUTHORIZED USE ONLY.
      </p>
      
      <p>
        By using this IS (which includes any device attached to this IS), you consent 
        to the following conditions:
      </p>
      
      <ul className="list-disc pl-6 space-y-2">
        <li>
          The USG routinely intercepts and monitors communications on this IS for 
          purposes including, but not limited to, penetration testing, COMSEC monitoring, 
          network operations and defense, personnel misconduct (PM), law enforcement (LE), 
          and counterintelligence (CI) investigations.
        </li>
        <li>
          At any time, the USG may inspect and seize data stored on this IS.
        </li>
        <li>
          Communications using, or data stored on, this IS are not private, are subject 
          to routine monitoring, interception, and search, and may be disclosed or used 
          for any USG-authorized purpose.
        </li>
      </ul>
    </div>
  );
};

const ConsentPopup: React.FC<ConsentPopupProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full bg-gray-800 text-gray-100">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">DoD Notice and Consent</h2>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <ConsentText />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button 
            onClick={onAccept}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
          >
            I Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface LoginFormProps {
  isEnabled: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isEnabled = true }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Simulated login - replace with actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        alert('Login successful!');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEnabled}
              required
              className="w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEnabled}
              required
              className="w-full"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!isEnabled}
            className="w-full"
          >
            Log In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const LoginPage: React.FC = () => {
  const [isConsentAccepted, setIsConsentAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {!isConsentAccepted && (
        <ConsentPopup onAccept={() => setIsConsentAccepted(true)} />
      )}
      <LoginForm isEnabled={isConsentAccepted} />
    </div>
  );
};

export default LoginPage;