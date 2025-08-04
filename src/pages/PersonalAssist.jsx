import React, { useState } from 'react';

function PersonalAssist() {
  const [companyName, setCompanyName] = useState('');
  const [priorities, setPriorities] = useState('');
  const [userName, setUserName] = useState('');
  const [demoResult, setDemoResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // This is a placeholder for the actual API call.
    // In a real application, you would fetch the prompt from Dataverse,
    // populate it with the form data, and then send it to the generation service.
    const response = await fetch('/api/generate-demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyName, priorities, userName }),
    });

    const result = await response.text();
    setDemoResult(result);
  };

  return (
    <div>
      <h1>Personal Assistant Agent</h1>
      <p>Automate personal tasks and workflows. Fill out the form below to generate a demo.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input type="text" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <br />
        <label>
          Priorities:
          <input type="text" name="priorities" value={priorities} onChange={(e) => setPriorities(e.target.value)} />
        </label>
        <br />
        <label>
          Your Name:
          <input type="text" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Generate Demo</button>
      </form>
      {demoResult && (
        <div>
          <h2>Demo Result</h2>
          <p>{demoResult}</p>
        </div>
      )}
    </div>
  );
}

export default PersonalAssist;