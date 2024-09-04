
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// get a single user from the server

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.status(500).json({ error: "Failed to fetch user" });
    }
};

// update a user's profile from the server

export const PUT = async (req) => {
    const { body } = req;
    const { userId } = req.query;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: JSON.parse(body),
        });

        return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
        return NextResponse.status(500).json({ error: "Failed to update user" });
    }
};

// delete a user from the server

export const DELETE = async (req) => {
    const { userId } = req.query;

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.status(500).json({ error: "Failed to delete user" });
    }
};