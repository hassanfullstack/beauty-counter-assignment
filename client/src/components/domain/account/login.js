import React from 'react';
import {
    Button,
    Form,
    Label,
     Card,
  } from "semantic-ui-react";
import { Formik } from "formik";
import { axiosBasic } from "../../../api/axios";
import { config } from "../../../api/endPoints";
import { useNavigate  } from "react-router-dom";
import * as Yup from "yup";
import { FormInput } from "../../common";
import { messages, WebStorage, WebStorageNames } from "../../../utils";
const { validation } = messages;
const {AUTH_ROOT}= config;

const Login =()=> {
  const navigate = useNavigate();

      const onSubmitBtnClick = (values) => {
         axiosBasic
         .post(AUTH_ROOT, {
           username:values.username,
           password: values.password,
         })
         .then((response) => {
           const { token } = response.data;
            WebStorage.setLocalStore(WebStorageNames.AuthInfo, token);
            WebStorage.setLocalStore(WebStorageNames.UserLoggedIn, true);
            navigate('/fruit');

           alert('Login Successfully');
         })
         .catch((error) => {
          alert(error);
         })
        };

        return (
            <div style={{textAlign: 'center'}}>
          
           Login
           
            <div>
            <Card.Group>
            <Card fluid className="card-main-wrapper" style={{ width: "99%" }}>
              <Card.Description>
                <Form>
                  <Formik
                    initialValues={{
                      username: '',
                      password: '',
                    }}
                    onSubmit={(values) => onSubmitBtnClick(values)}
                    validationSchema={Yup.object().shape({
                      username: Yup.string()
                      .min(4, validation.minimumCharacters)
                        .max(100, validation.maximumCharacters).required(validation.requiredField),
                        password: Yup.string()
                    .min(4, validation.minimumCharacters)
                    .max(100, validation.maximumCharacters)
                    .required(validation.requiredField),
                    })}
                    render={({
                      values,
                      handleSubmit,
                      setFieldValue,
                      errors,
                      touched,
                    }) => (
                      <div>
                      <div className="row">
                        <div className="col-sm">
                          {errors.username && touched.username && (
                            <Label>{errors.username}</Label>
                          )}
                          <FormInput
                            style={{ marginBottom: "10px" }}
                            value={values.username}
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={(event, data) =>
                              data && data.name
                                ? setFieldValue(data.name, data.value)
                                : ""
                            }
                            required
                            name="username"
                            type="text"
                           
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm mt-4">
                          {errors.password && touched.password && (
                            <Label style={{ marginTop: "5px" }}>
                              {errors.password}
                            </Label>
                          )}
                          <FormInput
                            style={{ marginBottom: "10px" }}
                            fluid
                            value={values.password}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            onChange={(event, data) =>
                              data && data.name
                                ? setFieldValue(data.name, data.value)
                                : ""
                            }
                            required
                          />
                        </div>
                      </div>
  
                      <div className="row">
                        <div
                          className="col-sm text-right"
                        >
                          <Button
                            color="blue"
                            type="submit"
                            fluid
                            size="large"
                            onClick={() => handleSubmit(values)}
                          >
                            Login
                          </Button>
                        </div>
                      </div>
                    </div>
                    )}
                  />
                </Form>
              </Card.Description>
            </Card>
          </Card.Group>
            </div>
          
          
          
          </div>
          );
}
export default Login;