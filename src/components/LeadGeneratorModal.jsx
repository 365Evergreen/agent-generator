import React, { useState } from 'react';

function LeadGeneratorModal() {
  const [companyName, setCompanyName] = useState('');
  const [leadType, setLeadType] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [demoResult, setDemoResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Mock API response for demo purposes
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockResult = `🎯 Lead Generator Agent Demo for ${companyName}

Lead Generation Configuration:
- Target Type: ${leadType}
- Contact: ${contactEmail}

✅ Automated Lead Discovery
- Industry-specific prospect identification
- Social media lead mining
- Website visitor tracking and qualification

✅ Engagement Automation
- Personalized outreach sequences
- Follow-up scheduling based on lead behavior
- Multi-channel communication (email, LinkedIn, phone)

✅ Lead Qualification
- Automated scoring based on ${leadType} criteria
- BANT (Budget, Authority, Need, Timeline) assessment
- CRM integration and data enrichment

✅ Performance Analytics
- Conversion rate tracking
- ROI analysis for different lead sources
- A/B testing for outreach messages

📈 Projected Results:
- 40% increase in qualified leads
- 60% reduction in manual prospecting time
- 25% improvement in conversion rates

🚀 Your lead generation system is ready to scale your sales pipeline for ${companyName}!

Note: This is a demo response. The actual system would integrate with your CRM and sales tools.`;

    setDemoResult(mockResult);
    setIsLoading(false);
  };

  const resetForm = () => {
    setCompanyName('');
    setLeadType('');
    setContactEmail('');
    setDemoResult('');
    setIsLoading(false);
  };

  return (
    <div className="modal-form-container">
      <p>Generate and follow up on leads automatically. Fill out the form below to generate a demo.</p>
      
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
            Lead Type:
            <input 
              type="text" 
              name="leadType" 
              value={leadType}
              onChange={(e) => setLeadType(e.target.value)}
              placeholder="e.g., Enterprise B2B, SMB, SaaS prospects"
              required
              disabled={isLoading}
            />
          </label>
          
          <label>
            Contact Email:
            <input 
              type="email" 
              name="contactEmail" 
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
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

export default LeadGeneratorModal;
