import User from "@/app/models/User";
import dbConnect from "@/app/utilities/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { fullName, email, password } = await request.json();

  await dbConnect();

  const user = await User.findOne({ email: email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
      return new NextResponse("Account has been created", {
        status: 201,
        statusText: "Usuario criado com sucesso",
      });
    } catch (err: any) {
      return new NextResponse(err.message, {
        status: 500,
        statusText: "Erro ao criar o usuario",
      });
    }
  } else {
    return new NextResponse("Email in use", {
      status: 501,
      statusText: "Email em uso",
    });
  }
};
