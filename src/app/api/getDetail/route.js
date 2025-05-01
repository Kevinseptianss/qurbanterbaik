import { db } from '@/firebase/configure';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return Response.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const docRef = db.collection('items').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return Response.json({ error: 'Item not found' }, { status: 404 });
    }

    return Response.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching item:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}