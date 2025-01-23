import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";

export const ResetPassword: React.FC = () => {
  const [valueName, setValueName] = useState('')
  const [valueLogin, setValueLogin] = useState('')
  const [valuePass, setValuePass] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    if (inputRef.current){
      inputRef.current.type = inputRef.current.type == 'text' ? 'password' : 'text'
    }
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setValueName(e.target.value)}
          value={valueName}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
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
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>

      </div>
    </div>
  )
}