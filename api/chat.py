from http.server import BaseHTTPRequestHandler
import json
import os
from openai import OpenAI

# 从环境变量获取API密钥
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        try:
            # 调用OpenAI API
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                store=True,
                messages=[{
                    "role": "user",
                    "content": data['message']
                }]
            )
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "reply": response.choices[0].message.content
            }).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": str(e)
            }).encode())
