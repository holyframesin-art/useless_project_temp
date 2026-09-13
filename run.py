"""
Malayalam Movie Roulette 💀 - One-Click Launcher
Starts the HTTP server (if not already running) and opens your browser automatically.
"""

import os
import sys
import time
import socket
import webbrowser
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8000
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT_DIR)

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def start_server():
    server = HTTPServer(('0.0.0.0', PORT), SimpleHTTPRequestHandler)
    print(f"[*] Serving Malayalam Movie Roulette at http://localhost:{PORT}")
    server.serve_forever()

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("  💀 MALAYALAM MOVIE ROULETTE 💀")
    print("  'Because apparently your taste in movies wasn't bad enough.'")
    print("=" * 60 + "\n")

    url = f"http://localhost:{PORT}/malayalam-movie-recommender/"

    if not is_port_in_use(PORT):
        print(f"[*] Starting local server on port {PORT}...")
        t = threading.Thread(target=start_server, daemon=True)
        t.start()
        time.sleep(0.6)
    else:
        print(f"[*] Server is already active on port {PORT}.")

    print(f"[*] Opening browser to {url} ...")
    webbrowser.open(url)
    print("[OK] Launched successfully! Press Ctrl+C in this terminal to stop.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[*] Exiting. Goodbye!")
