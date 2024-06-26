import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log('ding')
        console.log(request.body)
        const {email,name, password} = body;
    
        if(!email || !name || !password) {
            return new NextResponse('Missing info', {status: 400})
        }
    
        const hashedPssword = await bcrypt.hash(password, 12)
    
        const user = await prisma.user.create({
            data: {
                email,name,hashedPssword
            }
        })
    
        return NextResponse.json(user)
    } catch (err: any) {
        console.log(err, 'REGISTRATION_ERROR')
        return new NextResponse('Internal Error', {status: 500});
    }
    

}