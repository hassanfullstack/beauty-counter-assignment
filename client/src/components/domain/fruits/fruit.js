import React, {useState} from 'react';
import {
    Button,
    Form,
    Label,
    Card,
  } from "semantic-ui-react";
    import { Formik } from "formik";
import * as Yup from "yup";
import { axiosBasic } from "../../../api/axios";
import { config } from "../../../api/endPoints";
import { FormInput } from "../../common";
import { messages } from "../../../utils";
const { validation } = messages;
const {ROOT_URL, REST_API}= config;

const Fruit=()=>{
    //const [isLoading, setLoading] = useState(false);
    const [getFruitInfo, setFruitInfo] = useState({});
    const [displayFruit, setDisplayFruit]= useState(false);
      const onSubmitBtnClick = (values) => {
        axiosBasic
         .get(ROOT_URL+REST_API.Fruit.GetFruitByName+JSON.stringify(values.name))
         .then((response) => {
          const { success, data, message } = response.data;
           if(success){
            setFruitInfo(data);
            setDisplayFruit(true);
           }
            alert(message);
         })
         .catch((error) => {
          alert(error);
         })
        };

        return (
          <div style={{textAlign: 'center'}}>
          
          Fruit Info
          
           <div>
           <Card.Group>
           <Card fluid className="card-main-wrapper" style={{ width: "99%" }}>
             <Card.Description>
               <Form>
                 <Formik
                   initialValues={{
                     name: '',
                   }}
                   onSubmit={(values) => onSubmitBtnClick(values)}
                   validationSchema={Yup.object().shape({
                     name: Yup.string()
                     .min(4, validation.minimumCharacters)
                    .max(100, validation.maximumCharacters).required(validation.requiredField),
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
                         {errors.name && touched.name && (
                           <Label>{errors.name}</Label>
                         )}
                         <FormInput
                           style={{ marginBottom: "10px" }}
                           value={values.name}
                           fluid
                           iconPosition="left"
                           placeholder="Fruit Name"
                           onChange={(event, data) =>
                             data && data.name
                               ? setFieldValue(data.name, data.value)
                               : ""
                           }
                           required
                           name="name"
                           type="text"
                          
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
                           Get
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
           <div style={{ marginTop: '3%'}}>
           {displayFruit === true ? ( 
             <div>
             <div> 
             <img src={`data:image/jpg;base64,${getFruitInfo.image}`} style={{width: '25%'}} /></div>
             <div>
             {getFruitInfo.name}
             {getFruitInfo.weight}
             {getFruitInfo.season}
             </div>
             </div>
             ) : null}
         
        </div>
         
         
         </div>
          );
}
export default Fruit;