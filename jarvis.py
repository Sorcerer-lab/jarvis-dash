import openai
import pyttsx3
import speech_recognition as sr
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

engine = pyttsx3.init()
engine.setProperty('rate', 170)

def speak(text):
    print(f"JARVIS: {text}")
    engine.say(text)
    engine.runAndWait()

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎧 Listening...")
        audio = r.listen(source)
    try:
        command = r.recognize_google(audio)
        return command
    except:
        return "Sorry, I didn’t catch that."

def ask_gpt(prompt):
    print(f"🔍 You said: {prompt}")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "user",
            "content": prompt
        }]
    )
    answer = response['choices'][0]['message']['content']
    return answer.strip()

while True:
    user_input = listen()
    if "shutdown" in user_input.lower():
        speak("Shutting down. Goodbye, Sorcerer.")
        break
    response = ask_gpt(user_input)
    speak(response)
