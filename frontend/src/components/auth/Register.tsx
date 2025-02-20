import { Inputs } from "../inputsAuth/Inputs";
import { RiUserFill } from "react-icons/ri";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import {
  StyledConteineFile,
  StyledForm,
  StyledIconeOfConteine,
  StyledInputFile,
  StyledInputsBox,
  StyledButtonSubmit,
  StyledFileBox,
  StyledConteineDate,
} from "./Auth.styled";
import { useContext, useState } from "react";
import { StyledInputsDate } from "../inputsAuth/Inputs.styled";
import { UserRegister } from "../../interface/User";
import { ErrorMessage } from "../../interface/ErrorAuth";
import { StyledSpiner } from "../../spiner/Spine.styled";
import {ContextAuth} from './../../context/useContextAuth'
import { httpRespose, IFnAuth } from "../../interface/FnContext";

interface Props {
  active: boolean;
}

export const Register = ({ active }: Props) => {
  const { register } = useContext(ContextAuth) as IFnAuth 
  const [see, setSee] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>({});
  const [url, setUrl] = useState("");
  const [registerUser, setRegisterUSer] = useState<UserRegister>({
    img: '',
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth_date: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, files, value } = e.target;

    if (files && files.length > 0) {
      setRegisterUSer((prevent) => ({ ...prevent, [name]: files[0] }));
      const UrlImg = URL.createObjectURL(files[0]);
      setUrl(UrlImg);
    } else {
      setRegisterUSer((prevent) => ({ ...prevent, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)

    const { dados, loading } = await register(registerUser) as httpRespose<ErrorMessage>

    if(dados) {
      setError(dados)
      setLoading(loading)
    } else {
      setLoading(loading)
    }
    
  }

  return (
    <StyledForm $active={active} onSubmit={handleSubmit}>
      <StyledFileBox>
        <StyledConteineFile $img={url}>
          <StyledIconeOfConteine>
            <img
              src="https://cdn-icons-png.flaticon.com/512/13/13626.png"
              alt="icone-upload"
            />
          </StyledIconeOfConteine>
          <StyledInputFile
            type="file"
            name="img"
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
          <p>{error.img}</p>
        </StyledConteineFile>
      </StyledFileBox>
      <StyledInputsBox>
        <Inputs
          type="text"
          name="name"
          placeholder="Nome"
          handleOnChange={handleOnChange}
        />
        <RiUserFill />
        <p>{error.name}</p>
      </StyledInputsBox>
      <StyledInputsBox>
        <Inputs
          type="text"
          name="lastname"
          placeholder="Sobrenome"
          handleOnChange={handleOnChange}
        />
        <RiUserFill />
        <p>{error.lastname}</p>
      </StyledInputsBox>
      <StyledInputsBox>
        <Inputs
          type="email"
          name="email"
          placeholder="E-mail"
          handleOnChange={handleOnChange}
        />
        <HiOutlineMail />
        <p>{error.email}</p>
      </StyledInputsBox>
      <StyledInputsBox>
        <Inputs
          type={see ? "text" : "password"}
          name="password"
          placeholder="Senha"
          handleOnChange={handleOnChange}
        />
        {see ? (
          <LiaEyeSolid onClick={() => setSee((prevent) => !prevent)} />
        ) : (
          <LiaEyeSlashSolid onClick={() => setSee((prevent) => !prevent)} />
        )}
        <p>{error.password}</p>
      </StyledInputsBox>
      <StyledInputsBox>
        <Inputs
          type={see ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmar Senha"
          handleOnChange={handleOnChange}
        />
        {see ? (
          <LiaEyeSolid onClick={() => setSee((prevent) => !prevent)} />
        ) : (
          <LiaEyeSlashSolid onClick={() => setSee((prevent) => !prevent)} />
        )}
        <p>{error.confirmPassword}</p>
      </StyledInputsBox>
      <div
        className="boxBtn-Date"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledConteineDate>
          <p style={{ color: "gray" }}>Data de Nascimento</p>
          <StyledInputsDate
            type="date"
            name="birth_date"
            min="1900-01-01"
            max="2099-12-31"
            onChange={(e) => handleOnChange(e)}
          />
          <p className="error">{error.birth_date}</p>
        </StyledConteineDate>
        <StyledButtonSubmit type="submit">
          {loading? <StyledSpiner/> : 'Registrar'}
        </StyledButtonSubmit>
      </div>
    </StyledForm>
  );
};
