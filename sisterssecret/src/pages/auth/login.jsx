/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("hello from iside the login");
      navigate(user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
    }
  }, [isAuthenticated, user, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      console.log("hello from the other side");
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className:
            "fixed top-5 right-5 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg",
        });
        // navigate("/shop/home");
      } else {
        toast({
          className:
            "fixed top-5 right-5 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg",
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
