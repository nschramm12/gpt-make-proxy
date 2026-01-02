export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  try {
    const forward = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const result = await forward.text();
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ error: 'Forwarding failed', details: err.message });
  }
}
