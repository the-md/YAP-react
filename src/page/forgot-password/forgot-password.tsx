import React, { useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ForgotPasswordPage: React.FC = () => {
  const [valueLogin, setValueLogin] = useState('')

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setValueLogin(e.target.value)}
          value={valueLogin}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
          Восстановить
        </Button>
        <p className="text text_type_main-default mb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>

      </div>
    </div>
  )
}