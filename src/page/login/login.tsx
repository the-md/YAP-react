import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [valueLogin, setValueLogin] = useState('')
  const [valuePass, setValuePass] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    if (inputRef.current){
      inputRef.current.type = inputRef.current.type === 'text' ? 'password' : 'text'
    }
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setValueLogin(e.target.value)}
          value={valueLogin}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setValuePass(e.target.value)}
          icon={'ShowIcon'}
          value={valuePass}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
          Войти
        </Button>
        <p className="text text_type_main-default mb-4">Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>

      </div>
    </div>
  )
}