import { useState } from "react"
import HumanImg3 from "../../assets/human-3.png"

import useAuthentication from "../../hooks/api/useAuthentication"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Button from "../../components/general/clickable/Button"

export const Login: React.FC = () => {

    const { loginCall } = useAuthentication()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(loginCall(username, password), {
            pending: 'Information is being checked...',
            success: { render: ({ data }) => `${data}` },
            error: { render: ({ data }) => `${data}` }
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-6 justify-center items-center bg-blur-ellipse-small bg-[center_top_-1rem] bg-[length:200px] bg-no-repeat">
                <div>
                    <h1 className="text-5xl font-bold">Login</h1>
                </div>
                <div className="relative w-11/12 md:w-full max-w-3xl h-[400px] px-4 md:px-8 rounded-xl bg-gradient-to-br from-[#4F22F2] to-[#20183F]">
                    <div className="md:ps-24 w-full px-1 md:w-3/4 flex flex-col gap-y-3 h-full justify-center">
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="username" className="text-2xl font-semibold ps-2">Username</label>
                            <input type="text" className="bg-[#0D0D0D] rounded-2xl px-6 py-4" placeholder="type here..."
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="password" className="text-2xl font-semibold ps-2">Password</label>
                            <input type="password" className="bg-[#0D0D0D] rounded-2xl px-6 py-4" placeholder="type here..."
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        <Button text="Login" color="primary" size="2xl" innerHeight={3} className="mt-2" />

                        <p className="mt-1 underline"><Link to="/signup">No account yet? Sign up</Link></p>
                    </div>
                    <div className="absolute top-4 -right-24 mr-2 md:-right-20 md:-mr-0.5">
                        <img src={HumanImg3} className="w-56" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login