import speech_recognition as sr
import pyttsx3
import random

quotes = [
    "Sometimes you gotta run before you can walk. – Tony Stark",
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "I am Iron Man.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "Your focus determines your reality."
]

# Initialize voice engine
engine = pyttsx3.init()
engine.setProperty('rate', 170)
engine.setProperty('volume', 1.0)

def speak(text):
    print(f"🗣️ JARVIS: {text}")
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎧 Listening...")
        audio = recognizer.listen(source)
    try:
        command = recognizer.recognize_google(audio).lower()
        print(f"🎙️ You said: {command}")
        return command
    except sr.UnknownValueError:
        return "I didn't catch that."
    except sr.RequestError:
        return "Speech recognition service unavailable."

def run_jarvis():
    command = listen()
    if "inspire me" in command or "motivate me" in command:
        speak(random.choice(quotes))
    elif "hello" in command:
        speak("Hello, Sorcerer.")
    elif "shutdown" in command:
        speak("Shutting down.")
        exit()
    else:
        speak("Command not recognized.")

if __name__ == "__main__":
    while True:
        run_jarvis()
