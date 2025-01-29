import React, { useRef, useState } from "react";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { getUserState } from "../../../services/user/slice.ts";

export const ProfileUser: React.FC = () => {
  const { user } = useSelector(getUserState)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '******',
  })
  const [isNameEdit, setIsNameEdit] = useState(false)
  const [changeForm, setChangeForm] = useState(false)
  const nameRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    setIsNameEdit(true)
    setTimeout(() => nameRef.current!.focus(), 0);
  }
  const onNameBlur = () => {
    setIsNameEdit(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeForm(true)
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
  const handleResetForm = () => {
    setChangeForm(false)
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
            ref={nameRef}
            size={'default'}
            extraClass="mb-6"
            disabled={!isNameEdit}
            onIconClick={onIconClick}
            onBlur={onNameBlur}
          />
          <EmailInput
            onChange={e => handleChange(e)}
            value={formData.email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={e => handleChange(e)}
            value={formData.password}
            name={'password'}
            extraClass="mb-6"
            icon="EditIcon"
          />
          {changeForm && (
            <div className="display-flex justify_content-end">
              <Button htmlType="reset" type="secondary" size="medium" extraClass="mb-20" onClick={handleResetForm}>
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