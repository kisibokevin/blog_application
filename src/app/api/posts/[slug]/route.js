import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


// get single post
export const GET = async (req, { params }) => {

  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: {slug},
      include: {user: true},
    })
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" },{ status: 500 })
    );
  }
};

// update single post
export const PUT = async (req, { params }) => {
  const { slug } = params;
  const body = await req.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: body,
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

// delete single post
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
