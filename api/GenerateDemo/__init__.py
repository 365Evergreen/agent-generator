import logging
import azure.functions as func
import json
import os
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

# Placeholder for Dataverse URL and credentials
DATAVERSE_URL = os.environ.get("DATAVERSE_URL")
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
TENANT_ID = os.environ.get("TENANT_ID")

def get_access_token():
    """Obtains an OAuth 2.0 access token for Dataverse."""
    # This is a simplified placeholder. In a real scenario, you'd use MSAL or similar.
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

def get_dataverse_record(entity_name, record_id, access_token):
    """Fetches a record from Dataverse."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Accept": "application/json",
    }
    response = requests.get(f"{DATAVERSE_URL}/api/data/v9.2/{entity_name}({record_id})", headers=headers)
    response.raise_for_status()
    return response.json()

def create_dataverse_record(entity_name, data, access_token):
    """Creates a record in Dataverse."""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
        "Accept": "application/json",
    }
    response = requests.post(f"{DATAVERSE_URL}/api/data/v9.2/{entity_name}", headers=headers, data=json.dumps(data))
    response.raise_for_status()
    return response.json()

@app.route(route="GenerateDemo")
def GenerateDemo(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse(
             "Please pass a JSON body with companyName, priorities, and userName.",
             status_code=400
        )

    company_name = req_body.get('companyName')
    priorities = req_body.get('priorities')
    user_name = req_body.get('userName')
    agent_requested = req_body.get('agentRequested', 'Personal Assistant Agent') # Assuming a default or passed from frontend

    if not all([company_name, priorities, user_name]):
        return func.HttpResponse(
            "Please pass companyName, priorities, and userName in the request body.",
            status_code=400
        )

    try:
        # 1. Get Access Token
        access_token = get_access_token()
        logging.info("Successfully obtained Dataverse access token.")

        # 2. Simulate fetching prompt from Dataverse (e.g., based on agent_requested)
        # In a real scenario, you'd query e365_prompt based on e365_agent
        # For this demo, we'll use a hardcoded prompt structure
        prompt_template = f"As a {agent_requested} for {company_name}, your top priorities are {priorities}. Please generate a demo for {user_name}."
        generated_prompt = prompt_template.format(
            company_name=company_name,
            priorities=priorities,
            user_name=user_name
        )
        logging.info(f"Generated Prompt: {generated_prompt}")

        # 3. Store client registration in Dataverse
        contact_submission_data = {
            "e365_name": f"{user_name} - {company_name}",
            "e365_firstname": user_name.split(" ")[0] if user_name else "",
            "e365_surname": user_name.split(" ")[1] if user_name and len(user_name.split(" ")) > 1 else "",
            "e365_companyname": company_name,
            "e365_agentrequested": agent_requested,
            # Add other fields like email, phone if available from frontend
        }
        create_dataverse_record("e365_contactformsubmissions", contact_submission_data, access_token)
        logging.info("Successfully created contact form submission in Dataverse.")

        # 4. Generate Demo Response
        demo_response = f"Demo for {agent_requested} generated for {user_name} at {company_name} with priorities: {priorities}. Prompt used: \"{generated_prompt}\"."

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