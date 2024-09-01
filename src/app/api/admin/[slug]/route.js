
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


// update status of a post from pending to published

export const PUT = async (req, {params}) => {
    const {slug} = params;
    const { status } = await req.json();

    try {
        const updatedPost = await prisma.post.update({
            where: { 
                slug: slug,
            },
            data: { status },
        });

        return NextResponse.json(updatedPost, { status: 200 });

        //return new NextResponse(JSON.stringify({ message: "Post status updated successfully" }), { status: 200 });
    } catch (err) {
        console.error("Error updating post status:", err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
    }
};



// Delete post
export const DELETE = async (req, { params }) => {
    const { slug } = params;

    try {
        await prisma.post.delete({
            where: { slug: slug },
        });
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error deleting post:", err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};