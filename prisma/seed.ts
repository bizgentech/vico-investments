import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cars = [
    {
      title: '2021 Toyota Camry SE',
      make: 'Toyota', model: 'Camry', year: 2021,
      price: 24900, mileage: 32000, color: 'Midnight Black',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: 'Excellent condition, one owner, clean title. Loaded with features.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800']),
      available: true, featured: true
    },
    {
      title: '2020 Honda CR-V EX',
      make: 'Honda', model: 'CR-V', year: 2020,
      price: 28500, mileage: 41000, color: 'Lunar Silver',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: 'AWD, panoramic sunroof, Honda Sensing safety suite.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800']),
      available: true, featured: true
    },
    {
      title: '2019 BMW 3 Series 330i',
      make: 'BMW', model: '3 Series', year: 2019,
      price: 31900, mileage: 55000, color: 'Alpine White',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: 'Sport line package, premium sound, heated seats.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800']),
      available: true, featured: false
    },
    {
      title: '2022 Ford F-150 XLT',
      make: 'Ford', model: 'F-150', year: 2022,
      price: 42000, mileage: 18000, color: 'Oxford White',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: '4WD, tow package, SYNC 4 infotainment.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800']),
      available: true, featured: true
    },
    {
      title: '2021 Hyundai Tucson SEL',
      make: 'Hyundai', model: 'Tucson', year: 2021,
      price: 22900, mileage: 28000, color: 'Phantom Black',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: 'Bluetooth, backup camera, lane assist, very clean.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=800']),
      available: true, featured: false
    },
    {
      title: '2020 Mercedes-Benz GLC 300',
      make: 'Mercedes-Benz', model: 'GLC 300', year: 2020,
      price: 38900, mileage: 44000, color: 'Obsidian Black',
      transmission: 'Automatic', fuelType: 'Gasoline',
      description: 'AMG sport package, Burmester sound, panoramic roof.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1617469767054-e8a09ade72c5?w=800']),
      available: true, featured: true
    },
  ]

  for (const car of cars) {
    await prisma.car.create({ data: car })
  }
  console.log('Seeded', cars.length, 'cars')
}

main().catch(console.error).finally(() => prisma.$disconnect())
