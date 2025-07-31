"use client"

import { useState } from "react"
import {useRouter} from "next/navigation"

export default function SignupPage() {
    const router = useRouter();

    const [form, setForm] = useState ({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = async (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form),
        headers:{ "Content-Type":"application/json"},
    });

    if(res.ok) {
        router.push("/login");
    } else {
        const data = await res.json();
        alert(data.message);
    }
};
   return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto space-y-4">
        <input type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
         />
         <input type="text"
           name="email"
           placeholder="Email"
           onChange={handleChange}
           className="w-full p-2 border rounded"
           required
          />
          <input type="text"
           name="password"
           placeholder="Password"
           onChange={handleChange}
           className="w-full p-2 border rounded"
           required
          />
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="ad_manager">Ad Manager</option>
          <button type="submit" className="w-full bg-gree-600 text-white py-2 rounded">
            create Account
          </button>
    </form>
   )
}