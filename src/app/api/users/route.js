import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// fetch all users from the server

export const GET = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return new NextResponse(JSON.stringify(users, { status: 200 }));

    } catch (err) {
        return new NextResponse(JSON.stringify({message: 'Something went wrong'}), { status: 500 });
    }
}