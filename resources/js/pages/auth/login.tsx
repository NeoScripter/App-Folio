import { Button } from "@/components/auth/form/button";
import Checkbox from "@/components/auth/form/checkbox";
import Input from "@/components/auth/form/input";
import InputError from "@/components/auth/form/input-error";
import Label from "@/components/auth/form/label";
import TextLink from "@/components/auth/form/text-link";
import AuthLayout from "@/layouts/auth/auth-layout";
import { LoaderCircle } from "lucide-preact";
import { JSX } from "preact/jsx-runtime";

const Login = () => {
    let processing = false;
    const submit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();
        // post(route("login"), {
        //     onFinish: () => reset("password"),
        // });
    };

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <form class="flex flex-col gap-6" onSubmit={submit}>
                <div class="grid gap-6">
                    {/* Email */}
                    <div class="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={""}
                            onInput={(e) => {}}
                            placeholder="email@example.com"
                        />
                        <InputError message={""} />
                    </div>

                    {/* Password */}
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <TextLink
                                href="/login"
                                class="ml-auto text-sm"
                                tabIndex={5}
                            >
                                Forgot password?
                            </TextLink>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={""}
                            onInput={(e) => {}}
                            placeholder="Password"
                        />
                        <InputError message={""} />
                    </div>

                    {/* Remember me */}
                    <div class="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={true}
                            onClick={() => {}}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        class="mt-4 w-full"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle class="h-4 w-4 animate-spin" />
                        )}
                        Log in
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
