import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Fetch all posts for admin dashboard
export const GET = async (req) => {
    try {
        const posts = await prisma.post.findMany({
        include: { user: true },
        });
        return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (err) {
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};

