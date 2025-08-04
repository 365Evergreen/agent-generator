import React, { useState } from 'react';

function LeadGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [leadType, setLeadType] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [demoResult, setDemoResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

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
  };

  return (
    <div className="page-container">
      <h1>Lead Generator</h1>
      <p>Generate and follow up on leads automatically. Fill out the form below to generate a demo.</p>
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
          Lead Type:
          <input 
            type="text" 
            name="leadType" 
            value={leadType}
            onChange={(e) => setLeadType(e.target.value)}
            placeholder="e.g., Enterprise B2B, SMB, SaaS prospects"
            required
          />
        </label>
        <br />
        <label>
          Contact Email:
          <input 
            type="email" 
            name="contactEmail" 
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
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

export default LeadGenerator;