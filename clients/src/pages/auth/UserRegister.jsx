import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "../../components/common/CommonForm";
import { RegisterFormControls } from "../../config/FormConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { registeruser } from "../../store/auth-slice.js";
import { toast } from "react-toastify";

function UserRegister() {
  const [formDate, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registeruser(formDate)).then((data) => {
      console.log(data);
      if (typeof data.payload === 'string') {
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
          Create new Account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className=" 
                font-medium 
                ml-1.5
                text-primary hover:underline
                "
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={RegisterFormControls}
        buttonText={"Sign Up"}
        formData={formDate}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default UserRegister;
