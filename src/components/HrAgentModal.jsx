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
