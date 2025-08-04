import React, { useState } from 'react';

function PersonalAssist() {
  const [companyName, setCompanyName] = useState('');
  const [priorities, setPriorities] = useState('');
  const [userName, setUserName] = useState('');
  const [demoResult, setDemoResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
  };

  return (
    <div className="page-container">
      <h1>Personal Assistant Agent</h1>
      <p>Automate personal tasks and workflows. Fill out the form below to generate a demo.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input 
            type="text" 
            name="companyName" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)}
            required 
          />
        </label>
        <br />
        <label>
          Priorities:
          <input 
            type="text" 
            name="priorities" 
            value={priorities} 
            onChange={(e) => setPriorities(e.target.value)}
            placeholder="e.g., Email management, Meeting scheduling, Task prioritization"
            required 
          />
        </label>
        <br />
        <label>
          Your Name:
          <input 
            type="text" 
            name="userName" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            required 
          />
        </label>
        <br />
        <button type="submit">Generate Demo</button>
      </form>
      {demoResult && (
        <div className="demo-result">
          <h2>Demo Result</h2>
          <pre>{demoResult}</pre>
        </div>
      )}
    </div>
  );
}

export default PersonalAssist;