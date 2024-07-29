// src/app/api/items/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Item from "../../../../server/models/Item";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function GET() {
  try {
    const items = await Item.find({});
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.error(new Error("Failed to fetch items"));
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newItem = new Item(body);
    const savedItem = await newItem.save();
    return NextResponse.json(savedItem);
  } catch (error) {
    return NextResponse.error(new Error("Failed to add item"));
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.error(new Error("Failed to update item"));
  }
}
