'use client'
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { useState } from "react";

export default function Reset(
    searchParams,
) {
    const [password, setPassword] = useState('');
    const supabase = createClient();
    console.log('password:',password)
    
    const resetPassword = async () => {
        const { data, error } = await supabase.auth.getSession();
        console.log('session:',data)
        const { data: userData, error: userError } = await supabase.auth.updateUser({
            password: password
        });
        console.log('userError:',userError)
        if (error) {
            console.log('error:',error)
        }

        if (!error && !userError) {
            return redirect('/login?message=success to change password')
        }
    }



    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="row">

                <div className="">
                    <div className="card z-index-0">
                        <div className="card-header text-center pt-4 pb-1">
                            <h4 className="font-weight-bolder mb-1">비밀번호 변경</h4>
                        </div>
                        <div className="card-body pb-0">
                            <div >
                                {/* <div className="mb-3">
                  <input
                    type="email"
                    name='email'
                    className="login_form"
                    placeholder="Email"
                    aria-label="Email"
                  />
                </div> */}
                                <div className="login_input">
                                    <Input
                                        type="password"
                                        name="password"
                                        className="login_form"
                                        placeholder="Password"
                                        aria-label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="login_btn_container">

                                    <Button
                                        type="submit"
                                        className="login_btn"
                                        onPress={resetPassword}
                                    >
                                        변경
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}