"""
EventFlow AI & EventrixControl - Local Server Launcher
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 65)
        print(f"  EventFlow AI Platform is live at: {url}")
        print(f"  - Home Landing Page:           {url}/index.html")
        print(f"  - EventrixControl SaaS Suite:  {url}/app.html")
        print("=" * 65)
        print("Press Ctrl+C to terminate the server.")
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run()
