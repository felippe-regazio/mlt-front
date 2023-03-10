import styled from "@emotion/styled";
import { DefaultLayout } from "../../layouts/Default";
import { Form } from "../../components/Form/Form";
import { isEmail } from "../../utils/utils";
import { Infobox } from "../../components/Infobox/Infobox";
import { FormEvent } from "react";
import { toast } from 'react-toastify';
import { API } from "../../api/API";
import { AxiosResponse } from "axios";
import serialize from 'form-serialize';
import { Link } from "react-router-dom";

const RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 100px 16px;
  
  h1 {
    font-size: 32px;
  }

  > div {
    text-align: left;
    width: 100%;
    max-width: 460px;
  }
`;

export default function Register() {
  const submit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = serialize(form, { hash: true });
    const inputs = Array.from(form.querySelectorAll('input, select, textarea'));

    if (inputs.some((input: any) => input.required && !input.value)) {
      toast.warn('Todos os campos devem ser preenchidos.');

      return false;      
    }

    if (!isEmail(data.email as string)) {
      toast.warn('Você deve inserir um e-mail estruturalmente válido, mesmo que fictício.');

      return false;
    }
    
    if (data.password !== data['confirm-password']) {
      toast.warn('As senhas digitadas não conferem. Ambas devem ser iguais.');

      return false;
    };

    API.post('/register', data)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          toast.success('Registro efetuado com sucesso!');
          form.reset();
        } else {
          toast.error(response.statusText);
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.errorMessage || error.message);
      });
  }

  return(
    <DefaultLayout>      
      <RegisterWrapper>
        <div>
          <h1>Registre-se</h1>

          <Infobox>
            <p>
              Este é um sistema de testes, sendo assim a criação de usuário
              segue um processo mais simples onde não será levado em conta 
              fluxos de validação, confirmação de e-mail ou dados inseridos, 
              você pode até mesmo usar um e-mail fictício. O usuário persistirá
              no db normalmente e poderá ser utilizado para login.
            </p>
          </Infobox>

          <Form onSubmit={submit} encType='multipart/form-data' noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" required/>
            </div>

            <div className="field">
              <label htmlFor="firstName">Nome</label>
              <input type="text" name="firstName" required/>
            </div>

            <div className="field">
              <label htmlFor="lastName">Sobrenome</label>
              <input type="text" name="lastName" required/>
            </div>

            <div className="field">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" required/>
            </div>

            <div className="field">
              <label htmlFor="confirm-password">Confirme a senha</label>
              <input type="password" name="confirm-password" required/>
            </div>                

            <div className="actions">
              <button className="button-primary" type="submit">Registrar</button>
              
              <Link to="/login">
                <button type="button">Entrar</button>
              </Link>
            </div>
          </Form>
        </div>
      </RegisterWrapper>
    </DefaultLayout>
  )
}