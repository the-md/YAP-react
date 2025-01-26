import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { onRegister } from "../../services/user/actions.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store.ts";

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    if (inputRef.current){
      inputRef.current.type = inputRef.current.type == 'text' ? 'password' : 'text'
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
    dispatch(onRegister(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    <Navigate to="/" />
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => handleChange(e)}
            value={formData.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={e => handleChange(e)}
            value={formData.email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => handleChange(e)}
            icon={'ShowIcon'}
            value={formData.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>

      </div>
    </div>
  )
}