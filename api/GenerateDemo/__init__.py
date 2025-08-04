import azure.functions as func
import json
import logging
import os
import requests

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    # Dataverse configuration
    DATAVERSE_URL = os.environ.get("DATAVERSE_URL")
    CLIENT_ID = os.environ.get("CLIENT_ID")
    CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
    TENANT_ID = os.environ.get("TENANT_ID")

    def get_access_token():
        """Obtains an OAuth 2.0 access token for Dataverse."""
        token_url = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {
            "client_id": CLIENT_ID,
            "scope": f"{DATAVERSE_URL}/.default",
            "client_secret": CLIENT_SECRET,
            "grant_type": "client_credentials",
        }
        response = requests.post(token_url, headers=headers, data=data)
        response.raise_for_status()
        return response.json()["access_token"]

    def create_dataverse_record(entity_name, data, access_token):
        """Creates a record in Dataverse."""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        response = requests.post(f"{DATAVERSE_URL}/api/data/v9.2/{entity_name}", headers=headers, data=json.dumps(data))
        response.raise_for_status()
        return response.json()

    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse(
             "Please pass a JSON body with required fields.",
             status_code=400
        )

    company_name = req_body.get('companyName')
    agent_requested = req_body.get('agentRequested', 'Personal Assistant Agent')
    
    # Handle different field names from different modals
    user_name = req_body.get('userName')
    contact_name = req_body.get('contactName')
    priorities = req_body.get('priorities')
    lead_type = req_body.get('leadType')
    contact_email = req_body.get('contactEmail')
    hr_task = req_body.get('hrTask')
    
    # Use the appropriate name field
    name_field = user_name or contact_name or "Unknown"
    
    # Create a description based on the agent type
    if agent_requested == 'Personal Assistant Agent':
        description = priorities or "General automation"
    elif agent_requested == 'Lead Generator Agent':
        description = f"Lead Type: {lead_type}" if lead_type else "Lead generation"
    elif agent_requested == 'HR Agent':
        description = hr_task or "HR automation"
    else:
        description = "General service"

    if not company_name:
        return func.HttpResponse(
            "Please pass companyName in the request body.",
            status_code=400
        )

    try:
        # 1. Get Access Token
        access_token = get_access_token()
        logging.info("Successfully obtained Dataverse access token.")

        # 2. Generate prompt
        prompt_template = f"As a {agent_requested} for {company_name}, focusing on {description}. Please generate a demo for {name_field}."
        generated_prompt = prompt_template

        logging.info(f"Generated Prompt: {generated_prompt}")

        # 3. Store client registration in Dataverse
        contact_submission_data = {
            "e365_name": f"{name_field} - {company_name}",
            "e365_firstname": name_field.split(" ")[0] if name_field else "",
            "e365_surname": name_field.split(" ")[1] if name_field and len(name_field.split(" ")) > 1 else "",
            "e365_companyname": company_name,
            "e365_agentrequested": agent_requested,
        }
        
        # Add email if provided
        if contact_email:
            contact_submission_data["e365_email"] = contact_email
            
        create_dataverse_record("e365_contactformsubmission", contact_submission_data, access_token)
        logging.info("Successfully created contact form submission in Dataverse.")

        # 4. Generate Demo Response
        demo_response = f"Demo for {agent_requested} generated for {name_field} at {company_name} focusing on: {description}. Prompt used: \"{generated_prompt}\"."

        return func.HttpResponse(
            json.dumps({"message": demo_response, "prompt": generated_prompt}),
            mimetype="application/json",
            status_code=200
        )

    except requests.exceptions.RequestException as e:
        logging.error(f"Dataverse API error: {e}")
        return func.HttpResponse(
            f"Error communicating with Dataverse: {e}",
            status_code=500
        )
    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")
        return func.HttpResponse(
            f"An unexpected error occurred: {e}",
            status_code=500
        )