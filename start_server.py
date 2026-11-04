"""
NEXUS Tech Summit 2027 - Local Development Server
Launches a simple, zero-dependency Python HTTP server to view the website locally.
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
        print("=" * 60)
        print(f"  NEXUS Event Website is running at: {url}")
        print(f"  - Main Event Page:      {url}/index.html")
        print(f"  - Attendee Pass/Badge:  {url}/pass.html")
        print(f"  - Organizer Dashboard:  {url}/admin.html")
        print("=" * 60)
        print("Press Ctrl+C to stop the server.")
        
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
