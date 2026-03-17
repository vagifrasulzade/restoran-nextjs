import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    return NextResponse.json(await prisma.user.findMany());
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: "User created successfully", user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "User creation failed", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}