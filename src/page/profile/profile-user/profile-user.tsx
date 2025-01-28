import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { getUserState } from "../../../services/user/slice.ts";

export const ProfileUser: React.FC = () => {
  const { user } = useSelector(getUserState)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '******',
  })
  const [changeForm, setChangeForm] = useState(false)
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.removeAttribute("disabled")
    }
    setChangeForm(true)
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
    setChangeForm(false)
    if (!formData.email || !formData.password) {
      return;
    }
  }

  return (
    <div className="text_align-center">
      <div className="display-flex flex_direction-column align_items-center">
        <form action="" onSubmit={handleSubmitForm}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => handleChange(e)}
            icon={'EditIcon'}
            value={formData.name}
            name={'name'}
            onIconClick={()=>onIconClick(nameRef)}
            ref={nameRef}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            disabled
          />
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={e => handleChange(e)}
            icon={'EditIcon'}
            value={formData.email}
            name={'email'}
            onIconClick={()=>onIconClick(emailRef)}
            ref={emailRef}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            disabled
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={e => handleChange(e)}
            icon={'EditIcon'}
            value={formData.password}
            name={'password'}
            onIconClick={()=>onIconClick(passwordRef)}
            ref={passwordRef}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            disabled
          />
          {changeForm && (
            <div className="display-flex justify_content-end">
              <Button htmlType="reset" type="secondary" size="medium" extraClass="mb-20">
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Сохранить
              </Button>
            </div>
          )}

        </form>

      </div>
    </div>
  )
}