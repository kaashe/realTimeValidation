import React from "react";
import { FieldErrors, useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
const Form = () => {
  type formValuesType = {
    username: string;
    email: string;
    contact: Number;
    social: {
      linkedin: string;
      github: string;
    };
    phoneNumbers: string[];
    skills: {
      skill: string;
    }[];
  };
  const { register, handleSubmit, control, formState } =
    useForm<formValuesType>({
      defaultValues: {
        username: "",
        email: "",
        contact: '',
        social: {
          linkedin: "https://www.linkedin.com/in/kashif-ullah-46b605206/",
          github: "https://github.com/kaashe",
        },
        phoneNumbers: ["", ""],
        skills: [{ skill: "" }],
      },
      mode:'onBlur',
    });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });
  const onSubmit = (data: formValuesType) => {
    console.log(data);
  };
  return (
    <div className="App-header">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
              minLength:{value:3,message:'min 3 characters'},
            })}
          />
          <p className="error">{errors.username?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (emailEntered) => {
                  return (
                    emailEntered === "admin@gmail.com" ?
                    "enter a different email address":""
                  );
                },
                badDomain: (emailEntered) => {
                  return (
                    emailEntered.endsWith("baddomain.com") ? "domain not supported":""
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
          <label htmlFor="contact">Contact</label>
          <input
            type="number"
            id="contact"
            {...register("contact", {
              required: { value: true, message: "contact is required" },
            })}
          />
          <p className="error">{errors.contact?.message}</p>
          <label htmlFor="linkedin">LinkedIn</label>
          <input type="text" id="linkedin" {...register("social.linkedin")} />
          <label htmlFor="github">Github</label>
          <input type="text" id="github" {...register("social.github")} />
          <label htmlFor="primary-phone">Primary Phone no</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
          <label htmlFor="secondary-phone">Secondary Phone no</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
          <label htmlFor="secondary-phone">Skills</label>
          <button className="submit" type="button" onClick={() => append({ skill: "" })}>
              +Add
            </button>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`skills.${index}.skill` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
           
          </div>
          
          <button className="submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
