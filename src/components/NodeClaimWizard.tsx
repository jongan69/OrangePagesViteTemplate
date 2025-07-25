import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  ArrowLeft,  
  ArrowRight,
  Check,
  Network,
  Key,
  Globe,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface NodeClaimWizardProps {
  onNavigate: (view: string, data?: unknown) => void;
}

export function NodeClaimWizard({ onNavigate }: NodeClaimWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Node Information
    nodeName: '',
    nodeAlias: '',
    nodeDescription: '',
    nodeLocation: '',
    
    // Step 2: Technical Details
    pubkey: '',
    ipAddress: '',
    port: '9735',
    torAddress: '',
    
    // Step 3: Verification
    signatureMessage: '',
    signature: '',
    
    // Step 4: Configuration
    acceptTOS: false,
    enablePublicListing: true,
    enableAutoUpdate: true,
    
    // Step 5: Final
    isComplete: false
  });

  const totalSteps = 5;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setFormData(prev => ({ ...prev, isComplete: true }));
    setTimeout(() => {
      onNavigate('node-profile', {
        id: Date.now(),
        name: formData.nodeName,
        alias: formData.nodeAlias,
        pubkey: formData.pubkey,
        status: 'Online',
        capacity: '₿0.00',
        channels: 0,
        uptime: '100%',
        location: formData.nodeLocation,
        isOwned: true
      });
    }, 2000);
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'pending';
  };

  const steps = [
    { title: 'Node Information', icon: Network },
    { title: 'Technical Details', icon: Key },
    { title: 'Verification', icon: Shield },
    { title: 'Configuration', icon: Globe },
    { title: 'Complete', icon: CheckCircle }
  ];

  if (formData.isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Node Claimed Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your Lightning Network node has been successfully claimed and is now active.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Node Name:</strong> {formData.nodeName}</p>
              <p><strong>Alias:</strong> {formData.nodeAlias}</p>
              <p><strong>Status:</strong> <Badge variant="default">Online</Badge></p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={() => onNavigate('dashboard')} variant="outline">
                Go to Dashboard
              </Button>
              <Button onClick={() => onNavigate('node-profile')}>
                View Node Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <h1 className="text-2xl font-bold mb-2">Claim Lightning Network Node</h1>
        <p className="text-muted-foreground">
          Register your Lightning Network node on Orange Pages
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            const StepIcon = step.icon;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${status === 'completed' ? 'bg-green-500 border-green-500 text-white' : 
                    status === 'current' ? 'bg-primary border-primary text-primary-foreground' : 
                    'bg-muted border-muted-foreground/20 text-muted-foreground'}
                `}>
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Provide basic information about your Lightning Network node"}
            {currentStep === 2 && "Enter technical details and connection information"}
            {currentStep === 3 && "Verify ownership of your node"}
            {currentStep === 4 && "Configure your node settings"}
            {currentStep === 5 && "Review and complete your node claim"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Node Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nodeName">Node Name *</Label>
                  <Input
                    id="nodeName"
                    placeholder="My Lightning Node"
                    value={formData.nodeName}
                    onChange={(e) => handleInputChange('nodeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nodeAlias">Node Alias *</Label>
                  <Input
                    id="nodeAlias"
                    placeholder="my-node"
                    value={formData.nodeAlias}
                    onChange={(e) => handleInputChange('nodeAlias', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeDescription">Description</Label>
                <Textarea
                  id="nodeDescription"
                  placeholder="Describe your Lightning Network node..."
                  value={formData.nodeDescription}
                  onChange={(e) => handleInputChange('nodeDescription', e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nodeLocation">Location</Label>
                <Select value={formData.nodeLocation} onValueChange={(value: string ) => handleInputChange('nodeLocation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east">United States (East)</SelectItem>
                    <SelectItem value="us-west">United States (West)</SelectItem>
                    <SelectItem value="eu-west">Europe (West)</SelectItem>
                    <SelectItem value="eu-central">Europe (Central)</SelectItem>
                    <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Technical Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pubkey">Public Key *</Label>
                <Input
                  id="pubkey"
                  placeholder="02a1b2c3d4e5f6789abcdef123456789..."
                  value={formData.pubkey}
                  onChange={(e) => handleInputChange('pubkey', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ipAddress">IP Address *</Label>
                  <Input
                    id="ipAddress"
                    placeholder="192.168.1.100"
                    value={formData.ipAddress}
                    onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="9735"
                    value={formData.port}
                    onChange={(e) => handleInputChange('port', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="torAddress">Tor Address (Optional)</Label>
                <Input
                  id="torAddress"
                  placeholder="abc123...xyz.onion"
                  value={formData.torAddress}
                  onChange={(e) => handleInputChange('torAddress', e.target.value)}
                />
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Connection Requirements</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ensure your node is accessible from the internet and has proper firewall configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Node Ownership Verification</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sign the following message with your node's private key to prove ownership.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Message to Sign</Label>
                <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                  orange-pages-claim-{Date.now()}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signature">Signature *</Label>
                <Textarea
                  id="signature"
                  placeholder="Paste your signature here..."
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Use your Lightning node's signing functionality to sign the message above.</p>
              </div>
            </div>
          )}

          {/* Step 4: Configuration */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTOS"
                    checked={formData.acceptTOS}
                    onCheckedChange={(checked) => handleInputChange('acceptTOS', checked)}
                  />
                  <Label htmlFor="acceptTOS" className="text-sm">
                    I accept the Terms of Service and Privacy Policy *
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enablePublicListing"
                    checked={formData.enablePublicListing}
                    onCheckedChange={(checked) => handleInputChange('enablePublicListing', checked)}
                  />
                  <Label htmlFor="enablePublicListing" className="text-sm">
                    Enable public listing in node explorer
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enableAutoUpdate"
                    checked={formData.enableAutoUpdate}
                    onCheckedChange={(checked) => handleInputChange('enableAutoUpdate', checked)}
                  />
                  <Label htmlFor="enableAutoUpdate" className="text-sm">
                    Enable automatic node information updates
                  </Label>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium">What happens next?</p>
                    <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                      <li>• Your node will be verified and added to the network</li>
                      <li>• You'll receive notifications about node status</li>
                      <li>• Your node will appear in the public explorer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Review Your Node Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Node Name:</span>
                    <span>{formData.nodeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alias:</span>
                    <span>{formData.nodeAlias}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{formData.nodeLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Public Key:</span>
                    <span className="font-mono">{formData.pubkey.substring(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span>{formData.ipAddress}:{formData.port}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Click "Claim Node" to complete the process and add your node to Orange Pages.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button 
            onClick={nextStep}
            disabled={
              (currentStep === 1 && (!formData.nodeName || !formData.nodeAlias)) ||
              (currentStep === 2 && (!formData.pubkey || !formData.ipAddress)) ||
              (currentStep === 3 && !formData.signature) ||
              (currentStep === 4 && !formData.acceptTOS)
            }
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Network className="w-4 h-4 mr-2" />
            Claim Node
          </Button>
        )}
      </div>
    </div>
  );
}