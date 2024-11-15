
import { auth, signIn,signOut } from '@/auth'
import React from 'react'
import { Cross, Github } from 'lucide-react';
import Link from 'next/link';
import Form from 'next/form';
const NavBar = async () => {
    const session = await auth();
    return (
        <nav className='w-full flex justify-between px-3 py-1'>
            <div>Logo</div>
            <ul className='flex justify-evenly w-1/2'>
                {session && session?.user ?<>
                <li><Link href={`/create/${session?.id}`}><Cross/></Link></li>
                    <li><Form
                        action={async () => {
                            "use server"
                            await signOut({redirectTo: "/"})
                        }}
                    >
                        <button type="submit">Sign out</button>
                    </Form></li>
                <li>{session?.user.name}</li>
                </> : <Form
                    action={async () => {
                        "use server"
                        await signIn("github", {redirectTo: "/"})
                    }}
                ><button type="submit"><Github/></button></Form>}
            </ul>
        </nav>
    )
}

export default NavBar