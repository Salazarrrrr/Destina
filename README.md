# 🌍 Destina – Smart Travel Recommendation Platform

Destina is a web application designed to help users discover personalized travel destinations and plans using Artificial Intelligence.  
Users can describe the kind of experience they want (e.g., “I want to travel somewhere sunny and relaxing on a budget”), and Destina will generate smart recommendations — including destinations, activities, and estimated expenses.

---

## 🧩 Features

- 🧭 **AI-based Recommendations:** Generates personalized destinations and itineraries based on free-text input.  
- 💡 **Search by Budget & Destination:** Allows users to filter results by price range or location.  
- 💾 **Save Favorite Places:** Store your favorite recommendations.  
- 🕓 **View Search History:** Access previously generated suggestions.  
- 👥 **Group Planning (in progress):** Plan trips with friends or teams.  
- 💬 **Lead Capture Form:** Collects contact information for follow-up or newsletters.  
- ⚡ **Responsive Design:** Works seamlessly on desktop and mobile devices.  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | [Next.js 14](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) |
| **Backend** | [Django 5](https://www.djangoproject.com/) (Python 3.12) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **AI Integration** | External API (Gemini API) |

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Salazarrrrr/Destina.git
cd Destina
```

---

### 2. Backend Setup (Django)

#### 📦 Create and activate a virtual environment

```bash
python -m venv venv
source venv/bin/activate      # macOS / Linux
venv\Scripts\activate         # Windows
```

#### 📚 Install dependencies

```bash
pip install -r requirements.txt
```

*(If `requirements.txt` doesn’t exist yet, generate it with:)*  
```bash
pip freeze > requirements.txt
```

#### ⚙️ Run database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 🚀 Start the Django development server

```bash
python manage.py runserver
```

Your backend will be available at **http://localhost:8000/**

---

### 3. Frontend Setup (Next.js)

#### 📦 Install Node.js dependencies

```bash
cd frontend
npm install
```

#### 🧠 Run the development server

```bash
npm run dev
```

Frontend will run on **http://localhost:3000/**

---


### 4. Environment Variables

Create a `.env` file in the main folder of the cloned project

#### Example (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_AI_KEY=your_openai_api_key
```

*(Never commit your `.env` files to GitHub.)*

---

## 🧱 Project Structure

```
Destina/
│
├── backend/                # Django backend
│   ├── manage.py
│   ├── app/                # Core application logic
│   ├── templates/          # Optional HTML templates
│   └── ...
│
├── frontend/               # Next.js frontend
│   ├── pages/
│   ├── components/
│   ├── public/
│   └── ...
│
├── requirements.txt
├── package.json
├── README.md
└── .env.example
```

---

## 🧪 Running Both Servers Concurrently

You can run both frontend and backend simultaneously using two terminals:

**Terminal 1:**
```bash
cd backend
python manage.py runserver
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

Then open **http://localhost:3000/** in your browser.

---

## 🧰 Common Issues

| Problem | Solution |
|----------|-----------|
| `ModuleNotFoundError` in Django | Activate virtual environment and reinstall dependencies. |
| CORS Error when connecting frontend → backend | Add `django-cors-headers` to your backend and configure `CORS_ALLOWED_ORIGINS`. |
| AI API not responding | Check your API key and usage limits. |

---

## 🚀 Deployment

- **Frontend (Vercel):**  
  Just connect your GitHub repo and set `NEXT_PUBLIC_API_URL` in Vercel’s environment variables.  

- **Backend (Render/Heroku):**  
  Push your code and set environment variables from `.env`.  
  Ensure `DATABASE_URL` points to your production PostgreSQL instance.

---


## 🧑‍💻 Team Members

Esteban Salazar

Emmanuel Castañeda

Samuel Daza

Daniel Viana

Jean Paul Guillot

---

## 📹 Demo Video

🎥 [YouTube Demo Link]
