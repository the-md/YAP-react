import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { onLogin } from "../../services/user/actions.ts";
import { AppDispatch, useDispatch } from "../../services/store.ts";
import { User } from "../../utils/types.ts";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Omit<User, 'name'>>({
    email: '',
    password: '',
  })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onIconClick = () => {
    if (inputRef.current){
      inputRef.current!.type = inputRef.current!.type === 'text' ? 'password' : 'text'
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      return;
    }
    dispatch(onLogin(formData));
    setFormData({
      email: '',
      password: '',
    });
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => handleChange(e)}
            value={formData.email ?? ''}
            name={'email'}
            size={'default'}
            extraClass="mb-6"
            data-cy='email-input'
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => handleChange(e)}
            icon={'ShowIcon'}
            value={formData.password ?? ''}
            name={'password'}
            ref={inputRef}
            onIconClick={onIconClick}
            size={'default'}
            extraClass="mb-6"
            data-cy='password-input'
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20" data-cy="login-submit">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default mb-4">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>

      </div>
    </div>
  )
}