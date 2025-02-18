import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import CommonForm from "../../components/common/CommonForm";
import { LoginFormControls } from "../../config/FormConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth-slice.js";
import { toast } from "react-toastify";

function UserLogin() {
  const [formDate, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch  = useDispatch();
  const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formDate)).then((data) => {
      if (typeof data.payload === "string") {
        toast.error(data);
      } else {
        navigate("/");
        toast.success("Register Successfully");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tra text-foreground">
          Login Your Account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className=" 
                font-medium 
                ml-1.5
                text-primary hover:underline
                "
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Sign In"}
        formData={formDate}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default UserLogin;
