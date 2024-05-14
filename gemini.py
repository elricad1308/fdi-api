import sys
from vertexai.generative_models import GenerativeModel

if __name__ == '__main__':
  prompt = sys.argv[1]

  model = GenerativeModel('gemini-1.0-pro')

  respuesta = model.generate_content(prompt)

  print(respuesta.text)
  