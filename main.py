from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import json

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (frontend)
app.mount("/static", StaticFiles(directory="static"), name="static")

class TextRequest(BaseModel):
    text: str

# Mock trigram model (replace with your actual model)
def predict_next_word(text: str) -> List[str]:
    # This is a placeholder - replace with your actual trigram model logic
    mock_predictions = {
        "how are": ["you", "they", "we"],
        "i am": ["going", "happy", "tired"],
        "": ["the", "i", "what"]
    }
    return mock_predictions.get(text.lower().strip(), ["the", "and", "in"])

@app.post("/predict")
async def predict(request: TextRequest):
    if not request.text:
        return {"predictions": predict_next_word("")}
    
    try:
        predictions = predict_next_word(request.text)
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Next Word Recommendation API is running"} 