import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { onResetPassword } from "../../services/user/actions.ts";
import { AppDispatch, useDispatch, useSelector } from "../../services/store.ts";
import { getUserState, setIsResetPassword } from "../../services/user/slice.ts";

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isResetPassword, isChangePassword} = useSelector(getUserState)
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataProps>({
    password: '',
    code: '',
  })
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isResetPassword && !isChangePassword) {
      navigate('/forgot-password');
    }
  }, [isResetPassword, isChangePassword, navigate]);

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

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.password || !formData.code) {
      return;
    }
    const dataRequest = {
      "password": formData.password,
      "token": formData.code
    }
    await dispatch(onResetPassword(dataRequest));
  }
  useEffect(() => {
    if (isChangePassword) {
      navigate('/login');
      dispatch(setIsResetPassword(false))
    }
  }, [isChangePassword, navigate, dispatch]);

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'password'}
            placeholder={'Введите новый пароль'}
            onChange={e => handleChange(e)}
            icon={'ShowIcon'}
            value={formData.password}
            name={'password'}
            ref={inputRef}
            onIconClick={onIconClick}
            size={'default'}
            extraClass="mb-6"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => handleChange(e)}
            value={formData.code}
            name={'code'}
            size={'default'}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Сохранить
          </Button>
          <p className="text text_type_main-default mb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </form>
      </div>
    </div>
  )
}

export interface formDataProps {
  password: string;
  code: string;
}
