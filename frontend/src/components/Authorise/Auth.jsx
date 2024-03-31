import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const EmailVerification = () => {
  const { isAuthorized, user } = useContext(Context);

  // console.log(user);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [balance, setBalance] = useState("");
  const [OTP, setOtp] = useState("");

  useEffect(() => {
    try {
      if (isAuthorized) {
        axios
          .get("http://localhost:4000/api/v1/user/getuser", {
            withCredentials: true,
          })
          .then((res) => {
            setBalance(() => res.data.user.balance);
          });
      }
    } catch {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized && user.emailVarified) {
      setVerificationStatus(true);
    }
  }, [isAuthorized, user.emailVarified]);

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/OTP-send",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyEmailWithOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/verify-otp",
        { OTP },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setVerificationStatus(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="h-[70dvh] min-h-screen">
      <div className="flex flex-col justify-center text-center mt-8">
        <h1>Balance is: {balance}</h1>
        <h1>Email Verification</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center mt-4 gap-y-8">
          {verificationStatus ? (
            <p className="mt-12 bg-gray-100 px-4 py-2 rounded-lg">
              {user.email} is verified {verificationStatus}
            </p>
          ) : (
            <>
              <p>
                Enter the OTP received on your email to verify your email
                address.
              </p>
              <button
                onClick={sendOTP}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Send OTP
              </button>
              <input
                type="text"
                placeholder="Enter OTP"
                value={OTP}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-gray-100 px-4 py-4 rounded-lg"
              />
              <button
                onClick={verifyEmailWithOTP}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Verify Email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
