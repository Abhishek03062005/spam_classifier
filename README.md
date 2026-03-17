# 📧 Spam Email Classifier 

A machine learning-based **Spam Email Classifier** built using **FastAPI**.
This project predicts whether a given email/message is **Spam** or **Not Spam** with a confidence score.

---

## 🚀 Features

* Predicts **Spam / Not Spam**
* Returns **confidence score**
* Provides **confidence level**
* uses **Logistic Regression**

  * High
  * Medium
  * Low
* Built with **FastAPI (fast & production-ready)**

---

## 🛠 Tech Stack

* Python
* FastAPI
* Scikit-learn
* Pandas
* NumPy
* Pickle (model serialization)

---

## 📂 Project Structure

```
spam_classifier/
│── app.py                 # FastAPI app
│── pipeline.pkl          # Trained ML model
│── Spam_classifier.ipynb # Model training notebook
│── spam.csv              # Dataset
│── requirements.txt      # Dependencies
│── README.md
```

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/your-username/spam_classifier.git
cd spam_classifier
```

2. Install dependencies:

```
pip install -r requirements.txt
```

---

## ▶️ Run the Application

```
python app.py
```

OR using uvicorn:

```
uvicorn app:app --host 0.0.0.0 --port 10000
```

---

## 🌐 API Endpoints

### 1. Home

```
GET /
```

Response:

```
{
  "message": "API running"
}
```

---

### 2. Predict Spam

```
POST /predict
```

#### Request Body:

```
{
  "text": "Congratulations! You won a free prize"
}
```

#### Response:

```
{
  "prediction": "Spam",
  "Confidence": 0.95,
  "Confidence_level": "High Confidence!"
}
```

---

## 📊 How It Works

* Text input is passed to a **trained ML pipeline**
* Model predicts:

  * Spam (1)
  * Not Spam (0)
* Also returns probability → used as **confidence score**

---

## ⚠️ Notes

* Do not delete `pipeline.pkl` (required for predictions)
* Make sure `requirements.txt` is properly filled
* Input text should not be empty

---

## 🌍 Deployment

This project can be deployed on:

* Render
* Railway
* Hugging Face Spaces

---

## 📌 Future Improvements

* Add frontend UI
* Improve model accuracy
* Add real-time email integration

---

## 👨‍💻 Author

Abhishek Kumar

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
