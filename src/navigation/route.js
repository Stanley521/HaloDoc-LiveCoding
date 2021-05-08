import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { homePage } from "./mainNavigation";

export default function RouteWrapper({
  component: Component,
  notPrivate,
  covid,
  admin,
  ...rest
}) {
  let userId = localStorage.getItem('userId') || '928fgm4029fk-402';
  let token = localStorage.getItem('token') || '1982349123';

  const signed = (userId && token ) ? true : false;

  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  // if (!notPrivate && !signed) {
  //   return <Redirect to="/signin" />;
  // }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */
  // if (notPrivate && signed) {
  //   return <Redirect to={homePage} />;
  // }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};
