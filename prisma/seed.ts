import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Admin user ─────────────────────────────────────────────────────────────
    const admin = await prisma.user.upsert({
        where: { email: 'admin@vitaltrack.app' },
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@vitaltrack.app',
            password: await hashPassword('Admin@1234'),
            role: 'admin',
            healthProfile: { create: { gender: null, dateOfBirth: null } },
        },
    });
    console.log(`✅ Admin user: ${admin.email}`);

    // ─── Demo user ───────────────────────────────────────────────────────────────
    const demo = await prisma.user.upsert({
        where: { email: 'demo@vitaltrack.app' },
        update: {},
        create: {
            name: 'Demo User',
            email: 'demo@vitaltrack.app',
            password: await hashPassword('Demo@1234'),
            role: 'user',
            healthProfile: {
                create: {
                    gender: 'male',
                    dateOfBirth: new Date('1990-01-15'),
                    height: 170,
                    weight: 70,
                    bloodType: 'O+',
                },
            },
        },
    });
    console.log(`✅ Demo user: ${demo.email}`);

    console.log('✨ Seeding completed!');
    console.log('');
    console.log('Credentials:');
    console.log('  Admin → admin@vitaltrack.app / Admin@1234');
    console.log('  Demo  → demo@vitaltrack.app  / Demo@1234');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
