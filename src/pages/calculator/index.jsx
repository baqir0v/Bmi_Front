import styled, { keyframes, css } from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import { usePost } from "../../utils/hooks/useCustomMutation";
import { useGetOne } from "../../utils/hooks/useCustomQuery";
import { ENDPOINTS } from "../../utils/constants/Endpoints";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Calculator = () => {
  const [bmiScore, setBmiScore] = useState("");
  const [bmiId, setBmiId] = useState(1);

  const { data: bmiData, refetch } = useGetOne("bmi", ENDPOINTS.bmi, bmiId);

  const { mutate: userMutation } = usePost("user", `${ENDPOINTS.users}/submit`);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      gender: "",
      age: "",
      height: "",
      weight: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      gender: Yup.string().required("Gender is required"),
      age: Yup.number().required("Age is required").positive().integer(),
      height: Yup.number().required("Height is required").positive(),
      weight: Yup.number().required("Weight is required").positive(),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        ...values,
        gender: values.gender === "male" ? true : false,
      };

      userMutation(payload, {
        onSuccess: () => {
          toast.success("Your BMI added successfully", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
          });
          resetForm();
          setSubmitting(false);
        },
        onError: (error) => {
          toast.error(error || "Failed to add BMI", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
          });
          setSubmitting(false);
        },
      });
    },
  });

  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return "0";
  };

  useEffect(() => {
    if (formik.values.height && formik.values.weight) {
      const bmi = calculateBMI(formik.values.height, formik.values.weight);
      setBmiScore(bmi);

      if (bmi < 18.5) {
        setBmiId(1);
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiId(2);
      } else if (bmi >= 25 && bmi < 30) {
        setBmiId(3);
      } else if (bmi >= 30) {
        setBmiId(4);
      }

      refetch();
    }
  }, [formik.values.height, formik.values.weight, refetch]);

  return (
    <CalculatorWrapper>
      <NavigatorContainer>
        <StyledLink to={"/"}>Previous</StyledLink>
        <StyledLink to={"/list"}>Next</StyledLink>
      </NavigatorContainer>
      <CalculatorForm onSubmit={formik.handleSubmit}>
        <FormParter>
          <HeaderOne>BMI Calculator</HeaderOne>
        </FormParter>
        <FormParter>
          <SectionParter>
            <InputContainer>
              <InputLabel>Full Name</InputLabel>
              <InputWrapper>
                <HalfInputBox>
                  <NameInput
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <ErrorMessage>{formik.errors.name}</ErrorMessage>
                  )}
                </HalfInputBox>
                <HalfInputBox>
                  <NameInput
                    name="surname"
                    placeholder="Surname"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
                  {formik.errors.surname && formik.touched.surname && (
                    <ErrorMessage>{formik.errors.surname}</ErrorMessage>
                  )}
                </HalfInputBox>
              </InputWrapper>
            </InputContainer>
          </SectionParter>
          <SectionParter>
            <InputContainer>
              <InputLabel>Gender</InputLabel>
              <RadioWrapper>
                <RadioBox>
                  <RadioContainer>
                    <RadioInput
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "male"}
                    />
                    Male
                  </RadioContainer>
                  <RadioContainer>
                    <RadioInput
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "female"}
                    />
                    Female
                  </RadioContainer>
                </RadioBox>
                {formik.errors.gender && formik.touched.gender && (
                  <ErrorMessage>{formik.errors.gender}</ErrorMessage>
                )}
              </RadioWrapper>
            </InputContainer>
            <InputContainer>
              <InputLabel>Age</InputLabel>
              <InputWrapper>
                <InputBox>
                  <FormInput
                    name="age"
                    onChange={formik.handleChange}
                    value={formik.values.age}
                  />
                  {formik.errors.age && formik.touched.age && (
                    <ErrorMessage>{formik.errors.age}</ErrorMessage>
                  )}
                </InputBox>
              </InputWrapper>
            </InputContainer>
            <InputContainer>
              <InputLabel>Height(in cm)</InputLabel>
              <InputWrapper>
                <InputBox>
                  <FormInput
                    name="height"
                    onChange={formik.handleChange}
                    value={formik.values.height}
                  />
                  {formik.errors.height && formik.touched.height && (
                    <ErrorMessage>{formik.errors.height}</ErrorMessage>
                  )}
                </InputBox>
              </InputWrapper>
            </InputContainer>
            <InputContainer>
              <InputLabel>Weight(in kg)</InputLabel>
              <InputWrapper>
                <InputBox>
                  <FormInput
                    name="weight"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                  />
                  {formik.errors.weight && formik.touched.weight && (
                    <ErrorMessage>{formik.errors.weight}</ErrorMessage>
                  )}
                </InputBox>
              </InputWrapper>
            </InputContainer>
          </SectionParter>
          {bmiScore ? (
            <SectionParter>
              <BmiText>
                <strong>BMI: {bmiScore}</strong>
              </BmiText>
              <BmiText>
                <span>{bmiData?.range}</span>
              </BmiText>
              <BmiImage src={bmiData?.image} />
            </SectionParter>
          ) : (
            ""
          )}
        </FormParter>
        <FormParter
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SubmitButton type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Spinner /> : "Submit"}
          </SubmitButton>
        </FormParter>
      </CalculatorForm>
    </CalculatorWrapper>
  );
};

const StyledLink = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  background-color: #18bd5b;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16aa52;
    transform: translateY(3px);
  }

  &:active {
    background-color: #149e47;
    transform: translateY(0);
  }
`;

const NavigatorContainer = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -0%);
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
`;

const CalculatorWrapper = styled.main`
position: relative;
  padding: 50px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c3dfa9;
`;

const CalculatorForm = styled.form`
  max-width: 800px;
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  border-radius: 8px;
  @media (max-width: 650px) {
    width: 86%;
  }
`;

const FormParter = styled.div`
  border-bottom: 1px solid #d7d8e1;
  padding: 30px;
`;

const HeaderOne = styled.h1`
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const InputLabel = styled.label``;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  @media (max-width: 650px) {
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;

const NameInput = styled.input`
  padding: 10px;
  width: 100%;
`;

const SectionParter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-bottom: 1px solid #d7d8e1;
  padding: 20px 0px 30px;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 10px;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const RadioBox = styled.div`
  display: flex;
  width: 100%;
`;

const RadioContainer = styled.div`
  display: flex;
  width: 50%;
  gap: 10px;
`;

const RadioInput = styled.input`
  width: 20px;
  height: 20px;
`;

const FormInput = styled.input`
  padding: 10px;
  width: 100%;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  background-color: #18bd5b;
  border: 1px solid #18bd5b;
  color: #fff;
  min-width: 180px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `}

  &:hover {
    background-color: #16aa52;
  }
`;

const BmiText = styled.p`
  font-size: 18px;
`;

const BmiImage = styled.img`
  max-width: 100px;
  max-height: 300px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const HalfInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  gap: 10px;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

export default Calculator;
