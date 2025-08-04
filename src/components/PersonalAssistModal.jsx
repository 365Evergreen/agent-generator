import React, { useState } from 'react';

function PersonalAssistModal() {
  const [companyName, setCompanyName] = useState('');
  const [priorities, setPriorities] = useState('');
  const [userName, setUserName] = useState('');
  const [demoResult, setDemoResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Mock API response for demo purposes
    // In a real application, you would fetch the prompt from Dataverse,
    // populate it with the form data, and then send it to the generation service.
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResult = `🤖 Personal Assistant Agent Demo for ${companyName}

Hello ${userName}! Based on your priorities: "${priorities}", here's your personalized AI assistant configuration:

✅ Automated Task Management
- Daily priority scheduling based on "${priorities}"
- Smart calendar integration
- Deadline tracking and reminders

✅ Workflow Automation  
- Email categorization and response suggestions
- Meeting preparation and follow-up
- Document organization for ${companyName}

✅ Personal Productivity
- Time blocking optimization
- Focus time protection
- Progress tracking for key priorities

🚀 Your assistant is ready to help streamline your workflows and boost productivity at ${companyName}!

Note: This is a demo response. The actual system would integrate with your company's tools and data sources.`;

    setDemoResult(mockResult);
    setIsLoading(false);
  };

  const resetForm = () => {
    setCompanyName('');
    setPriorities('');
    setUserName('');
    setDemoResult('');
    setIsLoading(false);
  };

  return (
    <div className="modal-form-container">
      <p>Automate personal tasks and workflows. Fill out the form below to generate a demo.</p>
      
      {!demoResult ? (
        <form onSubmit={handleSubmit}>
          <label>
            Company Name:
            <input 
              type="text" 
              name="companyName" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)}
              required 
              disabled={isLoading}
            />
          </label>
          
          <label>
            Priorities:
            <input 
              type="text" 
              name="priorities" 
              value={priorities} 
              onChange={(e) => setPriorities(e.target.value)}
              placeholder="e.g., Email management, Meeting scheduling, Task prioritization"
              required 
              disabled={isLoading}
            />
          </label>
          
          <label>
            Your Name:
            <input 
              type="text" 
              name="userName" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)}
              required 
              disabled={isLoading}
            />
          </label>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Demo...' : 'Generate Demo'}
          </button>
        </form>
      ) : (
        <div>
          <div className="demo-result">
            <h3>Demo Result</h3>
            <pre>{demoResult}</pre>
          </div>
          <button onClick={resetForm} className="btn-secondary">
            Generate Another Demo
          </button>
        </div>
      )}
    </div>
  );
}

export default PersonalAssistModal;
