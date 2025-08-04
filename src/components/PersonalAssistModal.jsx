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

    try {
      // Call the Azure Function API
      const response = await fetch('/api/GenerateDemo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          companyName: companyName,
          priorities: priorities,
          userName: userName,
          agentRequested: 'Personal Assistant Agent'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Create a formatted demo result
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

Generated Prompt: "${result.prompt}"

✅ Submission recorded successfully in Dataverse!
Note: This submission has been saved to the database for follow-up.`;

      setDemoResult(mockResult);
    } catch (error) {
      console.error('Error calling API:', error);
      
      // Fallback to mock response if API fails
      const fallbackResult = `🤖 Personal Assistant Agent Demo for ${companyName}

Hello ${userName}! Based on your priorities: "${priorities}", here's your personalized AI assistant configuration:

⚠️ Note: Could not connect to database. This is a demo response only.

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

🚀 Your assistant would be ready to help streamline your workflows and boost productivity at ${companyName}!

Error: ${error.message}`;

      setDemoResult(fallbackResult);
    }
    
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
