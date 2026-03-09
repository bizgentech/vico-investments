import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const appointment = await prisma.appointment.create({ data: body })
  return NextResponse.json(appointment)
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(appointments)
}
