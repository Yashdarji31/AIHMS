import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/app/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { api } from "@/lib/api";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [{ title: "Sign in — AIHMS" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");


    const formData = new FormData(e.currentTarget);


    const email = String(
      formData.get("email")
    );

    const password = String(
      formData.get("password")
    );


    console.log({
      email,
      password
    });


    setLoading(true);


    try {

      console.log("Calling API login...");


      // Login API
      await api.login({
        email,
        password,
      });


      console.log(
        "Token:",
        localStorage.getItem("token")
      );


      // Get current user
      const user = await api.getCurrentUser();


      console.log(
        "Logged User:",
        user
      );


      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );


      toast.success(
        `Welcome ${user.full_name}`
      );


      // Redirect based on role

      switch(user.role) {


        case "admin":

        case "doctor":

        case "patient":

          navigate({
            to:"/dashboard"
          });

          break;


        default:

          navigate({
            to:"/"
          });

      }


    } catch(error:any) {


      console.error(
        "LOGIN ERROR:",
        error
      );


      toast.error(
        error.message || "Login failed"
      );


    } finally {


      setLoading(false);


    }

  }


  return (
    <AuthShell
      title="Sign in to AIHMS"
      subtitle="Secure access for clinicians, staff and administrators."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >

      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >


        <div className="space-y-1.5">

          <Label htmlFor="email">
            Email
          </Label>


          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />

        </div>



        <div className="space-y-1.5">


          <div className="flex items-center justify-between">

            <Label htmlFor="password">
              Password
            </Label>


            <Link
              to="/auth/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </Link>

          </div>



          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />


        </div>



        <label className="flex items-center gap-2 text-sm text-muted-foreground">

          <Checkbox defaultChecked />

          Remember me

        </label>




        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >

          {
            loading
              ? "Signing in..."
              : "Sign in"
          }

        </Button>



        <div className="relative py-2">

          <Separator />


          <span className="absolute left-1/2 top-1/2 
          -translate-x-1/2 
          -translate-y-1/2 
          bg-background 
          px-2 
          text-[11px] 
          uppercase 
          tracking-wider 
          text-muted-foreground">

            or continue with

          </span>


        </div>




        <div className="grid grid-cols-2 gap-2">


          <Button
            type="button"
            variant="outline"
          >
            Google
          </Button>



          <Button
            type="button"
            variant="outline"
          >
            Microsoft
          </Button>


        </div>


      </form>


    </AuthShell>
  );
}

export default LoginPage;