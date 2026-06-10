#!/usr/bin/env python3
"""Local dev server that mirrors Vercel's cleanUrls behavior:
/privacy resolves to privacy.html, /terms to terms.html, etc."""
import http.server
import os


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        fs_path = super().translate_path(path)
        if not os.path.exists(fs_path):
            candidate = fs_path.rstrip('/') + '.html'
            if os.path.exists(candidate):
                return candidate
        return fs_path


if __name__ == '__main__':
    http.server.test(HandlerClass=CleanURLHandler, port=4173)
