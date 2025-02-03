# Next Word Recommendation App

A full-stack web application that provides next word recommendations using a trigram language model.

## Setup and Running

1. Install required Python packages:
   ```bash
   pip install fastapi uvicorn
   ```

2. Project structure:
   ```
   project/
   ├── main.py
   ├── static/
   │   ├── index.html
   │   ├── styles.css
   │   └── script.js
   └── README.md
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

4. Open your browser and navigate to:
   - Frontend: http://localhost:8000/static/index.html
   - API documentation: http://localhost:8000/docs

## Features

- Real-time next word predictions
- Simple and intuitive user interface
- Click on suggestions to append them to your text
- Responsive design

## Notes

- The current implementation uses a mock trigram model. Replace the `predict_next_word()` function in `main.py` with your actual trigram model implementation.
- For production deployment, configure CORS settings appropriately in `main.py`. 