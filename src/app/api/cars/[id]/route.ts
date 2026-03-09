import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  await prisma.car.update({
    where: { id: parseInt(id) },
    data: { available: false }
  })

  return NextResponse.json({ success: true })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const car = await prisma.car.update({
    where: { id: parseInt(id) },
    data: body
  })

  return NextResponse.json(car)
}
