import os
import requests
import pyttsx3
import speech_recognition as sr
from dotenv import load_dotenv
from openai import OpenAI


# 🔐 Load environment variables
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 🗣️ Initialize TTS engine
engine = pyttsx3.init()
engine.setProperty('rate', 170)

def speak(text):
    print(f"\n🧠 JARVIS: {text}")
    engine.say(text)
    engine.runAndWait()

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n🎧 Listening...")
        audio = r.listen(source)
    try:
        command = r.recognize_google(audio)
        print(f"🗣️ You said: {command}")
        return command
    except Exception as e:
        print("⚠️ Error: ", e)
        return "Sorry, I didn’t catch that."


def ask_gpt(prompt):
    response = requests.post("http://localhost:1234/v1/chat/completions", json={
        "model": "mistral-7b-v0.1-layla-v4-chatml",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.5,
        "max_tokens": 200
    })

    return response.json()['choices'][0]['message']['content'].strip()


# 🔁 Voice loop
while True:
    user_input = listen()
    if "shutdown" in user_input.lower():
        speak("Shutting down. Goodbye, Sorcerer.")
        break
    gpt_response = ask_gpt(user_input)
    speak(gpt_response)
