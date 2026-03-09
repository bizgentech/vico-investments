import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const make = searchParams.get('make')
  const maxPrice = searchParams.get('maxPrice')
  const featured = searchParams.get('featured')

  const cars = await prisma.car.findMany({
    where: {
      available: true,
      ...(make && { make }),
      ...(maxPrice && { price: { lte: parseInt(maxPrice) } }),
      ...(featured === 'true' && { featured: true }),
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(cars)
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const car = await prisma.car.create({ data: body })
  return NextResponse.json(car)
}
