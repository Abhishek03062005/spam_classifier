from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pickle
import os

model=pickle.load(open("pipeline.pkl","rb"))
app=FastAPI()

# Serve static assets (CSS, JS, images)
static_dir = os.path.join(os.path.dirname(__file__), "static")
app.mount("/static", StaticFiles(directory=static_dir), name="static")

class EmailRequest(BaseModel):
    text:str

@app.get("/")
def home():
    return FileResponse(os.path.join(static_dir, "index.html"))
@app.post("/predict")
def predict_email(data:EmailRequest):
    if not data.text.strip():
        return {"Error":"Empty input"}
    prediction=model.predict([data.text])[0]
    probability=model.predict_proba([data.text])[0].max()
    confidence=float(probability)
    if confidence>0.9:
        level="High Confidence!"
    elif confidence>0.7:
        level="Medium Confidence!"
    else:
        level="Low Confidence!"
    return {"prediction":"Spam" if prediction==1 else "Not Spam","Confidence":float(probability),"Confidence_level":level}
import uvicorn
if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=10000)