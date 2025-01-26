import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ResetPasswordPage: React.FC = () => {
  const [valuePass, setValuePass] = useState('')
  const [valueCode, setValueCode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const onIconClick = () => {
    if (inputRef.current){
      inputRef.current.type = inputRef.current.type === 'text' ? 'password' : 'text'
    }
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <div className="display-flex flex_direction-column align_items-center">
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
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
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setValueCode(e.target.value)}
          value={valueCode}
          name={'code'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
          Сохранить
        </Button>
        <p className="text text_type_main-default mb-4">Вспомнили пароль? <Link to='/login'>Войти</Link></p>

      </div>
    </div>
  )
}