from motor.motor_asyncio import AsyncIOMotorClient

# MongoDB connection setup
MONGO_DETAILS = "mongodb+srv://agamarora456:agamarora456@cluster0.1kvpu.mongodb.net"  # Update with your MongoDB connection details

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client['fruits_faq_db']
faq_collection = database.get_collection('faqs')
