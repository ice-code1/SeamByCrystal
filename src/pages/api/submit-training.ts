// pages/api/submit-training.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../seamsbycrystal/lib/sanity/serverClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;

  try {
    const response = await client.create({
      _type: 'training',
      name: data.name,
      email: data.email,
      phone: data.phone,
      trainingType: data.trainingType,
      skillLevel: data.skillLevel,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message || '',
    });

    res.status(200).json({ message: 'Training saved', result: response });
  } catch (error) {
    console.error('Error saving training:', error);
    res.status(500).json({ message: 'Failed to save training' });
  }
}
