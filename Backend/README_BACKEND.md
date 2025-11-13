Backend setup (Django)

1. Create and activate a virtual environment (Windows PowerShell):

   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

2. Upgrade pip and install requirements:

   python -m pip install --upgrade pip
   pip install -r requirements.txt

3. Run migrations and start dev server:

   python manage.py migrate
   python manage.py runserver

Notes:
- The project uses SQLite by default (`db.sqlite3` already exists).
- For production, set DEBUG=False and configure SECRET_KEY and ALLOWED_HOSTS via environment variables (use python-dotenv or similar).