import itemsHandler from './items.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // We reuse items API logic or return empty stats when starting
  return res.status(200).json({
    success: true,
    message: 'Dashboard stats endpoint',
  });
}
