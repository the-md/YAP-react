import React, { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/user/slice.ts";

export const ProfileUser: React.FC = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(getUser)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '******',
  })

  const onIconClick = (e) => {
    console.log('update', e)
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
    // dispatch(onLogin(formData));
    setFormData({
      name: '',
      email: '',
      password: '',
    });
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
            onIconClick={(e)=>onIconClick(e)}
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
            onIconClick={onIconClick}
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
            onIconClick={onIconClick}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
            disabled
          />
          <div className="display-flex justify_content-end">
            <Button htmlType="submit" type="secondary" size="medium" extraClass="mb-20">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
              Сохранить
            </Button>
          </div>
        </form>

      </div>
    </div>
  )
}