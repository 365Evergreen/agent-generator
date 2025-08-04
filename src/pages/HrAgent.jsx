import React from 'react';

function HrAgent() {
  return (
    <div>
      <h1>Human Resources Agent</h1>
      <p>Streamline HR processes and employee management. Fill out the form below to generate a demo.</p>
      <form>
        <label>
          Company Name:
          <input type="text" name="companyName" />
        </label>
        <br />
        <label>
          HR Task:
          <input type="text" name="hrTask" />
        </label>
        <br />
        <label>
          Contact Name:
          <input type="text" name="contactName" />
        </label>
        <br />
        <button type="submit">Generate Demo</button>
      </form>
    </div>
  );
}

export default HrAgent;