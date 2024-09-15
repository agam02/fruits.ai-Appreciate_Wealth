from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all domains
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# MongoDB connection
client = AsyncIOMotorClient("mongodb+srv://agamarora456:agamarora456@cluster0.1kvpu.mongodb.net")
db = client.faqdb

# Pydantic model for FAQs
class FAQ(BaseModel):
    heading: str
    question: str
    answer: str
    image_url: Optional[str]

# Helper function to convert MongoDB ObjectId to string
def faq_helper(faq) -> dict:
    return {
        "id": str(faq["_id"]),
        "heading": faq["heading"],
        "question": faq["question"],
        "answer": faq["answer"],
        "image_url": faq.get("image_url", ""),
    }

# CRUD Operations

@app.get("/faqs", response_model=List[dict])
async def get_faqs():
    faqs = []
    async for faq in db.faqs.find():
        faqs.append(faq_helper(faq))
    return faqs

@app.get("/faqs/{id}", response_model=dict)
async def get_faq_by_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    faq_id = ObjectId(id)

    faq = await db.faqs.find_one({"_id": faq_id})
    
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    return faq_helper(faq)

@app.post("/faqs", response_model=dict)
async def create_faq(faq: FAQ):
    faq_dict = faq.dict()
    new_faq = await db.faqs.insert_one(faq_dict)
    created_faq = await db.faqs.find_one({"_id": new_faq.inserted_id})
    return faq_helper(created_faq)

@app.put("/faqs/{id}", response_model=dict)
async def update_faq(id: str, faq: FAQ):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    faq_id = ObjectId(id)

    existing_faq = await db.faqs.find_one({"_id": faq_id})
    if existing_faq is None:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    updated_faq = await db.faqs.update_one({"_id": faq_id}, {"$set": faq.dict()})
    if updated_faq.matched_count:
        updated_faq_data = await db.faqs.find_one({"_id": faq_id})
        return faq_helper(updated_faq_data)
    raise HTTPException(status_code=400, detail="Failed to update FAQ")

@app.delete("/faqs/{id}")
async def delete_faq(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    faq_id = ObjectId(id)
    
    result = await db.faqs.delete_one({"_id": faq_id})
    if result.deleted_count:
        return {"message": "FAQ deleted"}
    raise HTTPException(status_code=404, detail="FAQ not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
