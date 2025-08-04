import React from 'react';

function LeadGenerator() {
  return (
    <div>
      <h1>Lead Generator</h1>
      <p>Generate and follow up on leads automatically. Fill out the form below to generate a demo.</p>
      <form>
        <label>
          Company Name:
          <input type="text" name="companyName" />
        </label>
        <br />
        <label>
          Lead Type:
          <input type="text" name="leadType" />
        </label>
        <br />
        <label>
          Contact Email:
          <input type="email" name="contactEmail" />
        </label>
        <br />
        <button type="submit">Generate Demo</button>
      </form>
    </div>
  );
}

export default LeadGenerator;