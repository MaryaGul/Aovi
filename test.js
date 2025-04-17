const fs = require('fs');
const path = require('path');

// Чтение файла .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = fs.existsSync(envPath) ? 
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(line => line.trim() !== '' && !line.startsWith('#'))
    .reduce((acc, line) => {
      const [key, ...values] = line.split('=');
      acc[key] = values.join('=').replace(/^["']|["']$/g, '');
      return acc;
    }, {}) : {};

// Установка переменных окружения
Object.entries(envConfig).forEach(([key, value]) => {
  process.env[key] = value;
});

const token = process.env.FRIENDLI_TOKEN

const headers = {
  "Authorization": "Bearer " + token,
  "Content-Type": "application/json",
}

const body = {
  "model": "rlzd9p8614k8",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "image_url",
          "image_url": {
            "url": "https://d1tzzyhq8brlcn.cloudfront.net/3f57c0a024c84395b24fbd37a2443ff3?response-content-disposition=attachment%253B%2520filename%253D%25221.jpg%2522%253B%2520filename%252A%253DUTF-8%2527%2527%25221.jpg%2522&Expires=1744897774&Signature=Q~fvBqFCagHFJcu8k032zT2lui43Zp7cYKfMXzCEBe5Ib6E8RO11rhlpDV9ccYvkxtutvYVfsHv7--lZkePdrytjcWjpwtZ2hKley~ScgOLVG5gTLak3n30jeQX0yfknorpODIgaJprdnjLs-VGKKam79AtSm2qC2h76kLd~ft1TBJB9ZlqrKcTjPoyLdUryMYtI4-BOEnPxrbhTo~NI0zVzhEougQ1KWNfTCc9LIsc0tox2KxIABpYfxcr95ZyY~qbtKjzUiE~aSCq-V6v-8BzLVTVfx0fA8GjyAg5li6mVkxlgor-BcFKcIRVIQ6hNGyZAdBfFBQ2bjfuGM~P9KA__&Key-Pair-Id=K2K8TQ4L1M34I0"
          }
        },
        {
          "type": "text",
          "text": "Опиши картинку на английском"
        }
      ]
    }
  ],
  "max_tokens": 16384,
  "top_p": 0.8,
  "stream": true,
  "stream_options": {
    "include_usage": true
  }
}

fetch("https://api.friendli.ai/dedicated/v1/chat/completions", {
  method: "POST",
  headers,
  body: JSON.stringify(body)
}).then(response => response.text())
  .then(response => console.log(response))
  .catch(err => console.error(err));