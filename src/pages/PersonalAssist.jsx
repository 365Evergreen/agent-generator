import React from 'react';

function PersonalAssist() {
  return (
    <div>
      <h1>Personal Assistant Agent</h1>
      <p>Automate personal tasks and workflows. Fill out the form below to generate a demo.</p>
      <form>
        <label>
          Company Name:
          <input type="text" name="companyName" />
        </label>
        <br />
        <label>
          Priorities:
          <input type="text" name="priorities" />
        </label>
        <br />
        <label>
          Your Name:
          <input type="text" name="userName" />
        </label>
        <br />
        <button type="submit">Generate Demo</button>
      </form>
    </div>
  );
}

export default PersonalAssist;