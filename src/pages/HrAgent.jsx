import React, { useState } from 'react';

function HrAgent() {
  const [companyName, setCompanyName] = useState('');
  const [hrTask, setHrTask] = useState('');
  const [contactName, setContactName] = useState('');
  const [demoResult, setDemoResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Mock API response for demo purposes
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
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
- Self-service portal for common HR requests
- Automated leave and time-off management
- Benefits enrollment and changes
- Employee survey and feedback collection

✅ Analytics & Insights
- Employee engagement metrics
- Turnover risk prediction
- Performance trend analysis
- HR process efficiency tracking

📊 Expected Outcomes:
- 50% reduction in administrative tasks
- 30% faster onboarding process
- 90% compliance rate improvement
- 25% increase in employee satisfaction

🚀 Your HR agent is configured to transform people operations at ${companyName}!

Specialized Focus: ${hrTask}
Primary Contact: ${contactName}

Note: This is a demo response. The actual system would integrate with your HRIS and company systems.`;

    setDemoResult(mockResult);
  };

  return (
    <div className="page-container">
      <h1>Human Resources Agent</h1>
      <p>Streamline HR processes and employee management. Fill out the form below to generate a demo.</p>
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
          HR Task:
          <input 
            type="text" 
            name="hrTask" 
            value={hrTask}
            onChange={(e) => setHrTask(e.target.value)}
            placeholder="e.g., Employee onboarding, Performance reviews, Compliance tracking"
            required
          />
        </label>
        <br />
        <label>
          Contact Name:
          <input 
            type="text" 
            name="contactName" 
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
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

export default HrAgent;