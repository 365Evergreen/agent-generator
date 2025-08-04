import React, { useState } from 'react';

function HrAgentModal() {
  const [companyName, setCompanyName] = useState('');
  const [hrTask, setHrTask] = useState('');
  const [contactName, setContactName] = useState('');
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
          contactName: contactName,
          hrTask: hrTask,
          agentRequested: 'HR Agent'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Create a formatted demo result
      const mockResult = `👥 HR Agent Demo for ${companyName}

Hello ${contactName}! Your HR automation solution for "${hrTask}" is ready:

✅ Employee Onboarding Automation
- Digital welcome packets and document collection
- Training schedule coordination
- IT equipment and access provisioning
- Buddy system assignment

✅ Performance Management
- Automated review scheduling and reminders
- Goal tracking and progress monitoring
- 360-feedback collection and analysis
- Development plan recommendations

✅ Compliance & Documentation
- Policy acknowledgment tracking
- Certification and training compliance
- Employee record management
- Audit trail maintenance

✅ Employee Experience
- Automated survey deployment and analysis
- Benefits enrollment assistance
- Leave request processing
- Employee self-service portal

✅ Talent Analytics
- Turnover prediction and retention strategies
- Skills gap analysis and training recommendations
- Recruitment pipeline optimization
- Compensation benchmarking

🎯 Focused Solution for: ${hrTask}
- Customized workflows for your specific HR needs
- Integration with existing HRIS systems
- Compliance with labor regulations
- Scalable across ${companyName}'s organization

🚀 Your HR automation system is ready to enhance employee experience and operational efficiency!

Generated Prompt: "${result.prompt}"

✅ Submission recorded successfully in Dataverse!
Note: This submission has been saved to the database for follow-up.`;

      setDemoResult(mockResult);
    } catch (error) {
      console.error('Error calling API:', error);
      
      // Fallback to mock response if API fails
      const fallbackResult = `👥 HR Agent Demo for ${companyName}

Hello ${contactName}! Your HR automation solution for "${hrTask}" is ready:

⚠️ Note: Could not connect to database. This is a demo response only.

✅ Employee Onboarding Automation
- Digital welcome packets and document collection
- Training schedule coordination
- IT equipment and access provisioning
- Buddy system assignment

✅ Performance Management
- Automated review scheduling and reminders
- Goal tracking and progress monitoring
- 360-feedback collection and analysis
- Development plan recommendations

✅ Compliance & Documentation
- Policy acknowledgment tracking
- Certification and training compliance
- Employee record management
- Audit trail maintenance

✅ Employee Experience
- Automated survey deployment and analysis
- Benefits enrollment assistance
- Leave request processing
- Employee self-service portal

✅ Talent Analytics
- Turnover prediction and retention strategies
- Skills gap analysis and training recommendations
- Recruitment pipeline optimization
- Compensation benchmarking

🎯 Focused Solution for: ${hrTask}
- Customized workflows for your specific HR needs
- Integration with existing HRIS systems
- Compliance with labor regulations
- Scalable across ${companyName}'s organization

🚀 Your HR automation system would be ready to enhance employee experience and operational efficiency!

Error: ${error.message}`;

      setDemoResult(fallbackResult);
    }
    
    setIsLoading(false);
  };

  const resetForm = () => {
    setCompanyName('');
    setHrTask('');
    setContactName('');
    setDemoResult('');
    setIsLoading(false);
  };

  return (
    <div className="modal-form-container">
      <p>Streamline HR processes and employee management. Fill out the form below to generate a demo.</p>
      
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
            HR Task:
            <input 
              type="text" 
              name="hrTask" 
              value={hrTask}
              onChange={(e) => setHrTask(e.target.value)}
              placeholder="e.g., Employee onboarding, Performance reviews, Compliance tracking"
              required
              disabled={isLoading}
            />
          </label>
          
          <label>
            Contact Name:
            <input 
              type="text" 
              name="contactName" 
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
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

export default HrAgentModal;
