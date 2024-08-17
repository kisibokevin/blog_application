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

// Update post status
export const PUT = async (req, { params }) => {
    const { slug } = params;
    const { status } = await req.json(); // Assume status is 'published' or 'draft'

    try {
        const updatedPost = await prisma.post.update({
        where: { slug },
        data: { status },
        });
        return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
    } catch (err) {
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};


// Delete post
export const DELETE = async (req, { params }) => {
    const { slug } = params;

    try {
        await prisma.post.delete({
        where: { slug },
        });
        return new NextResponse(
        JSON.stringify({ message: "Post deleted successfully" }),
        { status: 200 }
        );
    } catch (err) {
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};