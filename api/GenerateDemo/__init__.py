import azure.functions as func
import json
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
        logging.info(f'Request body: {req_body}')
    except ValueError:
        return func.HttpResponse(
             "Please pass a JSON body with required fields.",
             status_code=400
        )

    company_name = req_body.get('companyName', 'Test Company')
    agent_requested = req_body.get('agentRequested', 'Test Agent')
    
    # Simple response for testing
    response_data = {
        "message": f"Demo generated for {company_name}",
        "prompt": f"Test prompt for {agent_requested}",
        "status": "success"
    }

    return func.HttpResponse(
        json.dumps(response_data),
        mimetype="application/json",
        status_code=200
    )