import React, { useEffect, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../services/store.ts";
import { onForgotPassword } from "../../services/user/actions.ts";
import { getUserState, setIsChangePassword } from "../../services/user/slice.ts";

export const ForgotPasswordPage: React.FC = () => {
  const [valueEmail, setValueEmail] = useState('')
  const dispatch = useDispatch<AppDispatch>();
  const {isResetPassword} = useSelector(getUserState)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsChangePassword(false))
  }, [dispatch]);

  useEffect(() => {
    if (isResetPassword) {
      navigate('/reset-password'); // Навигация выполняется только после успешного обновления состояния
    }
  }, [isResetPassword, navigate]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valueEmail) {
      return;
    }
    const dataRequest = {
      "email": valueEmail
    }
    await dispatch(onForgotPassword(dataRequest));
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={e => setValueEmail(e.target.value)}
            value={valueEmail}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
            Восстановить
          </Button>
          <p className="text text_type_main-default mb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
        </form>
      </div>
    </div>
)
}