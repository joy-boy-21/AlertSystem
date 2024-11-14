from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = ""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_suggestions', methods=['POST'])
def get_suggestions():
    symptoms = request.json.get('symptoms', [])
    prompt = f"Based on the following symptoms related to gas exposure: {', '.join(symptoms)}, provide medical suggestions."
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    
    suggestions = response['choices'][0]['message']['content']
    return jsonify({'suggestions': suggestions})

if __name__ == "__main__":
    app.run(debug=True)
