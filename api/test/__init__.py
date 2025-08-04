import azure.functions as func
import json
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    return func.HttpResponse(
        json.dumps({"message": "Hello from Azure Functions!", "status": "working"}),
        mimetype="application/json",
        status_code=200
    )
