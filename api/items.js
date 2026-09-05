// In-Memory & File-based storage for Vercel Serverless Function
let itemsDatabase = [];

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // Return all real submitted items
        return res.status(200).json({
          success: true,
          count: itemsDatabase.length,
          data: itemsDatabase,
        });
      }

      case 'POST': {
        // Create a new report item
        const body = req.body || {};
        if (!body.name || !body.location) {
          return res.status(400).json({ success: false, message: 'Item name and location are required.' });
        }

        const prefix = body.type === 'Lost' ? 'LR' : body.type === 'Found' ? 'FI' : 'CL';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newItem = {
          id: body.id || `${prefix}-${randomNum}`,
          name: body.name,
          description: body.description || '',
          location: body.location,
          date: body.date || new Date().toISOString(),
          studentName: body.studentName || 'Anonymous',
          studentId: body.studentId || 'N/A',
          type: body.type || 'Lost',
          status: body.status || 'Pending',
          image: body.image || '',
          reportedBy: body.reportedBy || 'user@university.edu',
          assignedTo: body.assignedTo || undefined,
        };

        itemsDatabase.unshift(newItem);

        return res.status(201).json({
          success: true,
          message: 'Report submitted successfully.',
          data: newItem,
        });
      }

      case 'PUT': {
        // Update item status or details
        const { id, ...updates } = req.body || {};
        if (!id) {
          return res.status(400).json({ success: false, message: 'Item ID is required for update.' });
        }

        let updatedItem = null;
        itemsDatabase = itemsDatabase.map(item => {
          if (item.id === id) {
            updatedItem = { ...item, ...updates };
            return updatedItem;
          }
          return item;
        });

        if (!updatedItem) {
          return res.status(404).json({ success: false, message: 'Item not found.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Item updated successfully.',
          data: updatedItem,
        });
      }

      case 'DELETE': {
        // Delete item report
        const id = req.query.id || (req.body && req.body.id);
        if (!id) {
          return res.status(400).json({ success: false, message: 'Item ID is required for deletion.' });
        }

        itemsDatabase = itemsDatabase.filter(item => item.id !== id);

        return res.status(200).json({
          success: true,
          message: `Item #${id} deleted successfully.`,
        });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
        return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
