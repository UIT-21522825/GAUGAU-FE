import React from "react";
import { useAuth } from "../provider/index";
import { LoadingPage } from "../loading";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const AnonymousWrapper = ({ children }) => {
  const { isLoading, isLoggedIn } = useAuth();
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : isLoggedIn ? (
        <Navigate to="/" replace={true} />
      ) : (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

const PrivateWrapper = ({ children }) => {
  const { isLoading, isLoggedIn } = useAuth();
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

const PublicWrapper = ({ children }) => {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <motion.div
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export { AnonymousWrapper, PrivateWrapper, PublicWrapper };
