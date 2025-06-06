const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const aiResult = document.getElementById('aiResult');

// カメラ起動
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// 撮影して解析
captureBtn.onclick = async () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  const dataUrl = canvas.toDataURL('image/jpeg');

  aiResult.textContent = '解析中...';

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your_openai_api_key_here',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'この画像に写っているものを日本語で簡単に説明してください。' },
            { type: 'image_url', image_url: { url: dataUrl } }
          ]
        }
      ],
      max_tokens: 100
    })
  });

  const result = await res.json();
  const content = result.choices?.[0]?.message?.content || '失敗';
  aiResult.textContent = content;
};

// 音声認識で「撮影して」と言ったらボタンを押す
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = true;
  recognition.onresult = event => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim();
    if (transcript.includes('撮影して')) {
      captureBtn.click();
    }
  };
  recognition.start();
}
